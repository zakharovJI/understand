import Post from "../../components/Post/Post.vue";

export default {
  name: 'Hot',
  components: {
    Post
  },
  props: {

  },
  data() {
    return {

    }
  },
  computed: {
    postList() {
      return this.$store.getters['posts/getPostList'];
    }
  },
  methods: {

  }
}