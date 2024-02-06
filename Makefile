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