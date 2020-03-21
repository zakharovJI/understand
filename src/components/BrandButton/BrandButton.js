export default {
  name: 'BranButton',
  props: {
    label: {
      default: 'label',
    },
    type: {
      default: 'button',
    },
    secondary: {
      default: false
    },
    themeLight: {
      default: false
    },
    themeCenter: {
      default: false
    },
    validatable: {
      default: false
    },
    disabled: {
      default: false
    }
  },
  data() {
    return {
      selfType: this.type,
      isMounted: false
    }
  },
  computed: {
    stateDisabled() {
      if (!this.validatable) {
        return false
      } else if (this.isMounted) {

        let state = false;

        this.$parent.$children.forEach(el => {
          if (el.$el.classList.contains('brand-input')) {
            // console.log(el.required, el.stateInvalid, !el.stateFilled)
            if (el.required && (el.stateInvalid || !el.stateFilled)) {
              state = true;
            }
          }
        });

        return state;
      }
    }
  },
  mounted() {
    this.isMounted = true;
  },
  methods: {
    onClick(e) {
      this.$emit('click', e);
    },
  }
}