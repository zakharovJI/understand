import axios from 'axios';
import Cookies from 'js-cookie';
// api.web.exenium.net
const http = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://makson-dev.ru/api' : 'https://makson-dev.ru/api',
  headers: {

  }
});


export default {
  http,

  // Api requests that already done by back
  authUser(data) {
    return http({
      method: 'POST',
      url: '/checkAuthorize.php',
      data,
      credentials: true,
    })
      .then(result => Promise.resolve(result))
      .catch(error => Promise.reject(error));
  },

  registerUser(data) {
    return http({
      method: 'POST',
      url: '/newAccount.php',
      data,
      credentials: true,
    })
      .then(result => Promise.resolve(result))
      .catch(error => Promise.reject(error));
  },

  createPost(data) {
    return http({
      method: 'PUT',
      url: '/addBlogPost.php',
      data,
      credentials: true,
    })
      .then(result => Promise.resolve(result))
      .catch(error => Promise.reject(error));
  },

  deletePost(data) {
    return http({
      method: 'DELETE',
      url: '/deleteBlogPost.php',
      data,
      credentials: true,
    })
      .then(result => Promise.resolve(result))
      .catch(error => Promise.reject(error));
  },

  updatePost(data) {
    return http({
      method: 'POST',
      url: '/updateBlogPost.php',
      data,
      credentials: true,
    })
      .then(result => Promise.resolve(result))
      .catch(error => Promise.reject(error));
  },

  likePost(data) {
    return http({
      method: 'POST',
      url: '/likesPost.php',
      data,
      credentials: true,
    })
      .then(result => Promise.resolve(result))
      .catch(error => Promise.reject(error));
  },

  sendComment(data) {
    return http({
      method: 'PUT',
      url: '/addPostComment.php',
      data,
      credentials: true,
    })
      .then(result => Promise.resolve(result))
      .catch(error => Promise.reject(error));
  },

  getPostList(data) {
    return http({
      methods: 'GET',
      params: {
        n: 'Lenya'
      },
      url: '/getBlogContent.php',
      credentials: true,
    })
      .then(result => Promise.resolve(result.data))
      .catch(error => Promise.reject(error));
  },

  getComments(data) {
    return http({
      methods: 'GET',
      data,
      url: '/getPostComments.php',
      credentials: true,
    })
      .then(result => Promise.resolve(result.data))
      .catch(error => Promise.reject(error));
  },

};
