import { RoutesConfig } from '../types/routes-config';
import { Route } from './route';
import { MaybeRouteMatch } from '../types/route-match';
import { RouteLinkParams } from '../types/route-builder-params';
import { MaybeRouteLink } from '../types/route-link';

export class Routes<RoutesNames extends string = string> {
    config: RoutesConfig<RoutesNames>;

    routes = new Map<RoutesNames, Route>();

    constructor(config: RoutesConfig<RoutesNames>) {
        this.config = config;

        config.forEach((routeConfig) => {
            const route = new Route(routeConfig);

            this.routes.set(route.name, route);
        });
    }

    matchUrl = (url: string): MaybeRouteMatch => {
        let matchedUrl: MaybeRouteMatch = false;

        // eslint-disable-next-line no-restricted-syntax
        for (const route of this.routes.values()) {
            matchedUrl = route.match(url);

            if (matchedUrl) {
                return matchedUrl;
            }
        }

        return matchedUrl;
    };

    getRoute({
        routeName,
        routeParams,
    }: RouteLinkParams<RoutesNames>): MaybeRouteLink {
        const route = this.routes.get(routeName);

        if (!route) {
            return undefined;
        }

        return {
            params: routeParams,
            pathname: route.compile(routeParams),
            page: route.page,
        };
    }
}
