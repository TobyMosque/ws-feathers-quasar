import { InjectionKey } from 'vue'
import { Application, Service } from '@feathersjs/feathers'

export interface Entity {
  id: string
  name: string
}

export type App = Application<{
  '/api/entity': Service<Entity>
}>

export const entityApiKey: InjectionKey<Service<Entity>> = Symbol('entity-key')