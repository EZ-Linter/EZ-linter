# EZ-linter

## Settings

1. Copy server/settings.example.js to server/settings.js and change values to match your MongoDB and Github OAuth settings.

### Recommended database setup

- Database name: ez-linter
- Collection name for eslintrc files: configs

## Endpoints

- `POST /api/user/config`: add config to database if not already present and adds configId to list of user's saved configs. Request should have json body with config in .eslintrc key and configName in .configName key. Return configId in body of response as {configId: '<configId>'}
- `DELETE /api/user/config`: remove config from user list of saved configs
- `GET /api/user/savedconfigs`: get user's list of saved config ids. Returned in body of response as {configs: configs[]}
- `GET /api/config/:id`: returns eslintrc config from database. If id is not found, returns status 404.
- `GET /api/config/share/:id`: returns shared eslintrc config from database. If id is not found, returns status 410 since shared config must have expired.
- `POST /api/config/share`: saves config to shareables collection and returns server endpoint to access shared config. Shared configurations expire after 7 days.Request should have json body with config in .eslintrc key

## Production Build

When deploying for production:

- run `npm run build`
- uncomment main.css import from index.html head
