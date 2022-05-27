import { gql } from 'apollo-server-express';

export default gql`
  directive @auth on OBJECT | FIELD_DEFINITION
`;
