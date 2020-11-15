const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

// setup middleware
app.use('/graphql', graphqlHTTP({
    // pass in a schema property
    schema: schema,
    graphiql: true
}));


// ask app to listen to a port and callback function
app.listen(4000,()=>{
    console.log('Now listening for port 4000.');
})
