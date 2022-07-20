import { App as AppVue } from 'vue'
import feathers from '@feathersjs/feathers'
import { EntityModel as Entity } from 'backend/src/services/entities/entities.model'
import { Application } from 'backend/src/declarations'
import { setupFeathersPinia } from 'feathers-pinia'

export type EntityModel = Entity

export type ConfigureFn = Parameters<Application['configure']>[0]

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export function bootstrap(app: AppVue, configure: ConfigureFn) {
  const api = feathers() as Application

  api.configure(configure)
  setupFeathersPinia({
    clients: { api },
    idField: 'id',
  })
}
