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

    // const isAuthenticated = this.$store.getters['auth/isAuthenticated'];
    //
    // if (!isAuthenticated) {
    //   if (this.$route.path.indexOf('authorization') === -1) {
    //     this.$router.push('/authorization')
    //   }
    // } else {
    //   // const sessionUserId = parseInt(localStorage.getItem('authorizedUserId'));
    //   //
    //   // this.$store.dispatch('user/setCurrentUser', sessionUserId).then(() => {
    //   //   // this.$router.push(`/user/id${sessionUserId}`)
    //   // });
    // }

    this.$store.dispatch('posts/getPostList')
      .then((resp) => {
        console.log(resp, this.$store.getters['posts/getPostList']);
      })
      .catch(err => {
        console.log(err);
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