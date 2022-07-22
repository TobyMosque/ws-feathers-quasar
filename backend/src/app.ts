import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';

import feathers from '@feathersjs/feathers';
import configuration from '@feathersjs/configuration';
import express, { Application } from '@feathersjs/express';

import logger from './logger';
import middleware from './middleware';
import services from './services';
import appHooks from './app.hooks';
import channels from './channels';
import { HookContext as FeathersHookContext } from '@feathersjs/feathers';
// Don't remove this comment. It's needed to format import lines nicely.
export type HookContext<T = any> = {
  app: Application;
} & FeathersHookContext<T>;
import swagger from 'feathers-swagger';

import { Express } from 'express';

export default function bootstrap(expressApp: Express) {
  const app: Application = (express as any)(feathers(), expressApp);

  // Load app configuration
  app.configure(configuration());
  // Enable security, CORS, compression, favicon and body parsing
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  app.use(cors());
  app.use(compress());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.configure(
    swagger({
      docsPath: '/api/docs',
      uiIndex: true,
      specs: {
        info: {
          title: 'A test',
          description: 'A description',
          version: '1.0.0',
        },
      },
    })
  );
  // app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
  // Host the public folder
  // app.use('/api', express.static(app.get('public')));

  // Set up Plugins and providers
  app.configure(express.rest());

  // Configure other middleware (see `middleware/index.ts`)
  app.configure(middleware);
  // Set up our services (see `services/index.ts`)
  app.configure(services);
  // Set up event channels (see channels.ts)
  app.configure(channels);

  // Configure a middleware for 404s and the error handler
  // app.use(express.notFound());
  app.use(express.errorHandler({ logger } as any));

  app.hooks(appHooks);

  return app;
}
