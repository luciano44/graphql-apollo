const { ApolloServer, gql } = require("apollo-server");

// Toda request -> POST
// Toda requst msm endpoint -> /graphql

// Query -> get info (GET)
// Mutation -> manipulate data (POST/PUT/PATCH/DELETE)
// Scalar types -> string, int, boolean, float, ID

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    hello: String
    age: Int
    users: [User!]!
    getUserByEmail(email: String!): User!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;

const users = [
  {
    _id: String(Math.random()),
    name: "Luciano",
    email: "luciano@l44.com",
    active: true,
  },
  {
    _id: String(Math.random()),
    name: "Mateus",
    email: "mateus@l44.com",
    active: false,
  },
  {
    _id: String(Math.random()),
    name: "Carlos",
    email: "carlos2@l44.com",
    active: true,
  },
];

const resolvers = {
  Query: {
    age: () => 42,
    hello: () => `hello world`,
    users: () => users,
    getUserByEmail: (_, args) =>
      users.find((user) => user.email === args.email),
  },
  Mutation: {
    createUser: (_, args) => {
      console.log(args);

      const newUser = {
        _id: String(Math.random()),
        name: args.name,
        email: args.email,
        active: true,
      };

      users.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`🔥 Server listening on ${url}`));
