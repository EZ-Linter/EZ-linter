# EZ-linter

## Settings

1. Copy server/settings.example.js to server/settings.js and change values to match your MongoDB and Github OAuth settings. 

### Recommended database setup

- Database name: ez-linter
- Collection name for eslintrc files: configs

## Endpoints

- `GET /api/config/:id`: returns eslintrc config from database. If id is not found, returns status 404.
- `POST /api/config`: returns id of config on database. Inserts new document in database if doesn't already exist. 
=======
