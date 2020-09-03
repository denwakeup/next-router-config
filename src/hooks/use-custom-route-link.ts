import { useMemo } from 'react';
import { Routes } from '../entities/routes';

export interface Params<RoutesNames extends string = string> {
    routeName: RoutesNames;
    routeParams?: object;
}

export const createUseCustomRouteLink = <RoutesNames extends string = string>(
    routes: Routes<RoutesNames>
) => ({ routeName, routeParams }: Params<RoutesNames>) =>
    useMemo(() => {
        const link = routes.getRoute({
            routeName,
            routeParams,
        });

        if (!link) {
            return undefined;
        }

        return {
            as: link.pathname,
            url: {
                pathname: link.page,
                query: link.params,
            },
        };
    }, [routeName, routeParams]);
