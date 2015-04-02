require([
  '../../src/router'
], function(router) {

  var app = {

    config: {

      controllers: './controllers'

    },

    routes: {

      // Landing view
      'landing': 'landing@index',

      // User profile view
      'user/{id}': function(args) {
        console.log('On user profile with id : ' + args.id);
      }

    },

    // Executed before routing
    before: function() {

      console.log('before route!');

    },

    // Executed after routing
    after: function() {

      console.log('after route!');

    }

  };

  router.route(app);

});