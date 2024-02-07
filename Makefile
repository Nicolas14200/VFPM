.PHONY: db-start
db-start:
	sudo docker run --name mongodb -p 27017:27017 -d mongo:latest

.PHONY: db-stop
db-stop:
	sudo docker stop mongodb

.PHONY: db-exec
db-exec: 
	sudo docker exec -it mongodb mongosh -db VFPM

.PHONY: db-kill
db-kill: 
	sudo docker rm -f mongodb

.PHONY: init-app
init-app:
	rm -r dist | true && tsc && chmod +x dist/index.js

.PHONY: create-user
create-user:
	cd dist && ./index.js create-user $(USER_NAME)

.PHONY: create-fleet
create-fleet:
	cd dist && ./index.js create-fleet $(USER_ID)

.PHONY: register-vehicle
register-vehicle:
	cd dist && ./index.js register-vehicle $(FLEET_ID) ${PLATE_NUMBER}

.PHONY: localize-vehicle
localize-vehicle:
	cd dist && ./index.js localize-vehicle $(FLEET_ID) ${PLATE_NUMBER} ${LAT} ${LNG} ${ALT}

