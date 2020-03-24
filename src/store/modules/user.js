
import router from '@/router';
import api from '@/api/index';

const state = {
  userData: null,
};

// getters
const getters = {
  getUserData: state => state.userData,
};

// actions
const actions = {

  setCurrentUser({commit}, id) {
    return new Promise((resolve, reject) => {
      commit('setCurrentUser', id);
      resolve();
    });
  },

  setUserToShow({commit}, id) {
    return new Promise((resolve, reject) => {
      commit('setUserToShow', id);
      resolve();
    });
  },

  async getUserData({ dispatch, getters, commit }, params) {

    await api.getUser(params)
      .then(resp => {
        console.log('user info got', resp);
        commit('setUserData', resp.user);

      })
      .catch((err) => {
        console.log('ERROR_GET_USER_DATA', err);
      });
  },
};

// mutations
const mutations = {
  setCurrentUser(state, id) {
    state.user = state.userList.find(x => x.id === id);
  },
  setUserToShow(state, id) {
    state.userToShow = state.userList.find(x => x.id === id);
  },
  setUserData(state, user) {
    // state.authOk = true;
    state.userData = user;
  },
  removeUserData(state) {

  }
};

export default {
  namespaced: true,
  devtools: true,
  state,
  getters,
  actions,
  mutations,
};