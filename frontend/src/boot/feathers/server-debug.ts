import { boot } from 'quasar/wrappers';
import rest from '@feathersjs/rest-client';
import axios from 'axios';
import { bootstrap } from './index';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ ssrContext }) => {
  const apiClient = axios.create({ baseURL: 'http://localhost:9100/' });
  const restClient = rest();
  bootstrap({ ssrContext, services: restClient.axios(apiClient) });
});
