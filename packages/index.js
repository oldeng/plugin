import VComment from './v-comment/index.vue';

const components = [
  VComment
]

export {
  VComment
}

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
