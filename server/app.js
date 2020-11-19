const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
// const mongoose = require('mongoose');
//
// mongoose.connect('mongodb+srv://CONYYANG:2001Yyb.@gql-cony.cdjbc.mongodb.net/gql-cony?retryWrites=true&w=majority',
//     { useNewUrlParser: true },{ useUnifiedTopology: true });
// mongoose.connection.once('open',()=>{
//     console.log('connected to database')
// })

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://CONYYANG:2001Yyb.@gql-Cony.cdjbc.mongodb.net/Author?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("Author").collection("gql-Author");
    // perform actions on the collection object
    //client.close();
    console.log(collection)
    console.log('connected to database');
});


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
