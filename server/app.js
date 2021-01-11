const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');
const mongoose = require('mongoose')

const app = express();

mongoose.connect("mongodb+srv://parametprame:1234@testparametprame.siksx.mongodb.net/testparametprame?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(err => console.log("Error: ", err.message));


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});