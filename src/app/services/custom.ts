import {
    RouteReuseStrategy,
    ActivatedRouteSnapshot,
    DetachedRouteHandle,
    RouterModule,
    Routes,
    UrlSegment,
} from "@angular/router";

export class CustomReusingStrategy implements RouteReuseStrategy {

    private acceptedRoutes: string[] = ["dashboard","api-information","tables","user-profile"];

    private cache: { [key: string]: DetachedRouteHandle } = {};

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        if (this.acceptedRoutes.indexOf(route.routeConfig.path) > -1) {
            console.log("detaching", route);
            return true;
        } else {
            return false; // will be "view/:resultId" when user navigates to result
        }
    }
    store(route: ActivatedRouteSnapshot, handler: DetachedRouteHandle): void {
        if (handler) {
            this.cache[this.getUrl(route)] = handler;
        }
    }
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!this.cache[this.getUrl(route)];
    }
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (!route.routeConfig || route.routeConfig.loadChildren) {
            return null;
        }
        return this.cache[this.getUrl(route)];
    }
    shouldReuseRoute(
        future: ActivatedRouteSnapshot,
        current: ActivatedRouteSnapshot
    ): boolean {
        if (
            future.routeConfig &&
            future.routeConfig.data &&
            future.routeConfig.data.reuse !== undefined
        ) {
            return future.routeConfig.data.reuse;
        }
        return future.routeConfig === current.routeConfig;
    }
    getUrl(route: ActivatedRouteSnapshot): string {
        if (route.routeConfig) {
            return route.routeConfig.path;
        }
    }
}