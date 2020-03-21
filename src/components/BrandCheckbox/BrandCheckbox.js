export default {
  name: 'BrandCheckbox',
  components: {},
  props: {
    value: {
      default: null
    },
    label: {
      default: null
    },
    themeLight: {
      default: false
    }
  },
  data() {
    return {
      stateInvalid: false,
      stateChecked: false
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    isValid() {
      return this.$refs.input.checked;
    },

    setValid() {
      this.stateInvalid = false;
    },

    setListeners() {
      this.$refs.control.addEventListener('click', () => {
        this.setValid();
      })
    },

    onClick(e) {
      this.stateChecked = !this.stateChecked;
    }
  },
}