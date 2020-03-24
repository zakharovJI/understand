/* eslint one-var: 0 */
/* eslint no-shadow: 0 */
import router from '@/router';
import api from '@/api/index';
import {use} from "vee-validate/dist/vee-validate.minimal.esm";

const state = {
  accessToken: localStorage.getItem('accessToken') || null,
  userRememberState: localStorage.getItem('userRememberState') || null,
  status: null
};

const getters = {
  isAuthenticated: state => state.accessToken !== null,
  accessToken: state => state.accessToken,
  status: state => state.status,
  getUserRememberState: state => state.userRememberState
};

const actions = {

  async authUser({dispatch, commit}, user) {
    commit('authRequest');
    const result = await api.authUser(user)
      .then((resp) => {
        if (resp.status === 200) {
          console.log('AUTH_SUCCESS_VUEX', resp);
          commit('authSuccess', resp.data);
          console.log('TOKEN', state.accessToken);
        }
        return new Promise(resolve => {
          dispatch('updateData')
            .then(() => {
              console.log('updateData success');
              console.log('USER_DATA', getters['user/getUserData']);
              resolve();
            });
        });
      })
      .catch((error) => {
        console.log('ERROR', error);
        commit('authError');
        return Promise.reject(error);
      });
    return result;
  },

  async registerUser({dispatch, commit}, user) {
    const result = await api.registerUser(user)
      .then((resp) => {
        console.log('resp', resp)
      })
      .catch((error) => {
        console.log('ERROR', error);
        return Promise.reject(error);
      });
    return result;
  },

  async updateData({dispatch, getters}) {
    const userId = this.getters['auth/accessToken'];

    console.log(userId);

    await dispatch('user/getUserData', {
      n: 'Lenya',
      id_user: userId
    }, {root: true});
  },
};

const mutations = {
  authRequest: (state) => {
    state.status = 'loading';
  },

  authSuccess: (state, authData) => {
    state.status = 'success';
    state.accessToken = authData.user_id;
    localStorage.setItem('accessToken', state.accessToken);

  },

  logoutRequest: (state) => {
    state.status = null;
    state.accessToken = null;
    localStorage.removeItem('accessToken');
  },

  authError: (state) => {
    state.status = 'error';
    state.accessToken = null;
    localStorage.removeItem('accessToken');
  },

  setUserRememberState: (state) => {
    state.userRememberState = true;
    localStorage.setItem('userRememberState', state.userRememberState);
  },

  removeUserRememberState: (state) => {
    state.userRememberState = null;
    localStorage.removeItem('userRememberState');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
