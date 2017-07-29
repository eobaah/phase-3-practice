const express = require( 'express' );
const bodyparser = require( 'body-parser' )
const app = express()
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use( bodyparser.urlencoded( { extended: false } ))

// parse application/json
app.use( bodyparser.json() )

app.get( '/api/supported-operations', ( request, response ) => {
  response.setHeader('Content-Type', 'application/json');
  response.send( {
    "/": "division",
    "+": "addition",
    "-": "subtration",
    "*": "multiplication"
    })
})

app.get( '/api/square', ( request, response ) => {
  let number = request.query.number
  let numberSquared = Math.pow(number, 2)
  response.setHeader('Content-Type', 'application/json');
  response.send( { numberSquared
    })
})

app.post( '/api/compute', ( request, response ) => {
  let operator = request.body.operator
  let operands = JSON.parse(request.body.operand)
  let operate;
    switch (operator) {
        case "+":
            operate = { "+": function( operands ) {
                      return operands.reduce( function( sum, value ) {
                        return sum + value
                      })
            } }
            break;
        case "-":
            operate = { "-": function( operands ) {
                    return operands.reduce( function( sum, value ) {
                      return sum - value
                    })
            } }
            break;
        case "*":
            operate = { "*": function( operands ) {
                    return operands.reduce( function( sum, value ) {
                      return sum * value
                    })
            } }
            break;
        case "/":
            operate = { "/": function( operands ) {
                    return operands.reduce( function( sum, value ) {
                      return sum + value
                    })
            } }
            break;
        default:
            operate = "Looking forward to the Weekend";
   }
   response.setHeader('Content-Type', 'application/json')
   response.send( { result: ( operate[ operator ]( operands ) ).toFixed(2) } )
} )

app.listen( port , function () {
  console.log(`Example app listening on port ${port}!`)
})
