.PHONY: backEnd common clean populate add_migration upgrade api

all: backEnd gym api

backEnd: common
	make -C backEnd

runBackEnd: common
	make -C backEnd run
	make -C backEnd populate
	make -C backEnd clean

populate: 
	make -C backEnd populate

api:
	make -C api

clean:
	make -C backEnd clean
	$(RM) -r api/node_modules
