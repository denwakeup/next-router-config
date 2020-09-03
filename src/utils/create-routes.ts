import { Routes } from '../entities/routes';
import { RoutesConfig } from '../types/routes-config';
import { createUseCustomRouteLink } from '../hooks/use-custom-route-link';
import { createUseCustomRouter } from '../hooks/use-custom-router';

export interface CreateRoutesParams<RoutesNames extends string = string> {
    config: RoutesConfig<RoutesNames>;
}

export const createRoutes = <RoutesNames extends string = string>({
    config,
}: CreateRoutesParams<RoutesNames>) => {
    const routes = new Routes(config);
    const useCustomRouteLink = createUseCustomRouteLink(routes);
    const useCustomRouter = createUseCustomRouter(routes);

    return {
        routes,
        useCustomRouteLink,
        useCustomRouter,
    };
};
