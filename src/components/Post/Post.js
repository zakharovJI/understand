import "../../assets/symbols/like_inactive.svg"
import "../../assets/symbols/like.svg"
import "../../assets/symbols/share.svg"
import "../../assets/symbols/close.svg"

import UserComment from "../UserComment/UserComment.vue";
import BrandInput from "../BrandInput/BrandInput.vue";

export default {
  name: 'Post',
  components: {
    UserComment,
    BrandInput
  },
  props: {
    post: {}
  },
  data() {
    return {
      likeStateClicked: this.post.is_liked,
      contentHeight: 0,
      formData: new FormData
    }
  },
  computed: {
    selfPost() {
      const userId = this.$store.getters['auth/accessToken'];

      return this.post.author_id/1 === userId/1;
    },
    name() {
      const arr = this.post.author_name.split(' ');

      return arr.length > 2 ? arr.slice(0,2).join(' ') : arr.join(' ')
    }
  },
  mounted() {
    // this.contentHeight = this.$refs.content.offsetHeight
  },
  methods: {
    likeButtonClicked() {
      const userId = this.$store.getters['auth/accessToken'];
      const postId = this.post.id;

      this.formData.append('n', 'Lenya');
      this.formData.append('id_post', postId);
      this.formData.append('id_user', userId);

      if (this.likeStateClicked) {
        this.likeStateClicked = false;
        this.post.likes--;

        this.$store.dispatch('posts/dislikePost', this.formData);
      } else {
        this.likeStateClicked = true;
        this.post.likes++;

        this.$store.dispatch('posts/likePost', this.formData)
      }
      this.formData = new FormData;

    },
    deletePost() {
      const postId = this.post.id;

      this.formData.append('n', 'Lenya');
      this.formData.append('id_post', postId);

      this.$store.dispatch('posts/deletePost', this.formData)
        .then(() => {
          this.formData = new FormData;
        })
    },
    appendComment() {
      if (this.$refs.commentInput.selfValue) {
        const comment = this.$refs.commentInput.selfValue;
        const authorId = this.$store.getters['auth/accessToken'];
        const postId = this.post.id;
        const userData = this.$store.getters['user/getUserData'];

        this.formData.append('n', 'Lenya');
        this.formData.append('id_post', postId);
        this.formData.append('id_author', authorId);
        this.formData.append('text', comment);

        const comm = {
          comm_fullname: userData.full_name,
          comm_pers_img: userData.pers_img,
          text: comment,
          postId: postId
        };

        this.$store.dispatch('posts/appendComment', {
          dispatch: this.formData,
          commit: comm
        })
          .then(() => {
            console.log('COMMENT_ADDED');
            this.formData = new FormData;
            this.$refs.commentInput.selfValue = '';
          })
      }
    }
  }
}