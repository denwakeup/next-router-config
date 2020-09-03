import { match, compile, MatchFunction, PathFunction } from 'path-to-regexp';
import { RouteConfig } from '../types/route-config';
import { MaybeRouteMatch } from '../types/route-match';

export class Route<Name extends string = string> {
    name: Name;

    page: string;

    pattern: string;

    private matcher: MatchFunction;

    private compiler: PathFunction;

    constructor({ name, page, pattern }: RouteConfig<Name>) {
        this.page = page.startsWith('/') ? page : `/${page}`;
        this.name = name;
        this.pattern = pattern;

        this.matcher = match(pattern);
        this.compiler = compile(pattern);
    }

    match = (url: string): MaybeRouteMatch => {
        const data = this.matcher(url);

        if (!data) {
            return false;
        }

        const { path, params } = data;

        return {
            params,
            pathname: path,
            page: this.page,
            name: this.name,
            pattern: this.pattern,
        };
    };

    compile = (params?: object) => this.compiler(params);
}
