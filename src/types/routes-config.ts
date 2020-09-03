import { RouteConfig } from './route-config';

export type RoutesConfig<RoutesNames extends string = string> = RouteConfig<
    RoutesNames
>[];
