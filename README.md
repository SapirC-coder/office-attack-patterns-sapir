# How to run

## Extract `attack-patterns.zip` in `oap-app/backend/database`
Make sure the folder containts files and not a directory (use extract here)

## After that you got 2 options:


### Install docker (Recommended)
[click here for download](https://www.docker.com/get-started)
### Run in `oap-app` `docker-compose up` to start running, and change the word `start` to `down` incase you want to close the servers of the app
#### change in  `backend\database\db.js` in `DB_IP`: `127.0.0.1` to `db`

## Or

### Install mongodb
[install community server](https://www.mongodb.com/try/download/community)

#### Open a service of mongo:

##### In linux run: `systemctl start mongodb`
##### In windows run: `net start MongoDB`
###### change the word `start` to `stop` incase you want to stop the service

### In `backend`

#### Run: `npm install`
Only on the first run

#### Run: `node server.js`


### In `frontend`

#### Run: `yarn install`
Only on the first run

#### Run: `npm start`

