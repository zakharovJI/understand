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
        console.log(resp);

      })
  },

  async createPost({dispatch, commit}, post) {
    const result = await api.createPost(post)
      .then(resp => {
        console.log('success added', resp);
      })
  }
 };

const mutations = {
  setPostList: (state, postList) => {
    console.log('aadsdsadadas', postList);
    state.postList = postList;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
