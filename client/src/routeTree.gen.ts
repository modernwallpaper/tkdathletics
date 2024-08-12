/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as V1Import } from './routes/v1'
import { Route as IndexImport } from './routes/index'
import { Route as V1IndexImport } from './routes/v1/index'
import { Route as LoginIndexImport } from './routes/login/index'
import { Route as V1SettingsImport } from './routes/v1/settings'
import { Route as V1SettingsIndexImport } from './routes/v1/settings/index'
import { Route as V1AdminIndexImport } from './routes/v1/admin/index'
import { Route as V1SettingsNotificationsImport } from './routes/v1/settings/notifications'
import { Route as V1SettingsCompetitionDataImport } from './routes/v1/settings/competition-data'
import { Route as V1SettingsAccountImport } from './routes/v1/settings/account'

// Create/Update Routes

const V1Route = V1Import.update({
  path: '/v1',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const V1IndexRoute = V1IndexImport.update({
  path: '/',
  getParentRoute: () => V1Route,
} as any)

const LoginIndexRoute = LoginIndexImport.update({
  path: '/login/',
  getParentRoute: () => rootRoute,
} as any)

const V1SettingsRoute = V1SettingsImport.update({
  path: '/settings',
  getParentRoute: () => V1Route,
} as any)

const V1SettingsIndexRoute = V1SettingsIndexImport.update({
  path: '/',
  getParentRoute: () => V1SettingsRoute,
} as any)

const V1AdminIndexRoute = V1AdminIndexImport.update({
  path: '/admin/',
  getParentRoute: () => V1Route,
} as any)

const V1SettingsNotificationsRoute = V1SettingsNotificationsImport.update({
  path: '/notifications',
  getParentRoute: () => V1SettingsRoute,
} as any)

const V1SettingsCompetitionDataRoute = V1SettingsCompetitionDataImport.update({
  path: '/competition-data',
  getParentRoute: () => V1SettingsRoute,
} as any)

const V1SettingsAccountRoute = V1SettingsAccountImport.update({
  path: '/account',
  getParentRoute: () => V1SettingsRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/v1': {
      id: '/v1'
      path: '/v1'
      fullPath: '/v1'
      preLoaderRoute: typeof V1Import
      parentRoute: typeof rootRoute
    }
    '/v1/settings': {
      id: '/v1/settings'
      path: '/settings'
      fullPath: '/v1/settings'
      preLoaderRoute: typeof V1SettingsImport
      parentRoute: typeof V1Import
    }
    '/login/': {
      id: '/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginIndexImport
      parentRoute: typeof rootRoute
    }
    '/v1/': {
      id: '/v1/'
      path: '/'
      fullPath: '/v1/'
      preLoaderRoute: typeof V1IndexImport
      parentRoute: typeof V1Import
    }
    '/v1/settings/account': {
      id: '/v1/settings/account'
      path: '/account'
      fullPath: '/v1/settings/account'
      preLoaderRoute: typeof V1SettingsAccountImport
      parentRoute: typeof V1SettingsImport
    }
    '/v1/settings/competition-data': {
      id: '/v1/settings/competition-data'
      path: '/competition-data'
      fullPath: '/v1/settings/competition-data'
      preLoaderRoute: typeof V1SettingsCompetitionDataImport
      parentRoute: typeof V1SettingsImport
    }
    '/v1/settings/notifications': {
      id: '/v1/settings/notifications'
      path: '/notifications'
      fullPath: '/v1/settings/notifications'
      preLoaderRoute: typeof V1SettingsNotificationsImport
      parentRoute: typeof V1SettingsImport
    }
    '/v1/admin/': {
      id: '/v1/admin/'
      path: '/admin'
      fullPath: '/v1/admin'
      preLoaderRoute: typeof V1AdminIndexImport
      parentRoute: typeof V1Import
    }
    '/v1/settings/': {
      id: '/v1/settings/'
      path: '/'
      fullPath: '/v1/settings/'
      preLoaderRoute: typeof V1SettingsIndexImport
      parentRoute: typeof V1SettingsImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  V1Route: V1Route.addChildren({
    V1SettingsRoute: V1SettingsRoute.addChildren({
      V1SettingsAccountRoute,
      V1SettingsCompetitionDataRoute,
      V1SettingsNotificationsRoute,
      V1SettingsIndexRoute,
    }),
    V1IndexRoute,
    V1AdminIndexRoute,
  }),
  LoginIndexRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/v1",
        "/login/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/v1": {
      "filePath": "v1.tsx",
      "children": [
        "/v1/settings",
        "/v1/",
        "/v1/admin/"
      ]
    },
    "/v1/settings": {
      "filePath": "v1/settings.tsx",
      "parent": "/v1",
      "children": [
        "/v1/settings/account",
        "/v1/settings/competition-data",
        "/v1/settings/notifications",
        "/v1/settings/"
      ]
    },
    "/login/": {
      "filePath": "login/index.tsx"
    },
    "/v1/": {
      "filePath": "v1/index.tsx",
      "parent": "/v1"
    },
    "/v1/settings/account": {
      "filePath": "v1/settings/account.tsx",
      "parent": "/v1/settings"
    },
    "/v1/settings/competition-data": {
      "filePath": "v1/settings/competition-data.tsx",
      "parent": "/v1/settings"
    },
    "/v1/settings/notifications": {
      "filePath": "v1/settings/notifications.tsx",
      "parent": "/v1/settings"
    },
    "/v1/admin/": {
      "filePath": "v1/admin/index.tsx",
      "parent": "/v1"
    },
    "/v1/settings/": {
      "filePath": "v1/settings/index.tsx",
      "parent": "/v1/settings"
    }
  }
}
ROUTE_MANIFEST_END */
