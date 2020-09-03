export interface RouteConfig<RoutesNames extends string = string> {
    name: RoutesNames;
    page: string;
    pattern: string;
}
