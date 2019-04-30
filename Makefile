
go_apps = bin/getStack

build-web:
	cd web && yarn install && yarn build

clean-web:
	rm -rf ./web/build

deploy-web: clean-web build-web
	echo "Deploying client..."
	sls client deploy --no-confirm

deploy-stack:
	echo "Deploying stack..."
	sls deploy --verbose

deploy: deploy-stack deploy-web
