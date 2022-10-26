import { gql } from "@apollo/client";

export const changeUserStatusMutation = gql`
  mutation Mutation($input: ChangeUserStatusInput!) {
    changeUserStatus(input: $input) {
      status {
        message
        emoji
      }
    }
  }
`;
