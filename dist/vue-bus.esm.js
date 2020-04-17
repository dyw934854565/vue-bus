/*!
 * vue-bus v1.2.1
 * https://github.com/yangmingshan/vue-bus
 * @license MIT
 */
function VueBus(Vue) {
  var bus = new Vue();
  var evtName = 'vue-bus:beforeDestroy';
  var onOrOnce = function(funcName, event, callback, target) {
    var this$1 = this;

    this[funcName](event, callback);
    if (target && target instanceof Vue) {
      target.$once(evtName, function () {
        this$1.$off(event, callback);
      });
    }
  };
  Object.defineProperties(bus, {
    on: {
      get: function get() {
        return onOrOnce.bind(this, '$on')
      }
    },
    once: {
      get: function get() {
        return onOrOnce.bind(this, '$once')
      }
    },
    off: {
      get: function get() {
        return this.$off.bind(this)
      }
    },
    emit: {
      get: function get() {
        return this.$emit.bind(this)
      }
    }
  });

  Object.defineProperty(Vue, 'bus', {
    get: function get() {
      return bus
    }
  });

  Object.defineProperty(Vue.prototype, '$bus', {
    get: function get() {
      return bus
    }
  });

  Vue.mixin({
    beforeDestroy: function() {
      this.$emit(evtName);
    }
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueBus);
}

export default VueBus;
