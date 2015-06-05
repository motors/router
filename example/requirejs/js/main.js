require([ './require-config' ], function() {
  require([
    '../../src/router'
  ], function(router) {

    var app = {

      routes: {

        // Landing view
        'Users/holdenrehg/Google%20Drive/dev/libs/motors/router/example/index.html': 'landing@index',

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
});
