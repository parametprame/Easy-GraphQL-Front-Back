const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book')
const Author = require('../models/authos')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;




const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author:{
            type: AuthoType,
            resolve(parent, args){
             return Author.findById(parent.authorId)
            }
        }
    })
});

const AuthoType = new GraphQLObjectType({
    name: 'Author',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
              return Book.find({ authorId: parent.id })
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthoType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Author.findById(args.id)
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({})
            }
        },
        authors:{
            type: new GraphQLList(AuthoType),
            resolve(parent, args){
                return Author.find({})
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAuthor:{
            type: AuthoType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
               return author.save()
            }
        },
        addBook:{
            type: BookType,
            args:{
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLID},
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});