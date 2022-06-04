export const buildUserId = ({ id, authProvider }: User): string => {
  return `${authProvider}@${id}`;
};
