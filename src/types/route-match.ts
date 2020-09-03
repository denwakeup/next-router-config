export interface RouteMatch {
    params: object;
    pathname: string;
    page: string;
    name: string;
    pattern: string;
}

export type MaybeRouteMatch = RouteMatch | false;
