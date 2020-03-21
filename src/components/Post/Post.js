import "../../assets/symbols/like_inactive.svg"
import "../../assets/symbols/like.svg"
import "../../assets/symbols/share.svg"

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
      likeStateClicked: false,
      contentHeight: 0
    }
  },
  computed: {
  },
  mounted() {
    // this.contentHeight = this.$refs.content.offsetHeight
  },
  methods: {
    likeButtonClicked() {
      if (this.likeStateClicked) {
        this.likeStateClicked = false;

        this.post.marksCount--;
      } else {
        this.likeStateClicked = true;

        this.post.marksCount++;
      }
    }
  }
}