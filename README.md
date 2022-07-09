# nodejs-todo

## How to use

### Starting
```
git clone git@github.com:kazukinakama/nodejs-todo.git
cd nodejs-todo
cp ./api/.env.local ./api/.env
docker compose up -d
```

### OpenAPI Lint
```
npx @stoplight/spectral-cli lint ./docs/openapi/api.yml --ruleset ./docs/openapi/.spectral.yml
```
