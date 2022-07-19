import { boot } from 'quasar/wrappers'
import feathers from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import axios from 'axios';
import { App, entityApiKey } from '.';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  const apiClient = axios.create({ baseURL: '/' });
  const restClient = rest()
  const api = feathers() as App

  api.configure(restClient.axios(apiClient))
  const entityApi = api.service('/api/entity')

  app.provide(entityApiKey, entityApi)
})
