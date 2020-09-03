export interface RouteLink {
    pathname: string;
    page: string;
    params?: {};
}

export type MaybeRouteLink = RouteLink | undefined;
