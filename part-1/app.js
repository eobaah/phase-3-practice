const express = require( 'express' );
const app = express()
const port = process.env.PORT || 3000;
const bodyparser = require( 'body-parser' )


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

app.post( '/api/compute/', ( request, response ) => {
  let operands = JSON.parse(request.body.operand)
  console.log( request.body )
  let operator = request.body.operator
  let operate
  let math = function( operator , operands ) {
    if( operator !== "+" ||
        operator !== "-" ||
        operator !== "/" ||
        operator !== "*") {
      return {"error": `invalid operator ${operator}. Valid operators are /, +, -, *`}
    }
    if( operator === "+") {
      operate = { "+": function( operands ) {
        return operands.reduce( function( sum, value ) {
          return sum + value
        }, 0)
      }}
    }
    if( operator === "-") {
      operate = { "-": function( operands ) {
        return operands.reduce( function( sum, value ) {
          return sum - value
        }, 0)
      }}
    }
    if( operator === "/") {
      operate = { "/": function( operands ) {
        return operands.reduce( function( sum, value ) {
          return sum / value
        })
      }}
    }
    if( operator === "*") {
      operate = { "*": function( operands ) {
        return operands.reduce( function( sum, value ) {
          return sum * value
        })
      }}
    }
    return operate[ operator ]( operands )
  }
  response.setHeader('Content-Type', 'application/json')

  operator !== "+" ||
  operator !== "-" ||
  operator !== "/" ||
  operator !== "*" ? response.status(404).send({"error": `invalid operator ${operator}. Valid operators are /, +, -, *`}) :
  response.send( { result: math( operator , operands ).toFixed(2)
    } )
})

app.listen( port , function () {
  console.log(`Example app listening on port ${port}!`)
})
