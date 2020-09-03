import { Route } from '../route';

describe('Route', () => {
    const params = {
        name: 'test-route',
        pattern: '/test/:id',
        page: '/test',
    };

    it(`should add a leading slash to the page prop if it doesn't exist`, () => {
        const routeOne = new Route({
            ...params,
            page: 'test',
        });
        const routeTwo = new Route({
            ...params,
            page: '/test',
        });

        expect(routeOne.page).toBe('/test');
        expect(routeTwo.page).toBe('/test');
    });

    it('match should work correctly', () => {
        let route = new Route(params);
        let pathname = '/test/435';

        expect(route.match('/test/435')).toEqual({
            page: params.page,
            name: params.name,
            pattern: params.pattern,
            pathname,
            params: {
                id: '435',
            },
        });

        const otherRouteConfig = {
            name: 'otherTest',
            page: '/otherTest',
            pattern: '/other/test',
        };

        route = new Route(otherRouteConfig);
        pathname = '/other/test';

        expect(route.match(pathname)).toEqual({
            name: otherRouteConfig.name,
            page: otherRouteConfig.page,
            pattern: otherRouteConfig.pattern,
            pathname,
            params: {},
        });
    });

    it('match should return false for an unmatched string', () => {
        const route = new Route(params);

        expect(route.match('/home')).toBe(false);
    });
});
