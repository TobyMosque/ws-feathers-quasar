import { boot } from 'quasar/wrappers'
import services from 'backend/src/services/index'
import { bootstrap } from './index';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  bootstrap(app, services as never)
})
