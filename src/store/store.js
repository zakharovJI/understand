
import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import auth from "./modules/auth";
import posts from "./modules/posts";


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    auth,
    posts
  },
  devtools: true,
  state: {
    createPostStateActive: false
  },
  getters: {
    getCreatePostState: state => state.createPostStateActive
  },
  actions: {

  },
  mutations: {
    toggleCreatePostState: (state => {
      state.createPostStateActive = !state.createPostStateActive;
    })
  },
});
