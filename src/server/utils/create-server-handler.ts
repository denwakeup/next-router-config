import { parse } from 'url';
import { IncomingMessage, ServerResponse } from 'http';
import Server from 'next/dist/next-server/server/next-server';
import { Routes } from '../../entities/routes';

export interface Params {
    routes: Routes;
    app: Server;
}

export const createServerRequestHandler = ({ routes, app }: Params) => {
    const handler = app.getRequestHandler();

    return (req: IncomingMessage, res: ServerResponse) => {
        const parsedUrl = parse(req.url as string, true);
        const { pathname, query } = parsedUrl;

        if (pathname) {
            const route = routes.matchUrl(pathname);

            if (route) {
                app.render(req, res, route.page, { ...query, ...route.params });
                return;
            }
        }

        handler(req, res, parsedUrl);
    };
};
