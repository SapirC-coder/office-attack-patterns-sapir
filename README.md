# How to run

## Extract `attack-patterns.zip` in `oap-app/backend/database`
Make sure the folder containts files and not a directory (use extract here)

## After that you got 2 options:


### Install docker (Recommended)
[click here for download](https://www.docker.com/get-started)


## Or

### Install mongodb
[install community server](https://www.mongodb.com/try/download/community)

#### Open a service of mongo:

##### In linux run: `systemctl start mongodb`
##### In windows run: `net start MongoDB`
###### change the word `start` to `stop` incase you want to stop the service


### In `backend` and `frontend`

#### Run: `npm install`
Only on the first run


### In `backend`

#### Run: `node server.js`


### In `frontend`

#### Run: `npm start`

