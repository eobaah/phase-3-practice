// app.listen
const Groceries = require('./database.js')
const express = require( 'express' );
const app = express()
const port = process.env.PORT || 3000;
const bodyparser = require( 'body-parser' )

// parse application/x-www-form-urlencoded
app.use( bodyparser.urlencoded( { extended: false } ))

// parse application/json
app.use( bodyparser.json() )


app.get( '/itemsinsection/:section', ( request, response ) => {
  let section = request.params.section
  Groceries.itemsInSection(section)
    .then( groceries => {
      response.send( groceries )
    })
})

app.get( '/cheapitems', ( request, response ) => {
  Groceries.cheapItems()
    .then( groceries => {
      response.send( groceries )
    })
})

app.get( '/countitems/:section', ( request, response ) => {
  let section = request.params.section
  Groceries.countItemsInSection(section)
    .then( groceries => {
      response.send( groceries )
    })
})


app.listen( port , function () {
  console.log(`Example app listening on port ${port}!`)
})

module.exports = app
