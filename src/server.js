const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const epilogue = require('epilogue')
const OktaJwtVerifier = require('@okta/jwt-verifier')
const path = require('path');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));
const PORT = args.port || 80;


//Todo: replace your client id and issuer here.
const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: '{0oafnrvpgp3XhtnOa0h7}',
  issuer: 'https://dev-291986.oktapreview.com/oauth2/default'
})

let app = express()
app.use(cors())
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '..', 'dist')));



// verify JWT token middleware, since it is a middleware, it has to have a next() at the end of execution
app.use((req, res, next) => {
  // require every request to have an authorization header

  //allow get methods access data without authentication.
  if (req.method.toString() == 'GET') {
    next();
  } else {
    if (!req.headers.authorization) {
      return next(new Error('Authorization header is required'))
    }
    let parts = req.headers.authorization.trim().split(' ')
    let accessToken = parts.pop()
    oktaJwtVerifier.verifyAccessToken(accessToken)
      .then(jwt => {
        req.user = {
          uid: jwt.claims.uid,
          email: jwt.claims.sub
        }
        next()
      })//.catch(next=>{console.log('++++') })
      .catch(next) // jwt did not verify!
  }
})

// For ease of this tutorial, we are going to use SQLite to limit dependencies
let database = new Sequelize({
  dialect: 'sqlite',
  storage: './test.sqlite'
})



// Define our Post model
// id, createdAt, and updatedAt are added by sequelize automatically
//for news
let Post = database.define('posts', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT
})

//for student result
let StudentResult = database.define('webtexts', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT
})

//for Courses
let Course = database.define('webtexts1', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT,
  detail: Sequelize.TEXT

})

let Workshop = database.define('workshops', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT,
  isShow: Sequelize.STRING
})


// Initialize founder
epilogue.initialize({
  app: app,
  sequelize: database
})



// Create the dynamic REST resource for our Post model
//for news
let newsResource = epilogue.resource({
  model: Post,
  endpoints: ['/api/posts', '/api/posts/:id']

})


//for student results
let studentResultResource = epilogue.resource({
  model: StudentResult,
  endpoints: ['/api/webtexts', '/api/webtexts/:id']

})

let courseResource = epilogue.resource({
  model: Course,
  endpoints: ['/api/webtexts1', '/api/webtexts1/:id']

})

let workshopResource = epilogue.resource({
  model: Workshop,
  endpoints: ['/api/workshops', '/api/workshops/:id']

})


app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});



// launches the express app on :8081
// force means to reset database
database
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log('listening to port localhost:' + PORT);
    })
  })

