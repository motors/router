define(function() {

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
      extend(this.configuration, configuration);
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
        var currentUrl = getCurrentUrl();
        Object.keys(routes).forEach(function(route) {
          if(isRouteMatch(currentUrl, route)) {
            routes[route](getParams(currentUrl, route));
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

  function isRouteMatch(currentRoute, compare) {
    var currentPathParts = currentRoute.split('/'),
      compareParts = compare.split('/');

    if (currentPathParts.length === compareParts.length) {
      for (var i = 0; i < currentPathParts.length; i++) {
        if (!isParam(compareParts[i])) {
          if (compareParts[i] !== currentPathParts[i]) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }

  function isParam(str) {
    var firstChar = str[0];
    var lastChar = str[str.length - 1];
    return (firstChar === '{' && lastChar === '}');
  }

  function getParams(current, path) {
    var currentPathParts = current.split('/'),
      pathParts = path.split('/'),
      options = {};

    for (var i = 0; i < currentPathParts.length; i++) {
      if (isParam(pathParts[i])) {
        var paramName = getParamName(pathParts[i]);
        options[paramName] = currentPathParts[i];
      }
    }
    return options;
  }

  function getParamName(str) {
    return str.substr(1, str.length - 2);
  }

  function getCurrentUrl() {
    return window.location.pathname.substr(1);;
  }

  function extend(obj1, obj2) {
    Object.keys(obj2).forEach(function(key) {
      obj1[key] = obj2[key];
    });
  }

  return router;

});