import { gql } from 'apollo-server-express';

export default gql`
  directive @dev on OBJECT | FIELD_DEFINITION
  directive @auth on OBJECT | FIELD_DEFINITION
`;
