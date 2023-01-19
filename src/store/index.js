import Vue from 'vue'
import Vuex from 'vuex'
import sourceData from '@/data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },

  getters: {
    authUser (state) {
      return state.users[state.authId]
    }
  },

  actions: {
    createPost ({commit, state}, post) {
      const postId = 'greatPost' + Math.random()

      post['.key'] = postId
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)

      commit('setPost', {post, postId})
      commit('appendPostToThread', {threadId: post.threadId, postId})
      commit('appendPostToUser', {userId: post.userId, postId})

      return Promise.resolve(state.posts[postId])
    },

    createThread ({state, commit, dispatch}, {text, title, forumId}) {
      return new Promise((resolve, reject) => {
        const threadId = 'greatThread' + Math.random()
        const userId = state.authId
        const publishedAt = Math.floor(Date.now() / 1000)
        const thread = {'.key': threadId, title, forumId, publishedAt, userId}

        commit('setThread', {threadId, thread})
        commit('appendThreadToForum', {forumId, threadId})
        commit('appendThreadToUser', {userId, threadId})

        dispatch('createPost', {text, threadId})
          .then(post => {
            commit('setThread', {
              threadId,
              thread: {...thread, firstPostId: post['.key']}
            })
          })

        resolve(state.threads[threadId])
      })
    },

    updateThread ({state, commit, dispatch}, {title, text, id}) {
      return new Promise((resolve, reject) => {
        const thread = state.threads[id]
        const newThread = {...thread, title}

        commit('setThread', {thread: newThread, threadId: id})

        dispatch('updatePost', {id: thread.firstPostId, text})
          .then(() => {
            resolve(newThread)
          })
      })
    },

    updatePost ({state, commit}, {id, text}) {
      return new Promise((resolve, reject) => {
        const post = state.posts[id]

        commit('setPost', {
          postId: id,

          post: {
            ...post,
            text,

            edited: {
              at: Math.floor(Date.now() / 1000),
              by: state.authId
            }
          }
        })

        resolve(post)
      })
    },

    updateUser ({commit}, user) {
      commit('setUser', {userId: user['.key'], user})
    }
  },

  mutations: {
    setPost (state, {post, postId}) {
      Vue.set(state.posts, postId, post)
    },

    setUser (state, {user, userId}) {
      Vue.set(state.users, userId, user)
    },

    appendPostToThread (state, {postId, threadId}) {
      const thread = state.threads[threadId]
      Vue.set(thread.posts, postId, postId)
    },

    appendPostToUser (state, {postId, userId}) {
      const user = state.users[userId]
      Vue.set(user.posts, postId, postId)
    }
  }
})
