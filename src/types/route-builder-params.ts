export interface RouteLinkParams<RoutesNames extends string = string> {
    routeName: RoutesNames;
    routeParams?: object;
}
