export default {
  withoutAnimation: false,
  device: 'desktop',
  opened: {
    value: true,
    storage: 'session',
    actions: function (name, { commit, state }, { type, payload }) {
      let opened = state.opened
      let withoutAnimation = state.withoutAnimation
      switch (type) {
        case 'TOGGLE':
          opened = !opened
          withoutAnimation = false
          break
        case 'CLOSE':
          opened = false
          withoutAnimation = payload
          break
      }
      commit('setWithoutAnimation', withoutAnimation)
      commit(name, opened)
    }
  }
}
