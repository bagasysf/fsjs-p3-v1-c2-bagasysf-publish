import { gql } from '@apollo/client';

export const GET_ALLPOSTS = gql`
  query ExampleQuery {
    getAllPosts {
      statusCode
      message
      data {
        id
        title
        slug
        imgUrl
        content
        createdAt
        updatedAt
        MongoId
        CategoryId
        Category {
          id
          name
          createdAt
          updatedAt
        }
        Tags {
          id
          PostId
          name
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const GET_POSTBYSLUG = gql`
  query ExampleQuery($slug: String!) {
    getPostBySlug(slug: $slug) {
      statusCode
      message
      data {
        id
        title
        slug
        imgUrl
        content
        createdAt
        updatedAt
        CategoryId
        MongoId
        Category {
          id
          name
          updatedAt
          createdAt
        }
        Tags {
          id
          name
          createdAt
          updatedAt
          PostId
        }
        User {
          _id
          username
          email
          password
          role
          phoneNumber
          address
        }
      }
    }
  }
`;
