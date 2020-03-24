import BrandInput from "../BrandInput/BrandInput.vue";
import BrandButton from "../BrandButton/BrandButton.vue";

export default {
  name: 'CreatePost',
  components: {
    BrandInput,
    BrandButton
  },
  props: {
    
  },
  data() {
    return {
      formData: new FormData
    }
  },
  computed: {
    
  },
  methods: {
    createAndSubmitPost() {
      if (this.$refs.titleInput.selfValue && this.$refs.contentInput.selfValue) {
        const title = this.$refs.titleInput.selfValue;
        const content = this.$refs.contentInput.selfValue;
        const userId = this.$store.getters['auth/accessToken'];

        this.formData.append('n', 'Lenya');
        this.formData.append('title', title);
        this.formData.append('text', content);
        this.formData.append('id_category', 1);
        this.formData.append('id_author', userId);

        this.$store.dispatch('posts/createPost', this.formData).then(() => {
          this.$store.dispatch('posts/getPostList', {n: 'Lenya', id_user: userId})
            .then(resp => {
              this.formData = new FormData;
              this.$store.commit('toggleCreatePostState');
              this.$refs.titleInput.selfValue = null;
              this.$refs.contentInput.selfValue = null;
            })
        });
      }
    }
  }
}