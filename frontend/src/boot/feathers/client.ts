import { boot } from 'quasar/wrappers';
import rest from '@feathersjs/rest-client';
import axios from 'axios';
import { bootstrap } from '.';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  const apiClient = axios.create({ baseURL: '/' });
  const restClient = rest();
  bootstrap({ app, services: restClient.axios(apiClient) });
});
