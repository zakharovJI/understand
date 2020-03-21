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
      const title = this.$refs.titleInput.selfValue;
      const content = this.$refs.contentInput.selfValue;
      const id = this.$store.getters['auth/accessToken'];

      this.formData.append('n', 'Lenya');
      this.formData.append('title', title);
      this.formData.append('text', content);
      this.formData.append('id_category', 1);
      this.formData.append('id_author', id);

    this.$store.dispatch('posts/createPost', this.formData).then(() => {
      console.log("SUSSECCECCSDFSFDS")
    })
    }
  }
}