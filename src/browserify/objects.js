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