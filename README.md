# Memstack

A flash card app

## Local Dev

1. Set cognito env vars

```
export COGNITO_ClIENT_ID=<client_id>
export COGNITO_CLIENT_SECRET=<client_secret>

2. Install & start DynamoDB

```
cd serverless
yarn db:install
yarn db:start
```

3. Install dependencies

```
cd schema
yarn
cd ../web
yarn
```


4. Start Serverless offline

```
yarn start
```
