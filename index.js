export default {
  install(Vue, options) {
    const Loading = Vue.extend({
      template: `<div :style="container" v-if="visible">
                  <img :style="img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532421870744&di=6fa8e7597e5f604c1436152b41f89205&imgtype=0&src=http%3A%2F%2Fimg14.3lian.com%2F201510%2F21%2Faf398caa308168a2f8ce706dabc71934.gif" />
                 </div>`,
      props: ['visible'],
      data() {
        return {
          container: {
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#fff'
          },
          img: {
            width: '50px',
            height: '50px'
          }
        }
      }
    })
    
    Vue.directive('myLoading', {
      bind(el, binding, vnode) {
        const loading = new Loading({
          el: document.createElement('div'),
          propsData: {
            visible: false
          }
        })

        el.instance = loading
        el.$el = loading.$el

        binding.value && toggleLoading(el, binding)
      },

      update(el, binding) {
        if (binding.oldValue !== binding.value) {
          console.log(el, binding.value)
          toggleLoading(el, binding)
        }
      }
    })

    const toggleLoading = (el, binding) => {
      if (binding.value) {
        el.style.position = 'relative'
        el.appendChild(el.$el)
        Vue.nextTick(() => el.instance.visible = true)
      } else {
        el.instance.visible = false
      }
    }
  }
}