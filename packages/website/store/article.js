export const state = () => ({
  articles: [],
  tags: [],
  featured: [],
  popular: [],
  title: '',
  content: null,
  category: null,
  article: null,
  isPrivate: false,
})

export const mutations = {
  setArticles(state, articles) {
    state.articles = articles
  },
  setFeatured(state, featured) {
    state.featured = featured
  },
  setPopular(state, popular) {
    state.popular = popular
  },
  setTags(state, tags) {
    state.tags = tags
  },
  addTag(state, tag) {
    state.tags.push(tag)
  },
  removeTag(state, index) {
    state.tags.splice(index, 1)
  },
  setCategory(state, category) {
    state.category = category
  },
  setTitle(state, title) {
    state.title = title
  },
  setPrivate(state, isPrivate) {
    state.isPrivate = isPrivate
  },
  setContent(state, content) {
    state.content = content
  },
  setArticle(state, article) {
    state.article = article
  },
  reset(state) {
    state.tags = []
    state.title = ''
    state.content = null
    state.category = null
    state.private = false
  },
  fillData(state, article) {
    state.tags = article.tags.map(tag => tag.name)
    state.title = article.title
    state.content = article.content
    state.category = article.category.id
    state.isPrivate = article.private
  },
}

export const getters = {
  articles: s => s.articles,
  featured: s => s.featured,
  popular: s => s.popular,
  tags: s => s.tags,
  category: s => s.category,
  content: s => s.content,
  title: s => s.title,
  article: s => s.article,
  isPrivate: s => s.isPrivate,
}

export const actions = {
  async write({ commit, state }, draft = false) {
    const data = {
      title: state.title,
      content: state.content,
      category: state.category,
      tags: state.tags,
      draft,
    }
    try {
      this.$http.setHeader('Accept', 'application/json')
      const result = await this.$http.$post('articles', data)
      const { data: article } = result
      commit('reset')
      return article
    } catch (e) {
      return null
    }
  },
  async edit({ commit, state }, slug) {
    const data = {
      title: state.title,
      content: state.content,
      category: state.category,
      tags: state.tags,
      private: state.isPrivate,
    }
    try {
      this.$http.setHeader('Accept', 'application/json')
      const result = await this.$http.$put(`articles/${slug}`, data)
      const { data: article } = result
      commit('reset')
      return article
    } catch (e) {
      return null
    }
  },
  async show({ commit }, slug) {
    try {
      const result = await this.$http.$get(`articles/${slug}`)
      const { data: article } = result
      commit('setArticle', article)
      commit('fillData', article)
      return article
    } catch (e) {
      return null
    }
  },
  async remove({ dispatch }, slug) {
    try {
      dispatch('wait/start', 'article.remove', { root: true })
      await this.$http.delete(`articles/${slug}`)
      dispatch('wait/end', 'article.remove', { root: true })
      return true
    } catch (e) {
      dispatch('wait/end', 'article.remove', { root: true })
      return false
    }
  },
  async index({ commit }) {
    try {
      const result = await this.$http.$get(`articles`)
      const { data: articles } = result
      commit('setArticles', articles)
      return articles
    } catch (e) {
      return null
    }
  },
  async featured({ commit }) {
    try {
      const result = await this.$http.$get(`articles/featured`)
      const { data: articles } = result
      commit('setFeatured', articles)
    } catch (e) {
      return null
    }
  },
  async popular({ commit }) {
    try {
      const result = await this.$http.$get(`articles/popular`)
      const { data: articles } = result
      commit('setPopular', articles)
    } catch (e) {
      return null
    }
  },
}
