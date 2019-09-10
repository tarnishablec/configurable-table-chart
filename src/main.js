import Vue from 'vue'
import App from './App.vue'
import '@/plugins/vue-echarts.js'
import '@/style/index.scss'

import draggableComponent from "vuedraggable/src/vuedraggable";

Vue.component('draggable', draggableComponent);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
