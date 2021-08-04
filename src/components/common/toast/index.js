import PopUp from './PopUp.vue'

const obj = {};

obj.install = function(Vue){
  
  // 1.创建组件构造器
  // const toastConstructor = Vue.extend(PopUp);

  // // 2.通过new的方式，根据组件构造器，可以创建出来一个组件对象
  // const toast = new toastConstructor();

  // // 3.将组件对象，手动挂载到某一个元素上
  // toast.$mount(document.createElement('div'))

  // // 4.这个时候toast.$el对应的就是div，然后将其添加到body中
  // document.body.appendChild(toast.$el)

  // // 这里是创建一个属性，来保存弹窗组件
  // Vue.prototype.$toast = PopUp;
};

export default obj;