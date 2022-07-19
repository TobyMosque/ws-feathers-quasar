import { ssrMiddleware } from 'quasar/wrappers'
import bootstrap from 'backend/lib/app';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/developing-ssr/ssr-middlewares
export default ssrMiddleware(async ({ app /*, resolveUrlPath, publicPath, render */ }) => {
  bootstrap(app)
})
