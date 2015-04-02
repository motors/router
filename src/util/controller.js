define(function() {

  var controller = {

    /**
     * Parse string in format `controller@method` and return
     * the method function.
     *
     * @param {string} str The string to parse
     * @param {string} controllers The path to the controllers folder
     * @param {function} cb Success callback
     */
    method: function(str, controllers, cb) {
      var parts = str.split('@');
      var controllerName = parts[0];
      var methodName = parts[1];

      require([controllers + '/' + controllerName], function(controller) {
        cb(controller[methodName]);
      });
    }

  };

  return controller;

});