DO $$
DECLARE
	v_user                        authentication.user;
	
BEGIN

    v_user := authentication.user(42964818,'admin','admin','admin@gmail.com','$2a$10$7wyYXxpPGsA6Qta7Rboc4effjMYRlo3c99cKXppCpaFIXofulW1qq');

    PERFORM authentication.user_set_role(v_user,'administrator');

END;
$$ LANGUAGE plpgsql;