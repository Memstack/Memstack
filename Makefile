
go_apps = bin/getCard

bin/% : lambda/%.go lambda/dao.go
	export GO111MODULE=on
	env GOOS=linux go build -ldflags="-s -w" -o $@ $< lambda/dao.go

build: $(go_apps)

clean:
	rm -rf ./bin ./vendor Gopkg.lock


deploy-web: clean build
	echo "Deploying client..."
	sls client deploy

deploy-stack: clean build
	echo "Deploying stack..."
	sls deploy --verbose 

deploy: deploy-stack deploy-web
