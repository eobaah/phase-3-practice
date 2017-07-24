const chai = require( 'chai' )
const chaiHttp = require( 'chai-http' )
const chaiChange = require( 'chai-change' )
const Groceries = require('./database.js')
const itemsSection = require( './app.js' )
const cheap = require( './app.js' )
const count = require( './app.js' )
const express = require( 'express' );
const app = express()
const port = process.env.PORT || 3000;
const bodyparser = require( 'body-parser' )

// parse application/x-www-form-urlencoded
app.use( bodyparser.urlencoded( { extended: false } ))

// parse application/json
app.use( bodyparser.json() )
chai.use( chaiHttp );
chai.use( chaiChange );
const assert = chai.assert;

describe('itemsInSection("bulk")', () => {
  it('it should get all grocery items in the bulk section', (done) => {
    app.get( '/itemsinsection/:section', ( request, response ) => {
      console.log("=============")
      let section = request.params.section
      Groceries.itemsInSection(section)
        .then( groceries => {
          response.send( groceries )
        })
    })
      .end( (error, response) => {
        assert.typeOf(response.body, 'string');
        assert.lengthOf(response.body, 3, 'beverages has 3 types of tea');
        done();
      });
  });
});
