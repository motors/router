define([
  './util/objects',
  './util/path'
], function(objects, path) {

  var router = {

    // defaults
    configuration: {
      controllers: './controllers'
    },

    /**
     * Configure the router
     *
     * @param configuration
     */
    config: function(configuration) {
      objects.extend(this.configuration, configuration);
    },

    /**
     * @param {object} options
     */
    route: function(options) {
      if(options.hasOwnProperty('config')) {
        this.config(options.config);
      }
      if(options.hasOwnProperty('before')) {
        options.before();
      }

      var routeConfig = options.hasOwnProperty('routes') ? options.routes : (options || {});
      parseRoutes.call(this, routeConfig, function(routes) {
        Object.keys(routes).forEach(function(route) {
          if(path.isMatch(route)) {
            routes[route](path.parameters(route));
            if(options.hasOwnProperty('after')) {
              options.after();
            }
          }
        });
      });
    }

  };

  function parseRoutes(routeConfig, cb) {
    var self = this;
    var routes = {};
    var toProcess = Object.keys(routeConfig).length;
    var processed = 0;

    Object.keys(routeConfig).forEach(function(key) {
      var value = routeConfig[key];
      if(typeof value === 'string') {
        parseControllerMethod.call(self, value, function(fn) {
          routes[key] = fn;
          if(++processed === toProcess) {
            cb(routes);
          }
        });
      } else if(typeof value === 'function') {
        routes[key] = value;
        if(++processed === toProcess) {
          cb(routes);
        }
      }
    });
    return routes;
  }

  function parseControllerMethod(str, cb) {
    var parts = str.split('@');
    var controllerName = parts[0];
    var methodName = parts[1];

    require([this.configuration.controllers + '/' + controllerName], function(controller) {
      cb(controller[methodName]);
    });
  }

  return router;

});