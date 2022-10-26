import { gql } from "@apollo/client";

export const MeQuery = gql`
  query MeQuery($repositoriesFirst: Int) {
    viewer {
      login
      name
      id
      location
      avatarUrl
      bio
      status {
        message
        emoji
      }
      repositories(first: $repositoriesFirst) {
        nodes {
          id
          name
          url
          primaryLanguage {
            color
            name
          }
        }
        totalCount
      }
    }
  }
`;
