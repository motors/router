define([
  './util/objects',
  './util/path',
  './util/controller'
], function(objects, path, controller) {

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

    before: function(app) {
      if(app.hasOwnProperty('before')) {
        app.before();
      }
    },

    after: function(app) {
      if(app.hasOwnProperty('after')) {
        app.after();
      }
    },

    /**
     * @param {object} options
     */
    route: function(options) {
      var self = this;
      var routeConfig = options.hasOwnProperty('routes') ? options.routes : (options || {});

      if(options.hasOwnProperty('config')) {
        this.config(options.config);
      }
      this.before(options);

      generateRoutes.call(this, routeConfig, function(routes) {
        Object.keys(routes).forEach(function(route) {
          if(path.isMatch(route)) {
            routes[route](path.parameters(route));
            self.after(options);
          }
        });
      });
    }

  };

  /**
   * Generate routes from the initial route configuration
   * object provided by the user.
   *
   * @param routeConfig
   * @param cb
   */
  function generateRoutes(routeConfig, cb) {
    var self = this;
    var routes = {};
    var toProcess = Object.keys(routeConfig).length;
    var processed = 0;

    Object.keys(routeConfig).forEach(function(key) {
      var value = routeConfig[key];

      if(typeof value === 'string') {

        // the value is in `controller@method` format, find the function
        controller.method(value, self.configuration.controllers, function(fn) {
          routes[key] = fn;
          process();
        });
      } else if(typeof value === 'function') {

        // the value is already a function
        routes[key] = value;
        process()
      }
    });

    // on sucess process of route name
    function process() {
      if(++processed === toProcess) {
        cb(routes);
      }
    }
  }

  return router;

});