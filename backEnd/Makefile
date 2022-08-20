.PHONY: clean drop populate modules postconf

PSQL = psql

all: clean compile

run: 
	./install.sh

compile: modules gym.sql

modules:
	# last_modules
	make -C gym
	make -C webapi

gym.sql:
	touch gym.sql
	cat setup.ddl >> gym.sql
	# last_all
	cat gym/gym.sql >> gym.sql
	cat webapi/webapi.sql >> gym.sql
	
deploy: gym.sql
	$(PSQL) postgres < gym.sql

clean:
	if [ -d "authentication" ]; then make -C authentication clean; fi >> gym.sql
	# last_clean
	if [ -d "backbone" ]; then make -C backbone clean; fi
	make -C webapi clean
	make -C gym clean
	$(RM) gym.sql

drop:
	$(PSQL) -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = 'gym' AND pid <> pg_backend_pid();" postgres
	$(PSQL) -c "DROP DATABASE IF EXISTS gym;" postgres

populate:
	./install.sh populate

sampleData:
	$(PSQL) <  sample_data.sql

postconf:
	$(PSQL) <  postconf.sql
