const express = require('express');
const mongoose = require('mongoose');
const { graphqlExpress} = require('graphql-server-express');
const graphqlHTTP = require('express-graphql');
/* const { graphiqlExpress , gql } = require('apollo-server-express'); */

const { makeExecutableSchema } = require("graphql-tools");
const bodyParser = require('body-parser');
const cors = require('cors')

const colors = require('colors');

const { merge } = require('lodash');

const courseTypeDefs = require('./types/course.types');
const courseResolver = require('./resolvers/course.resolvers')
let courses = require('./models/course');




mongoose.connect('mongodb://localhost/graphql_db_course', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

const typeDefs = `
    type Alert{
        message: String
    }

    type Query {
        _ : Boolean
    }

    type Mutation {
        _ : Boolean
    }
`;

const resolver = {}

const schema = makeExecutableSchema({
    typeDefs: [typeDefs,courseTypeDefs ],
    resolvers: merge(resolver,courseResolver)
});


app.get('/', function (req, res) {
    res.send("HOLA MUNDO")
});

const Path = '/graphiql'
app.use(cors());
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }));
// app.use(Path, graphiqlExpress({ endpointURL: '/graphql' }));
app.use('/graphiql',graphqlHTTP({
    schema,
    endpointURL: '/graphql',
    graphiql: true
}));


let date = new Date();
app.listen(PORT = 3000, function () {
    console.log("\nServidor escuchando ->".bold.cyan, PORT, " horas -->", date.getHours(), ":", date.getMinutes(), ":", date.getSeconds(), "\n");
    console.log(`🚀 Server ready at http://localhost:${PORT}\n`)
    console.log(`💻 Data ready at http://localhost:${PORT}${Path}`)
})


/*
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();


const path = '/grapihql';

server.applyMiddleware({ app, path });

const PORT = 3000;
app.listen( PORT , () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
); */