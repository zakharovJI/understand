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
      errorMessageList: {
        auth: 'Неверная комбинация логина и пароля',
        register: ''
      },
      errorMessage: 'Неверная комбинация логина и пароля',
      registerSuccessState: false
    }
  },
  computed: {

  },
  mounted() {
  },
  methods: {
    submitForm() {
      if (this.registerSuccessState) {
        this.registrationState = false;
        this.registerSuccessState = false;

        return
      }

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
            this.$router.push('/workzone/understand/');
          })
          .catch(err => {
            console.log('error');
            this.errorStateShow = true;
          })
      } else {
        const name = this.$refs.nameInput.selfValue;
        const email = this.$refs.emailInput.selfValue;
        const confirmPassword = this.$refs.confirmPasswordInput.selfValue;

        if (password === confirmPassword) {
          password = btoa(password);
          this.data.append('password', password);
          this.data.append('username', login);
          this.data.append('email', email);
          this.data.append('fullname', name);

          this.$store.dispatch('auth/registerUser', this.data)
            .then((resp) => {
              console.log('register success', resp)
              this.errorStateShow = false;
            })
            .catch(() => {
              this.errorStateShow = true;
            })
        }
      }
    },
    registration() {
      this.registrationState = !this.registrationState;
      this.errorMessage = this.registrationState ? this.errorMessageList.register : this.errorMessageList.auth;
    }
  },
}