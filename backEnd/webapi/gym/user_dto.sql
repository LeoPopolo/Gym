-------------------------------------
-- PACKAGE: webapi.authentication  --
-- CLASS: additional data DTOs     --
-- METHODS                         --
-------------------------------------

SELECT 'PACKAGE: WEBAPI CLASS: USER (DTOs)' AS information;

---------------------------------
-- REQUEST DTO's
---------------------------------
CREATE OR REPLACE FUNCTION webapi.authentication_user_request_creation_dto_is_valid (
	IN p_user                jsonb
) RETURNS boolean AS $$
BEGIN
    IF NOT p_user ?& ARRAY [
      'dni',
      'name',
      'surname',
      'email',
      'password'
    ]
    THEN
      RETURN FALSE;
    END IF;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql STABLE STRICT
SET search_path FROM CURRENT;