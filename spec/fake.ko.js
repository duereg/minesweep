module.exports = {
  observable: function (value) {
    return function (otherValue) {
      if (otherValue !== undefined) value = otherValue;
      return value;
    };
  },
  observableArray: function (value) {
    var get = function (otherValue) {
      if (otherValue !== undefined) value = otherValue;
      return value;
    };
    get.removeAll = function () {};
    return get;
  },
  computed: function (value) {
    return function () {
      return value;
    }
  }
};
