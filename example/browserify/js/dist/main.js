(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var landingController = {

    index: function (params) {
        console.log('landing page! index.html');
    }

};

module.exports = landingController;

},{}],2:[function(require,module,exports){
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
},{"../../../../src/browserify/router":5,"./controllers/landing":1}],3:[function(require,module,exports){
var obj = {

    /**
     * Extend the first object by appending
     * the second objects fields to it.
     *
     * @param first
     * @param second
     */
    extend: function (first, second) {
        Object.keys(second).forEach(function (key) {
            first[key] = second[key];
        });
    }

};

module.exports = obj;
},{}],4:[function(require,module,exports){
var path = {

    /**
     * Get the current url path name after the domain name
     * without hash parameters.
     * Ex.) http://domain.com/landing#extras => 'landing'
     *
     * @returns {string}
     */
    current: function () {
        return window.location.pathname.substr(1);
    },

    /**
     * Check is a string is in parameter formatting.
     * Parameters are wrapped in `{}`
     *
     * @param str
     * @returns {boolean}
     */
    isParameter: function (str) {
        return (str[0] === '{') && (str[str.length - 1] === '}')
    },

    /**
     * Check if the current url matches the given url
     * considering route parameter values.
     *
     * @param {string} path Path to compare against
     * @returns {boolean}
     */
    isMatch: function (compare) {
        var currentPathParts = path.current().split('/');
        var compareParts = compare.split('/');
        var match = true;

        // urls without the same number of parts cannot match
        if (currentPathParts.length !== compareParts.length) {
            return false;
        }

        // any non parameter url parts must match
        currentPathParts.forEach(function (el, i) {
            if (!path.isParameter(el) && el !== compareParts[i]) {
                match = false;
            }
        });

        return match;
    },

    /**
     * Parse parameter in the form `{name}`.
     *
     * @param {string} parameter String parameter with brackets
     * @returns {string} Name of the parameter
     */
    parameterName: function (parameter) {
        return parameter.substr(1, parameter.length - 2);
    },

    /**
     * Match a path against the current url and
     * extract the actual parameter values.
     *
     * @param {string} match Url to match against
     * @returns {object} Parameter name => current url value pairs
     */
    parameters: function (match) {
        var currentParts = path.current().split('/');
        var matchParts = match.split('/');
        var options = {};

        matchParts.forEach(function (el, i) {
            if (path.isParameter(el)) {
                options[path.parameterName(el)] = currentParts[i];
            }
        });

        return options;
    }

};

module.exports = path;

},{}],5:[function(require,module,exports){
var objects = require('./objects');
var path = require('./path');

var router = {

    /**
     * Configure the router
     *
     * @param configuration
     */
    config: function (configuration) {
        objects.extend(this.configuration, configuration);
    },

    before: function (app) {
        if (app.hasOwnProperty('before')) {
            app.before();
        }
    },

    after: function (app) {
        if (app.hasOwnProperty('after')) {
            app.after();
        }
    },

    /**
     * @param {object} options
     */
    route: function (options) {
        var self = this;
        var routeConfig = options.hasOwnProperty('routes') ? options.routes : (options || {});

        if (options.hasOwnProperty('config')) {
            this.config(options.config);
        }
        this.before(options);

        generateRoutes.call(this, routeConfig, function (routes) {
            Object.keys(routes).forEach(function (route) {
                if (path.isMatch(route)) {
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

    Object.keys(routeConfig).forEach(function (key) {
        var value = routeConfig[key];

        if (typeof value === 'function') {

            // the value is already a function
            routes[key] = value;
            process()
        }
    });

    // on sucess process of route name
    function process() {
        if (++processed === toProcess) {
            cb(routes);
        }
    }
}

module.exports = router;

},{"./objects":3,"./path":4}]},{},[2]);
