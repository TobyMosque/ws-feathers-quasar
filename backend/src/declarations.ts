import { ServiceAddons, Application as ExpressFeathers } from '@feathersjs/feathers';
import { Entities } from './services/entities/entities.class';
import { EntityModel } from './services/entities/entities.model';

export interface ServiceTypes {
  'api/entity': Entities & ServiceAddons<EntityModel>;
}
export type Application = ExpressFeathers<ServiceTypes>;
