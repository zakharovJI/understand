import "../../assets/symbols/logo.svg"
import "../../assets/symbols/login.svg"
import "../../assets/symbols/write.svg"

export default {
  name: 'MainHeader',
  props: {
    
  },
  data() {
    return {
      menuStateShow: false
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

      if (window.innerWidth < 768) {
        this.toggleMenuStateShow();
      }
    },
    toggleMenuStateShow() {
      this.menuStateShow = !this.menuStateShow;

      if (this.menuStateShow) {
        document.querySelector('body').classList.add('no-overflow');
      } else {
        document.querySelector('body').classList.remove('no-overflow');
      }
    }
  }
}