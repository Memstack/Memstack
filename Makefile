
go_apps = bin/getDeck

bin/% : lambda/%.go lambda/dao.go
	export GO111MODULE=on
	env GOOS=linux go build -ldflags="-s -w" -o $@ $< lambda/dao.go

build: $(go_apps)

build-web:
	cd web && yarn install && yarn build

clean:
	rm -rf ./bin ./vendor Gopkg.lock

clean-web:
	rm -rf ./web/build

deploy-web: clean-web build-web
	echo "Deploying client..."
	sls client deploy

deploy-stack: clean build
	echo "Deploying stack..."
	sls deploy --verbose 

deploy: deploy-stack deploy-web
