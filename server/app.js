const express = require('express');
const {graphqlHTTP} = require('express-graphql');

const app = express();

// setup middleware
app.use('/graphql', graphqlHTTP({
    // pass in a schema property
}));


// ask app to listen to a port and callback function
app.listen(4000,()=>{
    console.log('Now listening for port 4000.');
})
