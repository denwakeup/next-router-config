# Next router config

[![npm](https://img.shields.io/npm/v/next-router-config)](https://www.npmjs.com/package/next-router-config)

[Path-to-regexp](https://www.npmjs.com/package/path-to-regexp) based custom routers for a [Next.js](https://github.com/vercel/next.js) apps.

## Install

```bash
// yarn
yarn add next-router-config

// npm
npm i --save next-router-config
```

## Base example

### Create Routes

1. Create routes config

```ts
// src/routes/config.ts
import { RoutesConfig } from 'next-router-config';

export enum RoutesNames {
    Home = 'home',
    Entity = 'entity',
}

export const routesConfig: RoutesConfig = [
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
import { createRoutes } from 'next-router-config';
import { routesConfig } from './config';

export const { routes, useCustomRouteLink, useCustomRouter } = createRoutes({
    config: routesConfig,
});
```

### On the server

```ts
// src/server/index.ts
import { createServer } from 'http';
import { parse } from 'url';

import next from 'next';
import { createServerRequestHandler } from 'next-router-config';

import { routes } from 'src/routes';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const serverRequestHandler = createServerRequestHandler({
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

import { RoutesNames, useCustomRouteLink, useCustomRouter } from 'src/routes';

const EntityPageMenuItem = ({ entityId }) => {
    const routeParams = useMemo(
        () => ({
            id: entityId,
        }),
        [entityId]
    );

    const link = useCustomRouteLink({
        routeParams,
        routeName: RoutesNames.Entity,
    });

    if (!link) {
        return null;
    }

    return (
        <Link href={link.url} as={link.as}>
            <a href={link.as}>Entity {entityId}</a>
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
