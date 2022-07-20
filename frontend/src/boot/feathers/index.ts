import { InjectionKey, App as AppVue } from 'vue'
import { Application, Service } from '@feathersjs/feathers'
import feathers from '@feathersjs/feathers'
import { EntityModel as Entity } from 'backend/src/services/entities/entities.model'
import { setupFeathersPinia } from 'feathers-pinia'

export type EntityModel = Entity

export type App = Application<{
  '/api/entity': Service<EntityModel>
}>

export const apiKey: InjectionKey<App> = Symbol('api-key')
export const entityApiKey: InjectionKey<Service<EntityModel>> = Symbol('entity-api-key')
export type ConfigureFn = Parameters<App['configure']>[0]

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export function bootstrap(app: AppVue, configure: ConfigureFn) {
  const api = feathers() as App

  api.configure(configure)
  const entityApi = api.service('/api/entity')

  app.provide(apiKey, api)
  app.provide(entityApiKey, entityApi)

  setupFeathersPinia({
    clients: { api },
    idField: 'id',
  })
}
