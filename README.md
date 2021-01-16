# Scratch

## MongoDB Database setup

This project uses MongoDB as it's storage for configurations. You'll find the default settings in the file server/settingsDefaults.js. The configurations on that file will be merged with the configurations on the server/settings.js file so you only need to declare configurations that are different from the default. **Don't forget to set you Mongo connection string on the settings.js file**

### Recommended database setup

- Database name: ez-linter
- Collection name for eslintrc files: configs

## Endpoints

- `GET /api/config/:id`: returns eslintrc config from database. If id is not found, returns status 404.
- `POST /api/config`: returns id of config on database. Inserts new document in database if doesn't already exist. 