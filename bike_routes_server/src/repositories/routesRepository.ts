import { Route } from "../types/route";

const routes: Route[] = [];

// Repository for managing routes
export const RoutesRepository = {
  async exists(predicate: (route: Route) => boolean): Promise<boolean> {
    return routes.some(predicate);
  },

  async add(route: Route): Promise<void> {
    routes.push(route);
  },

  async get(predicate: (route: Route) => boolean): Promise<Route | undefined> {
    return routes.find(predicate);
  }
};
