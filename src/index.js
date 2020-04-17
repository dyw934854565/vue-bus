function VueBus(Vue) {
  const bus = new Vue()
  const evtName = 'vue-bus:beforeDestroy'
  const onOrOnce = function(funcName, event, callback, target) {
    this[funcName](event, callback)
    if (target && target instanceof Vue) {
      target.$once(evtName, () => {
        this.$off(event, callback)
      })
    }
  }
  Object.defineProperties(bus, {
    on: {
      get() {
        return onOrOnce.bind(this, '$on')
      }
    },
    once: {
      get() {
        return onOrOnce.bind(this, '$once')
      }
    },
    off: {
      get() {
        return this.$off.bind(this)
      }
    },
    emit: {
      get() {
        return this.$emit.bind(this)
      }
    }
  })

  Object.defineProperty(Vue, 'bus', {
    get() {
      return bus
    }
  })

  Object.defineProperty(Vue.prototype, '$bus', {
    get() {
      return bus
    }
  })

  Vue.mixin({
    beforeDestroy: function() {
      this.$emit(evtName)
    }
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueBus)
}

export default VueBus
