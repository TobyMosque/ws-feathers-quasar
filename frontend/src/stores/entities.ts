import { BaseModel, defineStore } from 'feathers-pinia';
import { EntityModel } from 'src/boot/feathers/index'

class Entity extends BaseModel implements EntityModel {
  id = ''
  name = ''

  constructor(data: Entity, options: Record<string, never> = {}) {
    super(data, options)
    this.id = data.id
    this.name = data.name
    return this
  }
}

export const useEntitiesStore = defineStore({
  servicePath: '/api/entity',
  idField: 'id',
  Model: Entity
})
