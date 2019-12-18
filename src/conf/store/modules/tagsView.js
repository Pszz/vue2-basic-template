export default {
  visitedViews: {
    value: []
  },
  cachedViews: {
    value: []
  },
  // View操作
  view: {
    actions: function (name, { commit, state }, { view, type }) {
      let visitedViews = state.visitedViews
      let cachedViews = state.cachedViews
      switch (type) {
        case 'ADD':
          // visitedViews 插入
          if (!visitedViews.some(v => v.path === view.path)) {
            visitedViews.push(
              Object.assign({}, view, {
                title: view.meta.title || 'no-name'
              })
            )
          }
          // cachedViews 插入
          if (cachedViews.includes(view.name)) return
          if (!view.meta.noCache) {
            cachedViews.push(view.name)
          }
          break
        case 'UPDATE':
          for (let v of visitedViews) {
            if (v.path === view.path) {
              v = Object.assign(v, view)
              break
            }
          }
          break
        case 'DEL': // 删除自身
          // visitedViews
          for (const [i, v] of visitedViews.entries()) {
            if (v.path === view.path) {
              visitedViews.splice(i, 1)
              break
            }
          }
          // cachedViews
          for (const i of cachedViews) {
            if (i === view.name) {
              const index = cachedViews.indexOf(i)
              cachedViews.splice(index, 1)
              break
            }
          }
          break
        case 'DEL_OTHER': // 删除其他
          // visitedViews
          visitedViews = visitedViews.filter(v => {
            return v.meta.affix || v.path === view.path
          })
          // cachedViews
          for (const i of cachedViews) {
            if (i === view.name) {
              const index = cachedViews.indexOf(i)
              cachedViews = cachedViews.slice(index, index + 1)
              break
            }
          }
          break
        case 'DEL_ALL': // 删除全部
          visitedViews = visitedViews.filter(tag => tag.meta.affix)
          cachedViews = []
          break
        default:
          break
      }
      commit('setVisitedViews', visitedViews)
      commit('setCachedViews', visitedViews)
    }
  }
}
