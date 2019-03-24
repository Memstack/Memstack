
go_apps = bin/getCard bin/createCard

bin/% : lambda/%.go lambda/dao.go
	export GO111MODULE=on
	env GOOS=linux go build -ldflags="-s -w" -o $@ $< lambda/dao.go

build: $(go_apps)

clean:
	rm -rf ./bin ./vendor Gopkg.lock

deploy: clean build
	sls deploy --verbose