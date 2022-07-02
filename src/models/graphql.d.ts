interface Route {
  [KEY: string]: string;
}

interface GraphQLContext {
  routes: Route;
  user?: User;
  token?: string;
  passport?: string;
}
