const graphql = require('graphql');
const _ = require('lodash')
const {GraphQLObjectType, GraphQLString,
        GraphQLSchema, GraphQLID,
        GraphQLInt, GraphQLList} = graphql;

// Dummy Data
var movies = [
    {name: 'The Shawshank Redemption', genre: 'Drama',id: '1', authorId:'1'},
    {name: 'The GodFather', genre: 'Crime',id: '2', authorId:'2'},
    {name: 'The Dark Knigh', genre: 'Action', id: '3',authorId:'3'},
    {name: 'Sabotage', genre: 'Thriller', id: '4',authorId:'2'},
    {name: 'Cloud 9', genre: 'Comedy', id: '5',authorId:'2'},
    {name: 'Batman v Superman: Dawn of Justice', genre: 'DC Superhero', id: '6',authorId:'3'},
];

var authors = [
    {name: 'Niki Marvin', age: 62, id:'1'},
    {name: 'Albert S. Ruddy', age: 54, id:'2'},
    {name: 'Emma Thomas', age: 49, id:'3'},
];


const MovieType = new GraphQLObjectType({
    // function takes in an object, This object defines what this movie
    // type is all about.
    name:'Movie',
    // fields should be a function
    fields:() =>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author:{
            type: AuthorType,
            resolve(parent,args) {
                console.log(parent);
                return _.find(authors,{id: parent.authorId});
            }//resolve
        }//author
    })//fields
});


const AuthorType = new GraphQLObjectType({
    // function takes in an object, This object defines what this movie
    // type is all about.
    name:'Author',
    // fields should be a function
    fields:() =>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return _.filter(movies, {authorId: parent.id});
            }//resolve
        }//movies
    })//fields
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        movie:{
            type: MovieType,
            args: {id:{type:GraphQLID}},
            resolve(parent,args){
                // code to get data from db/other source
                console.log(typeof(args.id));
                return _.find(movies, {id:args.id});
            }// movie resolve
        },//movie
        author:{
            type: AuthorType,
            args: {id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(authors, {id:args.id});
            }// author resolve
        },//author
        movies:{
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return movies;
            }//resolve
        },//movies
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors;
            }//resolve
        }//authors
    }// fields
})

module.exports = new GraphQLSchema({
    // pass through initial route query
     query: RootQuery
})