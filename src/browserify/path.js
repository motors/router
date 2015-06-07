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
