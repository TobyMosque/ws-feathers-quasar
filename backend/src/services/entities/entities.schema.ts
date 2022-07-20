export default {
  description: 'Entity',
  definition: {
    type: 'object',
    required: [ 'id', 'name' ],
    properties: {
      username: { type: 'string', description: 'Id' },
      password: { type: 'string', description: 'Name' }
    }
  }
};
