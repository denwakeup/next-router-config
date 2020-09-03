import { RoutesConfig } from '../../types/routes-config';
import { Routes } from '../routes';
import { RouteConfig } from '../../types/route-config';

describe('Routes', () => {
    const homeRouteConfig: RouteConfig = {
        name: 'home',
        pattern: '/home',
        page: '/home',
    };
    const entityRouteConfig: RouteConfig = {
        name: 'entity',
        pattern: '/entity/:id(\\d+)',
        page: '/entity',
    };

    const routesConfig: RoutesConfig = [homeRouteConfig, entityRouteConfig];
    const routes = new Routes(routesConfig);

    it('matchUrl should work correctly', () => {
        const entityPageUrl = '/entity/321';
        const aboutPageUrl = '/about';

        expect(routes.matchUrl(entityPageUrl)).toEqual({
            name: entityRouteConfig.name,
            pattern: entityRouteConfig.pattern,
            page: entityRouteConfig.page,
            pathname: entityPageUrl,
            params: {
                id: '321',
            },
        });

        expect(routes.matchUrl(aboutPageUrl)).toBe(false);
    });

    it('getRoute should work correctly', () => {
        expect(
            routes.getRoute({
                routeName: 'entity',
                routeParams: {
                    id: 321,
                },
            })
        ).toEqual({
            pathname: '/entity/321',
            page: entityRouteConfig.page,
            params: {
                id: 321,
            },
        });

        expect(
            routes.getRoute({
                routeName: 'about',
            })
        ).toBeUndefined();
    });
});
