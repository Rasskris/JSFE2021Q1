import regExpToString from '../../utils/regexp-to-string/regexp-to-string';

type OnRoutePatternMatched = (a: string) => void;

export default class Router {
  routes: { pattern: RegExp | string, target: string }[];

  route: string | null = null;

  fragment: string; 

  stateChangeTimer: NodeJS.Timeout | null = null;

  onRoutePatternMatched: OnRoutePatternMatched | null = null;

  constructor(routes: { pattern: RegExp | string, target: string }[]) {
    this.routes = routes;
    this.fragment = '';
    this.start();
  }

  addRoute(pattern: RegExp | string, target: string): Router {
    this.routes.push({ pattern, target });

    return this;
  }

  getRoute(): string {
    const match = window.location.href.match(/#(.*)$/);
    this.fragment = match ? match[1] : '';

    return regExpToString(this.fragment);
  }

  deleteRoute(target: string): Router {
    this.routes.forEach((route, i): void => {
      if (route.target === target) {
        this.routes.slice(i, 1);
      }
    });

    return this;
  }

  start(): void {
    if (this.stateChangeTimer) {
      clearInterval(this.stateChangeTimer);
    }

    this.stateChangeTimer = setInterval(this.stateChangeListener.bind(this), 500);
  }

  stateChangeListener(): void {
    if (this.route === this.getRoute()) {
      return;
    }

    this.onStateChange();
  }

  onStateChange(): void {
    this.route = this.getRoute();

    this.routes.some((route): boolean => {
      const match = this.route?.match(route.pattern);

      if (match) {
        this.onRoutePatternMatched?.(route.target);

        return true;
      }
      return false;
    });
  }

  // regExpToString(pattern: RegExp | string): string {
  //   return pattern.toString().replace(/\/$/, '').replace(/^\//, '');
  // }
}

