
------------------------------
-- PACKAGE: authentication  --
-- CLASS: User              --
-- METHODS                  --
------------------------------

SELECT 'PACKAGE: AUTHENTICATION CLASS: USER (METHODS)' AS information;

------------------------------
-- CONSTRUCTORS & DESTRUCTORS
------------------------------
CREATE OR REPLACE FUNCTION authentication.user (
    IN p_dni                      bigint,
    IN p_name                     text,
    IN p_surname                  text,
    IN email                      text,
    IN p_password                 text
) RETURNS authentication.user AS $$
DECLARE
  v_user_id                       bigint;
  v_user                          authentication.user;

BEGIN
    IF authentication.user_exists(p_dni)
    THEN
        RAISE EXCEPTION 'authentication.user ERROR: user allready exists';
    END IF;

    v_user_id := nextval('authentication.user_id');

    INSERT INTO authentication.user(user_id, dni, name, surname, email, password)
        VALUES(v_user_id, p_dni, p_name, p_surname, email, p_password)
    RETURNING * INTO v_user;

    RETURN v_user;
END;
$$ LANGUAGE plpgsql VOLATILE
SET search_path FROM CURRENT;



CREATE OR REPLACE FUNCTION authentication.user_destroy (
    IN p_user                     authentication.user
) RETURNS void AS $$
BEGIN
    IF NOT authentication.user_exists(p_user)
    THEN
        RAISE EXCEPTION 'authentication.user_destroy ERROR: user does not exists';
    END IF;

    DELETE FROM authentication.user u WHERE u = p_user;
END;
$$ LANGUAGE plpgsql VOLATILE STRICT
SET search_path FROM CURRENT;


--------------------------
-- SEARCH & IDENTIFY
--------------------------
CREATE OR REPLACE FUNCTION authentication.user_exists (
    IN p_user                     authentication.user
) RETURNS boolean AS 
$$
    SELECT exists(
        SELECT 1 FROM authentication.user u WHERE u = p_user
    );
$$ LANGUAGE sql STABLE STRICT
SET search_path FROM CURRENT;


CREATE OR REPLACE FUNCTION authentication.user_exists (
    IN p_dni                      bigint
) RETURNS boolean AS 
$$
    SELECT exists(
        SELECT 1 FROM authentication.user u WHERE u.dni = p_dni
    );
$$ LANGUAGE sql STABLE STRICT
SET search_path FROM CURRENT;


CREATE OR REPLACE FUNCTION authentication.user_exists (
    IN p_email                    text
) RETURNS boolean AS 
$$
    SELECT exists(
        SELECT 1 FROM authentication.user u WHERE u.email = p_email
    );
$$ LANGUAGE sql STABLE STRICT
SET search_path FROM CURRENT;


CREATE OR REPLACE FUNCTION authentication.user_identify_by_email (
    IN p_email                    text
) RETURNS authentication.user AS $$
BEGIN
    IF NOT authentication.user_exists(p_email)
    THEN
        RAISE EXCEPTION 'authentication.user_identify_by_email ERROR: user does not exists';
    END IF;

    RETURN u FROM authentication.user u WHERE u.email =  p_email;
END;
$$ LANGUAGE plpgsql STABLE STRICT
SET search_path FROM CURRENT
SECURITY DEFINER;


CREATE OR REPLACE FUNCTION authentication.user_identify_by_dni (
    IN p_dni                      bigint
) RETURNS authentication.user AS $$
BEGIN
    IF NOT authentication.user_exists(p_dni)
    THEN
        RAISE EXCEPTION 'authentication.user_identify_by_dni ERROR: user does not exists';
    END IF;

    RETURN u FROM authentication.user u WHERE u.dni = p_dni;
END;
$$ LANGUAGE plpgsql STABLE STRICT
SET search_path FROM CURRENT
SECURITY DEFINER;


--------------------------
-- GETTERS & SETTERS
--------------------------
CREATE OR REPLACE FUNCTION authentication.user_get_dni (
  	IN p_user                     authentication.user
) RETURNS bigint AS
$$
  	SELECT dni(p_user);
$$ LANGUAGE sql STABLE STRICT
SET search_path FROM CURRENT;


CREATE OR REPLACE FUNCTION authentication.user_set_dni (
	IN p_user                    authentication.user,
	IN p_dni                     name
) RETURNS authentication.user AS $$
DECLARE
	v_user                       authentication.user;

BEGIN
    IF authentication.user_exists(p_dni)
    THEN
        RAISE EXCEPTION 'authentication.user_set_dni ERROR: dni allready exists';
    END IF;

	v_user := p_user;
	v_user.dni := p_dni;

	RETURN v_user;
END;
$$ LANGUAGE plpgsql IMMUTABLE STRICT
SET search_path FROM CURRENT;


CREATE OR REPLACE FUNCTION authentication.user_get_name (
  	IN p_user                     authentication.user
) RETURNS text AS
$$
  	SELECT name(p_user);
$$ LANGUAGE sql STABLE STRICT
SET search_path FROM CURRENT;


CREATE OR REPLACE FUNCTION authentication.user_set_name (
	IN p_user                    authentication.user,
	IN p_name                    name
) RETURNS authentication.user AS $$
DECLARE
	v_user                       authentication.user;

BEGIN
	v_user := p_user;
	v_user.name := p_name;

	RETURN v_user;
END;
$$ LANGUAGE plpgsql IMMUTABLE STRICT
SET search_path FROM CURRENT;


CREATE OR REPLACE FUNCTION authentication.user_get_surname (
  	IN p_user                     authentication.user
) RETURNS text AS
$$
  	SELECT surname(p_user);
$$ LANGUAGE sql STABLE STRICT
SET search_path FROM CURRENT;


CREATE OR REPLACE FUNCTION authentication.user_set_surname (
	IN p_user                     authentication.user,
	IN p_surname                  text
) RETURNS authentication.user AS $$
DECLARE
	v_user                        authentication.user;

BEGIN

	UPDATE authentication.user u
		SET surname = p_surname
	WHERE u = p_user RETURNING * INTO v_user;

	RETURN v_user;
END;
$$ LANGUAGE plpgsql VOLATILE STRICT
SET search_path FROM CURRENT;


CREATE OR REPLACE FUNCTION authentication.user_get_email (
  	IN p_user                     authentication.user
) RETURNS text AS
$$
  	SELECT email(p_user);
$$ LANGUAGE sql STABLE STRICT
SET search_path FROM CURRENT;


CREATE OR REPLACE FUNCTION authentication.user_set_email (
	IN p_user                     authentication.user,
	IN p_email                    text
) RETURNS authentication.user AS $$
DECLARE
	v_user                        authentication.user;

BEGIN
	IF authentication.user_exists(p_email)
	THEN
		RAISE EXCEPTION 'authentication.user_set_email ERROR: dni allready exists';
	END IF;

	UPDATE authentication.user u
		SET email = p_email
	WHERE u = p_user RETURNING * INTO v_user;

	RETURN v_user;
END;
$$ LANGUAGE plpgsql VOLATILE STRICT
SET search_path FROM CURRENT;


CREATE OR REPLACE FUNCTION authentication.user_set_password (
	IN p_user                     authentication.user,
	IN p_password                 text
) RETURNS authentication.user AS $$
DECLARE
	v_user                        authentication.user;

BEGIN
	IF NOT authentication.user_exists(p_user)
	THEN
		RAISE EXCEPTION 'authentication.user_set_password ERROR: user does not exists';
	END IF;

	UPDATE authentication.user u
		SET password = p_password
	WHERE u = p_user RETURNING * INTO v_user;

	RETURN v_user;
END;
$$ LANGUAGE plpgsql VOLATILE STRICT
SET search_path FROM CURRENT;

