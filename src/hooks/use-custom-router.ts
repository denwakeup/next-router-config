import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Routes } from '../entities/routes';

export interface Params<RoutesNames extends string = string> {
    routeName: RoutesNames;
    routeParams?: object;
}

export const createUseCustomRouter = <RoutesNames extends string = string>(
    routes: Routes<RoutesNames>
) => () => {
    const router = useRouter();

    const routeParams = useMemo(() => {
        const data = routes.matchUrl(router.asPath);

        if (!data) {
            return null;
        }

        return data.params;
    }, [router.asPath]);

    if (routeParams) {
        router.query = {
            ...router.query,
            ...routeParams,
        };
    }

    return router;
};
