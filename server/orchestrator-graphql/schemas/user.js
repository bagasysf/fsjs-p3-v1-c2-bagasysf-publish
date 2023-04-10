const serviceUrl = 'http://users:4002';
const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis({
  host: 'redis-12652.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
  port: '12652',
  password: 'bMHPJ3FjzXXESI0sloW3MrEg8x9JXIlc',
});

const typeDefs = `#graphql
  type GetAllUsersOrches {
    statusCode: Int
    message: String
    data: GetAllUsersService
  }

  type GetAllUsersService {
    statusCode: Int
    message: String
    data: [GetAllUsers]
  }

  type GetAllUsers {
    _id: String
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  type PostUserService {
    statusCode: Int
    message: String
    data: PostUserResult
  }

  type PostUserResult {
    _id: String
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  type GetUserByIdOrches {
    statusCode: Int
    message: String
    data: GetUserByIdService
  }

  type GetUserByIdService {
    statusCode: Int
    message: String
    data: GetUserById
  }

  type GetUserById {
    _id: String
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  type DeleteUserByIdService {
    statusCode: Int
    message: String
  }

  type Query {
    getAllUsers: GetAllUsersService
    getUserById(_id: String!): GetUserByIdService
  }

  type Mutation {
    postUser(username: String!, email: String!, password: String!, role: String, phoneNumber: String, address: String) : PostUserService

    deleteUser(_id: String!) : DeleteUserByIdService
  }
`;

const resolvers = {
  Query: {
    getAllUsers: async () => {
      try {
        const usersCache = await redis.get('users:get');
        if (usersCache) {
          const usersResult = await JSON.parse(usersCache);
          return usersResult;
        }
        const { data: response } = await axios.get(`${serviceUrl}/users`);
        await redis.set('users:get', JSON.stringify(response));
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    getUserById: async (_, { _id }) => {
      try {
        const usersCache = await redis.get('users:user-by-id');
        if (usersCache) {
          const usersResult = await JSON.parse(usersCache);
          return usersResult;
        }
        const { data: response } = await axios.get(
          `${serviceUrl}/users/${_id}`
        );
        await redis.setex(
          'users:user-by-id',
          3,
          JSON.stringify({
            statusCode: 201,
            message: `Success get User by id form service app`,
            data: response.data,
          })
        );
        return {
          statusCode: 201,
          message: `Success get User by id form service app`,
          data: response.data,
        };
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    postUser: async (
      _,
      { username, email, password, phoneNumber, address }
    ) => {
      const { data: response } = await axios.post(`${serviceUrl}/users`, {
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      const keys = await redis.keys('users:*');
      if (keys.length) {
        await redis.del(keys);
      }
      return response;
    },
    deleteUser: async (_, { _id }) => {
      const { data: response } = await axios.delete(
        `${serviceUrl}/users/${_id}`
      );
      const keys = await redis.keys('users:*');
      if (keys.length) {
        await redis.del(keys);
      }
      return response;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
