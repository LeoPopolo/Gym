.PHONY: gym.sql clean

all: gym.sql

gym.sql: 
	touch gym.sql
	cat setup.sql >> gym.sql
	cat user.ddl >> gym.sql
	cat user.sql >> gym.sql
	
	
clean:
	$(RM) gym.sql
