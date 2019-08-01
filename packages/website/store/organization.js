export const state = () => ({
  organizations: [],
  param: 'fd',
})

export const getters = {
  organizations: state => state.organizations,
  param: state => state.param,
}

export const mutations = {
  setOrganizations(state, organizations) {
    state.organizations = organizations
  },
  setParam(state, param) {
    state.param = param
  },
}

export const actions = {
  async list({ commit, dispatch }) {
    try {
      dispatch('wait/start', 'organizations.list', { root: true })
      const result = await this.$http.$get('organizations')
      const { data } = result
      commit('setOrganizations', data)
      dispatch('wait/end', 'organizations.list', { root: true })
      return true
    } catch (e) {
      dispatch('wait/end', 'organizations.list', { root: true })
      return false
    }
  },
  async param({ commit }, param) {
    try {
      commit('setParam', param)
    } catch (e) {
      return null
    }
  },
}
