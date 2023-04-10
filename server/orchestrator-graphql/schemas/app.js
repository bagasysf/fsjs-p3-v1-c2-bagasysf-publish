const appUrl = 'http://app:4001';
const serviceUrl = 'http://users:4002';
const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis({
  host: 'redis-12652.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
  port: '12652',
  password: 'bMHPJ3FjzXXESI0sloW3MrEg8x9JXIlc',
});

const typeDefs = `#graphql
  type GetAllPostsService {
    statusCode: Int
    message: String
    data: [GetAllPosts]
  }

  type GetAllPosts {
    id: ID
    title: String
    slug: String
    content: String
    imgUrl: String
    CategoryId: Int
    MongoId: String
    createdAt: String
    updatedAt: String
    Category: Category
    Tags: [Tag]
  }

  type Category {
    id: ID
    name: String
    createdAt: String
    updatedAt: String
  }

  type Tag {
    id: ID
    PostId: Int
    name: String
    createdAt: String
    updatedAt: String
  }

  type GetPostBySlugService {
    statusCode: Int,
    message: String,
    data: GetPostBySlug
  }

  type GetPostBySlug {
    id: ID
    title: String
    slug: String
    content: String
    imgUrl: String
    CategoryId: Int
    MongoId: String
    createdAt: String
    updatedAt: String
    Category: Category
    Tags: [Tag]
    User: User
  }

  type User {
    _id: String
    id: ID
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  type PostPostService {
    statusCode: Int
    message: String
    data: PostResult
  }

  type PostResult {
    post: Post
    tags: [nameTag]
  }

  type Post {
    title: String
    content: String
    imgUrl: String
    CategoryId: Int
    MongoId: String
  }

  type nameTag {
    id: ID
    PostId: Int
    name: String
    createdAt: String
    updatedAt: String
  }

  type UpdatePostService {
    statusCode: Int
    message: String
    data: UpdatePostResult
  }

  type UpdatePostResult {
    message: String
  }

  type DeletePostBySlugService {
    statusCode: Int
    message: String
    data: DeletePostResult
  }

  type DeletePostResult {
    message: String
  }

  type Query {
    getAllPosts: GetAllPostsService
    getPostBySlug(slug: String!): GetPostBySlugService
  }

  type Mutation {
    postPost(title: String, content: String, imgUrl: String, CategoryId: Int, MongoId: String, nameTag : [String]) : PostPostService

    updatePost(slug: String, title: String, content: String, imgUrl: String, CategoryId: Int, nameTag : [String]) : UpdatePostService

    deletePost(slug: String!) : DeletePostBySlugService
  }
`;

const resolvers = {
  Query: {
    getAllPosts: async () => {
      try {
        const postsCache = await redis.get('posts:get');
        if (postsCache) {
          const postsResult = await JSON.parse(postsCache);
          return postsResult;
        }
        const { data: response } = await axios.get(`${appUrl}/posts`);
        await redis.set('posts:get', JSON.stringify(response));
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    getPostBySlug: async (_, { slug }) => {
      try {
        const postsCache = await redis.get('post:post-by-slug');
        if (postsCache) {
          const postsResult = await JSON.parse(postsCache);
          return postsResult;
        }
        const { data: post } = await axios.get(`${appUrl}/posts/${slug}`);
        const { data: user } = await axios({
          method: 'GET',
          url: `${serviceUrl}/users/${post.post.MongoId}`,
        });
        post.post.User = user.data;
        await redis.setex('posts:post-by-slug', 3, JSON.stringify(post.post));
        return {
          statusCode: 200,
          message: `Success fetch post by slug from service app and users`,
          data: post.post,
        };
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    postPost: async (
      _,
      { title, content, imgUrl, CategoryId, MongoId, nameTag }
    ) => {
      try {
        const { data: response } = await axios.post(`${appUrl}/posts`, {
          title,
          content,
          imgUrl,
          CategoryId,
          MongoId,
          nameTag,
        });
        // console.log(response);
        const keys = await redis.keys('posts:*');
        if (keys.length) {
          await redis.del(keys);
        }
        return {
          statusCode: 201,
          message: 'Success create post from service app',
          data: response,
        };
      } catch (error) {
        console.log(error);
      }
    },
    updatePost: async (
      _,
      { slug, title, content, imgUrl, CategoryId, nameTag }
    ) => {
      try {
        const { data: response } = await axios.put(`${appUrl}/posts/${slug}`, {
          title,
          content,
          imgUrl,
          CategoryId,
          nameTag,
        });
        const keys = await redis.keys('posts:*');
        if (keys.length) {
          await redis.del(keys);
        }
        return {
          statusCode: 201,
          message: `Success update post from service app`,
          data: response,
        };
      } catch (error) {
        console.log(error);
      }
    },
    deletePost: async (_, { slug }) => {
      try {
        const { data: response } = await axios.delete(
          `${appUrl}/posts/${slug}`
        );
        const keys = await redis.keys('posts:*');
        if (keys.length) {
          await redis.del(keys);
        }
        return {
          statusCode: 200,
          message: `Success delete post from service app`,
          data: response,
        };
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
