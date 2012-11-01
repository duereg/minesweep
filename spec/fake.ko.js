module.exports = { 
    observable: function(value) { return function() {return value;}},
    observableArray: function(value) {
        var get = function() {return value;};
        get.removeAll = function() {};
        return get;
    },
    computed: function(value) {return function() {return value;}} 
};