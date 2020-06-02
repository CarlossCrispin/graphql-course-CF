const express = require("express");

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, graphql } = require("graphql");

var colors = require("colors");

const app = express();

const courseType = new GraphQLObjectType({
    name: 'course',
    fields: {
        title: {type : GraphQLString},
        views: {type : GraphQLInt}
    }
});

const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      message : {
        type: GraphQLString,
        resolve() {
          return "Hola Mundo";
        }
      },
      course : {
        type: courseType,
        resolve(){
            return{ title: 'Curso de GraphQl', views: 100};
        }
      }
    }
  })
});

app.get("/", function (req, res) {
//   res.send("Hola Mundo");
  graphql(Schema, `{ message, course{ title, viewsˆ } }`).then(r => res.json(r)).catch(err => console.log(err));
});

app.listen(3000, function () {
  console.log("servidor iniciado".america);
});
