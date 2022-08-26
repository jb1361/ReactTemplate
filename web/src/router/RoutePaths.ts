export interface RoutePath {
  path: string;
  component: any;
}
const notFound = '/not-found';

const RootPath = {
  all: '*',
  root: '*',
  home: '/',
  hometwo: 'hometwo'
};

enum MiscellaneousPaths {
  storage = '/storage',
  images = '/images'
}

enum DashboardPaths {
  dashboard = '/dashboard'
}

enum AuthenticationPaths {
  login = '/login',
  logout = '/logout',
  forgotPassword = '/forgot-password',
  resetPassword = '/reset-password'
}

enum ConfigurationPaths {
}

export function applyBasePath(basePath: string, pathFn: (basePath: string) => string) {
  return pathFn(basePath);
}

export function applyBasePaths(basePath: string, ...pathsFns: ((basePath: string) => string)[]) {
  return pathsFns.map(fn => applyBasePath(basePath, fn));
}

export interface ComponentPath {
  component: any;
  paths: string[];
}

export function convertComponentPaths(...editorPaths: ComponentPath[]): RoutePath[] {
  return editorPaths.map(editorPath => editorPath.paths.map(path => ({
    path: path,
    component: editorPath.component
  }))).flat(1);
}

export type UrlParam = number|string;

export const RoutePaths = {
  ...RootPath,
  ...MiscellaneousPaths,
  ...AuthenticationPaths,
  ...DashboardPaths,
  ...ConfigurationPaths,
  notFound: notFound
};
