.PHONY: gym.sql clean

gym.sql:
	touch gym.sql
	cat user_dto.sql >> gym.sql
	cat user.sql >> gym.sql

clean:
	$(RM) gym.sql
