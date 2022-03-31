// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'amfe-flexible'
import 'vant/lib/index.less'
import '@/assets/style/common.css'
import store from './store/index'
import axios from 'axios'
// import Vconsole from 'vconsole'
import { uploadFile } from './request/http'

// new Vconsole()

Vue.prototype.$store = store; // store
Vue.prototype.$axios = axios    //ȫ��ע�ᣬʹ�÷���Ϊ:this.$axios
Vue.config.productionTip = false
Vue.prototype.$UploadFile = uploadFile;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, //���Զ����store���� ��vueʵ����������ˣ������������� ���� this.$store
  components: { App },
  template: '<App/>'
})
