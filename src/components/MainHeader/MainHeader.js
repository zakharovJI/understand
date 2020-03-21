import "../../assets/symbols/logo.svg"
import "../../assets/symbols/login.svg"
import "../../assets/symbols/write.svg"

export default {
  name: 'MainHeader',
  props: {
    
  },
  data() {
    return {
      
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    }
  },
  methods: {
    loginButtonClicked() {
      if (this.isAuthenticated) {
        this.$store.commit('auth/logoutRequest');
        this.$router.go();
      } else {
        this.$router.push('/authorization')
      }
    },
    createPostStateToggle() {
      this.$store.commit('toggleCreatePostState');
    }
  }
}