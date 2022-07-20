// Initializes the `entities` service on path `/api/entity`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Entities } from './entities.class';
import hooks from './entities.hooks';
import { EntityModel } from './entities.model';
import schema from './entities.schema';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'api/entity': Entities & ServiceAddons<EntityModel>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  const handler = new Entities(options, app);
  app.use('/api/entity', Object.assign(handler, schema));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/entity');

  service.hooks(hooks);
}
