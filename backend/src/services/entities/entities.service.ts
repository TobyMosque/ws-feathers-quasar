// Initializes the `entities` service on path `/api/entity`
import { Application } from '../../declarations';
import { Entities } from './entities.class';
import hooks from './entities.hooks';
import schema from './entities.schema';

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  const handler = new Entities(options, app);
  app.use('/api/entity', Object.assign(handler, { docs: schema }));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/entity');

  service.hooks(hooks);
}
