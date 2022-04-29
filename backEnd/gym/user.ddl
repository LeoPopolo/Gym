------------------------------
-- PACKAGE: authentication  --
-- CLASS: User              --
-- ABSTRACT DATA TYPE       --
------------------------------

SELECT 'PACKAGE: AUTHENTICATION CLASS: USER (ABSTRACT DATA TYPE)' AS information;

CREATE TABLE authentication.user (
	user_id                      bigint PRIMARY KEY,
    dni                          bigint NOT NULL,
	name                         name NOT NULL,
	surname                      text NOT NULL,
    email                        text NOT NULL,
	password                     text NOT NULL
);

CREATE SEQUENCE authentication.user_id;