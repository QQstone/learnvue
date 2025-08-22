import Vue from 'vue'
import App from './App.vue'
import './public-path'

Vue.config.productionTip = false

let instance = null;

function render(props = {}) {
  const { container } = props;

  instance = new Vue({
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// Running in qiankun
/* eslint-disable no-undef */
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

// Running standalone
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}

export async function update(props) {
  console.log('update props', props)
}