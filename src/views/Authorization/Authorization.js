import BrandInput from "../../components/BrandInput/BrandInput.vue";
import BrandButton from "../../components/BrandButton/BrandButton.vue";
import BrandCheckbox from "../../components/BrandCheckbox/BrandCheckbox.vue";

export default {
  name: 'Authorization',
  components: {
    BrandInput,
    BrandButton,
    BrandCheckbox
  },
  props: {

  },
  data() {
    return {
      data: new FormData,
      registrationState: false,
      password: null,
      errorStateShow: false,
      errorMessage: 'Неверная комбинация логина и пароля'
    }
  },
  computed: {

  },
  mounted() {
  },
  methods: {
    submitForm() {
      const login = this.$refs.loginInput.selfValue;
      let password = this.$refs.passwordInput.selfValue;

      this.data.append('n', 'Lenya');
      if (!this.registrationState) {

        password = btoa(password);
        this.data.append('login', login);
        this.data.append('password', password);

        this.$store.dispatch('auth/authUser', this.data)
          .then(() => {
            console.log('auth success');
            this.$router.push('/');
          })
          .catch(err => {
            console.log('error');
            this.errorStateShow = true;
          })
      } else {
        const email = this.$refs.emailInput.selfValue;
        const confirmPassword = this.$refs.confirmPasswordInput.selfValue;

        if (password === confirmPassword) {
          password = btoa(password);
          this.data.append('password', password);
          this.data.append('username', login);
          this.data.append('email', email);
          this.data.append('fullname', 'dsfdsfd');

          this.$store.dispatch('auth/registerUser', this.data).then((resp) => {
            console.log('register success', resp)
          })
        }
      }
    },
    registration() {
      this.registrationState = !this.registrationState;
    }
  },
}