import UserComment from "../UserComment/UserComment.vue";

export default {
  name: 'Post',
  components: {
    UserComment
  },
  props: {
    post: {}
  },
  data() {
    return {
      likeStateClicked: false,
      contentHeight: 0
    }
  },
  computed: {
  },
  mounted() {
    this.contentHeight = this.$refs.content.offsetHeight
  },
  methods: {
  }
}