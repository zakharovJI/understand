
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

  async getUserData({ dispatch, getters, commit }) {
    commit('setUserData');

    // await api.getUserInfo(this.getters['auth/accessToken'])
    //   .then(resp => {
    //   })
    //   .catch((err) => {
    //     console.log('ERROR_GET_USER_DATA', err);
    //     dispatch('auth/refreshToken');
    //   });
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
  setUserData(state, payload) {
    // state.authOk = true;
    state.userData = {id: 1, name: 'Леонид', lastName: 'Захаров'};
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