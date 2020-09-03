# Next custom routes

[Path-to-regexp](https://www.npmjs.com/package/path-to-regexp) based custom routers for a [Next.js](https://github.com/vercel/next.js) apps.

## Install

```bash
// yarn
yarn add next-custom-routes

// npm
npm i --save next-custom-routes
```

## Base example

### Create Routes

1. Create routes config

```ts
// src/routes/config.ts
export enum RoutesNames {
    Home = 'home',
    Entity = 'entity',
}

export const routesConfig = [
    {
        name: RoutesNames.Home,
        page: '/home',
        pattern: '/',
    },
    {
        name: RoutesNames.Entity,
        page: '/entity',
        pattern: '/entity/:id(\\d+)',
    },
];
```

RouteConfig params:

-   `name` - route name
-   `page` - the path of the page in `/pages`
-   `pattern` - [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) pattern

2. Create custom routes instance

```ts
// src/routes/index.ts
import { createRoutes } from 'next-custom-routes';
import { routesConfig } from './config.ts';

export const { routes, useRouteLink } = createRoutes({
    config: routesConfig,
});
```

### On the server

```ts
// src/server/index.ts
import { createServer } from 'http';
import { parse } from 'url';

import next from 'next';
import { createServerHandler } from 'next-custom-routes';

import { routes } from 'src/routes';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const serverRequestHandler = createServerHandler({
    app,
    routes,
});

app.prepare().then(() => {
    createServer(serverRequestHandler).listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});
```

### On the client

```tsx
import React, { useMemo } from 'react';
import Link from 'next/link';

import { RoutesNames, useRouteLink, useCustomRouter } from 'src/routes';

const EntityPageMenuItem = ({ entityId }) => {
    const routeParams = useMemo(
        () => ({
            id: entityId,
        }),
        [entityId]
    );

    const { as, url } = useRouteLink({
        routeParams,
        routeName: RoutesNames.Entity,
    });

    return (
        <Link href={url} as={as}>
            <a href={as}>Entity {entityId}</a>
        </Link>
    );
};

const HomePage = () => {
    const router = useCustomRouter();

    return <div>Home page</div>;
};
```

## API reference

### Routes

-   `matchUrl(url: string) => RouteMatch | undefined`

    -   `RouteMatch`
        -   `params` - parsed params from url
        -   `page` - path of the page in `/pages`
        -   `name` - route name
        -   `pattern` - path-to-regexp pattern

-   `getRoute({ routeName, routeParams }) => RouteLink | undefined`
    -   `RouteLink`
        -   `pathname` - uri
        -   `page` - path of the page in `/pages`
        -   `params` - route params

## Inspired by

[next-routes](https://github.com/fridays/next-routes)
