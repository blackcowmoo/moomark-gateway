import { graphqlRequest, graphql } from '@test/utils/app';

export const generateTestCode = () => `test-${Number(Math.random().toString().replace('0.', '')).toString()}`;

export const getMe = async (token: string): Promise<User> => {
  const query = graphql`
    {
      me {
        id
        name
        email
        nickname
        picture
        role
      }
    }
  `;

  const { data } = await graphqlRequest(query, { headers: { Authorization: token } });
  return data.me;
};

export const getTestToken = async (code?: string): Promise<string> => {
  const { data } = await graphqlRequest(
    graphql`
      mutation Login($code: String!) {
        login(type: "Google", code: $code) {
          token
        }
      }
    `,
    { variables: { code: code || generateTestCode() } },
  );

  return data.login.token;
};

export const withdrawTestUser = async (token: string): Promise<void> => {
  await graphqlRequest(
    graphql`
      mutation {
        withdraw
      }
    `,
    { headers: { Authorization: token } },
  );
};
