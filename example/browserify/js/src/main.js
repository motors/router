var router = require('../../../../src/browserify/router');

var landing = require('./controllers/landing');

var app = {

    routes: {

        // Landing view
        'router/example/browserify/index.html': landing.index,

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