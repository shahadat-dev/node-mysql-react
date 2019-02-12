# node-mysql-react

A Node.js boilerplate app for **RESTful APIs**

Implented Registration and Login for users

#### Tools

**Express.js** as server side framework
**MySql** as database
**React.js** for client side development
**Redux.js** for client side state management
**[Validator.js](https://github.com/chriso/validator.js)** for both client and server side validation
**passport** as authentication middleware
**axios** as HTTP client
**create-react-app** to setup React.js environment

# Setup

#### Install dependencies:

1. Go inside root folder(e.g. `node-mysql-react`) and run `npm install`
2. Go inside `client` folder and run `npm install`

#### How to run

1. Server: run `nodemon app.js` or `node app.js` command at your CLI
2. Clien: run `cd client && npm start` command at your CLI and browse to http://localhost:3000

#### Database setup:

###### Database:

1. Open your browser and hit http://localhost:5000/api/setup/createdb to create database
   (N.B - Keep your mysql running before creating database. If you face any error, then comment out line 8: `database: 'nodemysql'` from `config/db.js` and then again hit the http://localhost:5000/api/setup/createdb )

Keep in mind that you have to uncomment the line again after creating the database successfully.

```javascript
//DB config
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql'
})
```

You can manually create the database too.

###### Table:

To create `users` table hit http://localhost:5000/api/setup/createtable from your browser

# Client

http://localhost:3000
Client side development is powered by _React.js_

###### TODO:

Test Codes
Promisify server-side code

_Happy Coding!_
