import MainHeader from "../components/MainHeader/MainHeader.vue";
import Post from "../components/Post/Post.vue";
import NewsAside from "../components/NewsAside/NewsAside.vue";
import MainFooter from "../components/MainFooter/MainFooter.vue";
import CreatePost from "../components/CreatePost/CreatePost.vue";

export default {
  name: 'App',
  components: {
    MainHeader,
    Post,
    NewsAside,
    MainFooter,
    CreatePost
  },
  props: {

  },
  data() {
    return {
      newsList: [
        {
          text: 'И днем и ночью кот ученый все ходит по цепи кругом',
          date: '12.10.2020'
        },
        {
          text: 'И днем и ночью кот ученый все ходит по цепи кругом',
          date: '12.10.2020'
        },
        {
          text: 'И днем и ночью кот ученый все ходит по цепи кругом',
          date: '12.10.2020'
        }
      ],
      formData: new FormData
    }
  },
  mounted() {
    const userId = this.$store.getters['auth/accessToken'];

    this.$store.dispatch('user/getUserData', {
      n: 'Lenya',
      id_user: userId
    }).then(() => {
      this.$store.dispatch('posts/getPostList', {n: 'Lenya', id_user: userId})
        .then((resp) => {
        })
        .catch(err => {
          console.log(err);
        })
    })
  },
  computed: {
    postCreateStateActive() {
      return this.$store.getters['getCreatePostState'];
    }
  },
  methods: {

  }
}