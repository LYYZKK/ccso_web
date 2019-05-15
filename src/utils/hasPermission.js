export default {
  install (Vue, options) {
    Vue.directive('has', {
      inserted: (el, binding, vnode) => {
        let permissionList = vnode.context.$route.meta.permissionList
        if (permissionList === null || permissionList === '' || permissionList === undefined) {
          el.parentNode.removeChild(el)
          return
        }
        let permissions = []
        for (var item of permissionList) {
          permissions.push(item.action)
        }
        if (!permissions.includes(binding.value)) {
          el.parentNode.removeChild(el)
        }
      }
    })
  }
}
