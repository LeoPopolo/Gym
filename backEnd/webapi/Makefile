.PHONY: clean webapi.sql

all: modules webapi.sql

modules:
	# last_modules
	make -C gym

webapi.sql:
	touch webapi.sql
	echo >> webapi.sql
	echo >> webapi.sql
	echo >> webapi.sql
	echo "-- PACKAGE: webapi" >> webapi.sql
	cat setup.ddl >> webapi.sql
	# last_all
	cat gym/gym.sql >> webapi.sql

clean:
	$(RM) webapi.sql
	# last_clean
	make -C gym clean