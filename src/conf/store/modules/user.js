export default {
  name: '',
  logind: {
    value: false,
    storage: 'session',
    actions (name, { commit }, payload) {
      if (payload === false) {
          commit('setSess', '')
          commit('setUinfo', '')
          this.vm.$ws.request(this.vm.$wsapi.logout, res => {})
      } 
      commit(name, payload)
    }
  },
  uinfo: {
    value: {},
    storage: 'session',
    actions (name, { commit }, payload) {
      commit(name, payload)
    }
  },
  sess: {
    value: {},
    storage: 'session',
    actions (name, { commit }, payload) {
      commit(name, payload)
    }
  }
}
