const { prisma } = require('./generated/prisma-client')
const { GraphQLServer } = require('graphql-yoga')


const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      feed: (root, args, context, info) => {
          return context.prisma.links()
      },
    },
    Mutation: {
      // 2
      post: (root, args, context) => {
         return context.prisma.createLink({
             url: args.url,
             description: args.description,
         })
      },
    },
  }


  const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: { prisma },
  })

server.start( () => console.log(`Server is running on http://localhost:4000`))

//deleteUser: async (parent, args, context, info) => {
 //   const deleted = await context.dataSources.mongoAPI.deleteUser(args.id);
  //  return deleted;
   // throw new ApolloError('Could not delete user', 'ACTION_NOT_COMPLETED', {});