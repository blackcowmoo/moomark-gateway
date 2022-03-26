import { gql } from 'apollo-server-express';

export default gql`
  type Login {
    token: String!
    refreshToken: String!
    # user: User
  }

  # type Mutation {
  #   login(type: String!, code: String!, state: String): Login!
  # }
`;
