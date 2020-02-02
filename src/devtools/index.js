import Vue from 'vue'
import App from './App.vue'
import iView from 'iview';
import JsonViewer from 'vue-json-viewer'
import 'iview/dist/styles/iview.css';
import 'highlight.js/styles/agate.css';
Vue.use(iView)
Vue.use(JsonViewer)

new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
