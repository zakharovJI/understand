import router from '@/router';
import api from '@/api/index';

const state = {
  postList: null
};

const getters = {
  getPostList: state => state.postList,
};

const actions = {
  async getPostList({dispatch, commit}, user) {
    const result = await api.getPostList(user)
      .then((resp) => {
        console.log('POST_LIST GOT', resp);
        commit('setPostList', resp.content);
      })
      .catch((error) => {
        console.log('ERROR', error);
        return Promise.reject(error);
      });
    return result;
  },

  async deletePost({dispatch, commit}, post) {
    const result = await api.deletePost(post)
      .then(resp => {
        console.log(post.get('id_post'));
        commit('deletePost', post.get('id_post'))
      })
  },

  async createPost({dispatch, commit}, post) {
    const result = await api.createPost(post)
      .then(resp => {
        console.log('success added', resp);
      })
  },


  async likePost({dispatch, commit}, data) {
    const result = await api.likePost(data)
      .then(resp => {
        console.log('success liked', resp);
      })
  },

  async dislikePost({dispatch, commit}, data) {
    const result = await api.dislikePost(data)
      .then(resp => {
        console.log('success disliked', resp);
      })
  },

  async appendComment({dispatch, commit}, data) {
    const result = await api.appendComment(data.dispatch)
      .then(resp => {
        commit('appendComment', data.commit)
      })
  },


};

const mutations = {
  setPostList: (state, postList) => {
    console.log('aadsdsadadas', postList);
    state.postList = postList;
  },
  deletePost: (state, id) => {
    state.postList = state.postList.filter(x => x.id !== id)
  },
  appendComment: (state, comment) => {
    state.postList.find(x => x.id === comment.postId).commentaries.push(comment)
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
