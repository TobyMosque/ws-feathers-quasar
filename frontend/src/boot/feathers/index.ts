import feathers from '@feathersjs/feathers';
import { EntityModel as Entity } from 'backend/lib/services/entities/entities.model';
import { Application } from 'backend/lib/declarations';
import { setupFeathersPinia } from 'feathers-pinia';
import auth from '@feathersjs/authentication-client';
import { Cookies } from 'quasar';
import { QSsrContext } from '@quasar/app-vite';

export type EntityModel = Entity;

export type ConfigureFn = Parameters<Application['configure']>[0];

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export function bootstrap({
  ssrContext,
  services,
}: {
  ssrContext?: QSsrContext | null;
  services: ConfigureFn;
}) {
  const api = feathers() as Application;
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;

  api.configure(services);
  api.configure(
    auth({
      storage: {
        getItem(key: string) {
          return JSON.stringify(cookies.get(key));
        },
        setItem(key: string, value: string) {
          const obj = JSON.parse(value);
          cookies.set(key, obj, { path: '/', sameSite: 'Lax', secure: true });
        },
      },
    })
  );

  setupFeathersPinia({
    clients: { api },
    idField: 'id',
  });
}
