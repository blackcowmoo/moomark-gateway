export const buildUserId = ({ id, authProvider }: UserId): string => {
  return `${authProvider}@${id}`;
};

export const parseUserId = (userId: string): UserId => {
  const [authProvider, ...id] = userId.split('@');
  return { authProvider, id: id.join('@') };
};

export const userEqual = (userA: UserId, userB: UserId): boolean => {
  return userA.authProvider === userB.authProvider && userA.id === userB.id;
};
