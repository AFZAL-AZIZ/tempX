const http = require('http');

function createApp() {
  const routes = [];

  const app = (req, res) => {
    const { url, method } = req;

    // Simple route matching
    for (let route of routes) {
      if (route.path === url && route.method === method) {
        return route.handler(req, res);
      }
    }

    res.statusCode = 404;
    res.end('Not Found');
  };

  // Register GET handler
  app.get = (path, handler) => {
    routes.push({ path, method: 'GET', handler });
  };

  return app;
}
