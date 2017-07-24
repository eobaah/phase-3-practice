const chai = require( 'chai' )
const chaiHttp = require( 'chai-http' )
const chaiChange = require( 'chai-change' )
const Groceries = require('./database.js')
const itemsSection = require( './app.js' )
const cheap = require( './app.js' )
const count = require( './app.js' )
const express = require( 'express' );
const app = require( './app.js')
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
    chai.request(app)
      .get('/itemsinsection/bulk')
      .end( ( error, response ) => {
        let groceries = response.body
        let result = []
        groceries.forEach( item => {
          result.push( item.name )
        })
        console.log(result)
        assert.deepEqual( result, [ 'Flour', 'Pasta', 'Rice'], 'Should return an array container flour, pasta, and rice');
        done();
      })
  });
});

describe('cheapItems()', () => {
  it('it should get all grocery items below $10', (done) => {
    chai.request(app)
      .get('/cheapitems')
      .end( ( error, response ) => {
        let groceries = response.body
        console.log( groceries )
        assert.equal( groceries[ 0 ].name, 'Fish', 'Fish should be at the beginning');
        assert.equal( groceries[ groceries.length -1 ].name, 'Honey', 'Fish should be at the end');
        done();
      })
  });
});

describe('countItemsInSection("packaged")', () => {
  it('it should return the number of items in a packaged section', (done) => {
    chai.request(app)
      .get('/countitems/packaged')
      .end( ( error, response ) => {
        let groceries = response.body[0].count
        console.log( groceries )
        assert.equal(groceries, 5, 'There are 5 items in the bulk aisle');
        done();
      })
  });
});
