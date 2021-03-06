import Vue from 'vue'
import App from './App.vue'

Vue.filter('toLowercase', (value) => {
  return value.toLowerCase();
})

Vue.mixin({
  created() {
    console.log('global mixin');
  } 
})

new Vue({
  el: '#app',
  render: h => h(App)
})
