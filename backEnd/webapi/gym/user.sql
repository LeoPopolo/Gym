-------------------------------------
-- PACKAGE: webapi.authentication  --
-- CLASS: User                     --
-- METHODS                         --
-------------------------------------

SELECT 'PACKAGE: WEBAPI CLASS: USER (METHODS)' AS information;

-----------------------------
-- CREATION & DESTRUCTION
-----------------------------
CREATE OR REPLACE FUNCTION webapi.authentication_user_create (
	IN p_user                     text
) RETURNS text AS $$
DECLARE
	v_user                        jsonb;
    v_new_user                    authentication.user;
    v_result                      jsonb;

BEGIN
	IF NOT webapi.is_text_valid_json(p_user)
	THEN
		RAISE EXCEPTION 'webapi.authentication_user_create_user EXCEPTION: parameter is not a valid JSON object';
	END IF;

	v_user  := p_user::jsonb;

	IF NOT webapi.authentication_user_request_creation_dto_is_valid(v_user)
	THEN
		RAISE EXCEPTION 'webapi.authentication_user_create_user EXCEPTION: malformed JSON object';
	END IF;

	v_new_user := authentication.user(
        v_user ->> 'dni',
        v_user  ->> 'name',
        v_user  ->> 'surname',
		v_user  ->> 'email',
        v_user ->> 'password'
	);
	
    v_result := jsonb_build_object ('dni', authentication.user_get_dni(v_new_user));

    RETURN v_result::text;
END;
$$ LANGUAGE plpgsql VOLATILE STRICT
SET search_path FROM CURRENT
SECURITY DEFINER;


CREATE OR REPLACE FUNCTION webapi.authentication_user_destroy (
    IN p_dni                      bigint
) RETURNS void AS $$
DECLARE
    v_user                        authentication.user;

BEGIN
    v_user := authentication.user_identify_by_dni(p_dni);

	PERFORM authentication.user_destroy(v_user);
END;
$$ LANGUAGE plpgsql VOLATILE STRICT
SET search_path FROM CURRENT
SECURITY DEFINER;


CREATE OR REPLACE FUNCTION webapi.authentication_user_login (
	IN p_email                    text
) RETURNS jsonb AS $$
DECLARE
	v_user                        authentication.user;
    v_result                      jsonb;

BEGIN

	v_user  := authentication.user_identify_by_email(p_email);

    v_result := jsonb_build_object (
		'password', authentication.user_get_password(v_user),
		'id', authentication.user_get_id(v_user)
	);

    RETURN v_result;
END;
$$ LANGUAGE plpgsql VOLATILE STRICT
SET search_path FROM CURRENT
SECURITY DEFINER;