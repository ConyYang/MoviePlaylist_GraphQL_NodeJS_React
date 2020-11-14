const graphql = require('graphql');
const _ = require('lodash')
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

// Dummy Data
var movies = [
    {name: 'The Shawshank Redemption', genre: 'Drama',id: '1'},
    {name: 'The GodFather', genre: 'Crime',id: '2'},
    {name: 'The Dark Knigh', genre: 'Action', id: '3'},
];

const MovieType = new GraphQLObjectType({
    // function takes in an object, This object defines what this movie
    // type is all about.
    name:'Movie',
    // fields should be a function
    fields:() =>({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        movie:{
            type: MovieType,
            args: {id:{type:GraphQLString}},
            resolve(parent,args){
                // code to get data from db/other source
                return _.find(movies, {id:args.id});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    // pass through initial route query
     query: RootQuery
})