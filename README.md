# House of Games API

## Inital setup
First thing to do is set up your enviroment variables. 
This can be done by creating a _.env_ file.
`.env.test` is used for your tests database.
`.env.development` is used for your dev database.

e.g: 

```
//.env.development
PGDATABASE=nc_games
//.env.test
PGDATABASE=nc_games_tests

```

Make sure to add these .env files to your `.gitignore`