import { InjectionKey, App as AppVue } from 'vue'
import { Application, Service } from '@feathersjs/feathers'
import feathers from '@feathersjs/feathers'
import { EntityModel as Entity } from 'backend/src/services/entities/entities.model'
import { Cookies } from 'quasar';
import { QSsrContext } from '@quasar/app-vite';
import auth from '@feathersjs/authentication-client';

export type EntityModel = Entity

export type App = Application<{
  '/api/entity': Service<EntityModel>
}>

export const apiKey: InjectionKey<App> = Symbol('api-key')
export const entityApiKey: InjectionKey<Service<EntityModel>> = Symbol('entity-api-key')
export type ConfigureFn = Parameters<App['configure']>[0]

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export function bootstrap(app: AppVue, ssrContext: QSsrContext, configure: ConfigureFn) {
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;

  const api = feathers() as App
  
  api.configure(configure)
  api.configure(auth({ 
    storage: {
      getItem(key: string) {
        return JSON.stringify(cookies.get(key));
      },
      setItem(key: string, value: string) {
        const obj = JSON.parse(value);
        cookies.set(key, obj, { path: '/', sameSite: 'Lax', secure: true });
      },
    }
  }))
  const entityApi = api.service('/api/entity')

  app.provide(apiKey, api)
  app.provide(entityApiKey, entityApi)
}
