# commands for building and running the docker container
build:
	docker build -t easy-meal .

run: build
	docker run -d -p 3000:3000 --name easy-meal easy-meal 

stop:
	docker stop easy-meal

clean:
	docker rm easy-meal
	docker rmi easy-meal
