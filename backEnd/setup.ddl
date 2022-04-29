-- setup

CREATE DATABASE gym;

\c gym

CREATE EXTENSION unaccent;
CREATE EXTENSION dblink;
CREATE EXTENSION pg_cron;

CREATE OR REPLACE language plpython3u;