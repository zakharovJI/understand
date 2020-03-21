export default {
  props: {
    placeholder: {},
    name: {},
    validate: {
      default: false,
    },
    validation: {
      default: 'text',
    },
    type: {
      default: 'text',
    },
    required: {
      default: false
    },
    mask: {
      default: 'none'
    },
    passToConfirm: {
      default: null
    },
    mod: {
      default: 'input'
    },
    themeLight: {
      default: null
    },
    themeLarge: {
      default: null
    }
  },
  data() {
    return {
      // name: this.name,
      selfValue: this.value,
      selfType: this.type,
      // label: this.label,
      stateFocused: false,
      stateInvalid: false,
      stateFilled: false,
      error: true,
      states: {
        focused: 'brand-input_focused',
        invalid: 'brand-input_invalid',
        filled: 'brand-input_filled',
      },
      rules: [
        {
          type: 'text',
          regex: '',
          error: ''
        },
        {
          type: 'email',
          regex: '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
          error: 'Введите корректный email'
        },
        {
          type: 'password',
          regex: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$',
          error: 'Например: "Upper123"'
        },
        {
          type: 'phone',
          regex: '',
          error: 'Введите корректный телефон'
        },
        {
          type: 'confirmPassword',
          regex: '',
          error: 'Пароли должны совпадать'
        }
      ]
    }
  },
  mounted() {
    this.maskInput();
  },
  computed: {
  },
  methods: {
    errors() {
      if (this.rules.find(x => x.type === this.validation)) {
        return this.rules.find(x => x.type === this.validation).error || ''
      }
    },
    onFocus(e) {
      this.stateFocused = true;

      if (this.selfType === 'search') {
        this.$emit('focus', e);
      }
    },
    onBlur(e) {
      this.stateFocused = false;

      if (this.selfValue && !this.validateInput()) {
        this.stateInvalid = true;
      }
      e.preventDefault();
    },
    onClick(e) {
      this.$emit('click', e);
    },
    onInput() {
      this.stateFilled = !!this.selfValue;

      if (this.validateInput()) {
        this.stateInvalid = false;
      }
    },
    validateInput() {
      switch (this.validation) {
        case 'text':
          return true;
          break;
        case 'email':
          return new RegExp(this.rules.find(x => x.type === this.validation).regex).test(this.selfValue.toLowerCase());
          break;
        case 'confirmPassword':
          return this.selfValue === this.passToConfirm;
          break;
        default:
          return  new RegExp(this.rules.find(x => x.type === this.validation).regex).test(this.selfValue);
      }
    },
    maskInput() {
      switch (this.mask) {
        case 'number':
          this.$inputmask({
            mask: "*{1,20}",
            showMaskOnHover: false,
            // colorMask: true,
            definitions: {
              '*': {
                validator: '[0-9]',
                cardinality: 1,
                casing: 'lower',
              },
            },
          })
            .mask(this.$refs.inputField);
          break;
        case 'messageCode':
          this.$inputmask({
            mask: "*{1}  *{1}  *{1}  *{1}  *{1}  *{1}",
            showMaskOnHover: false,
            // colorMask: true,
            definitions: {
              '*': {
                validator: '[0-9]',
                cardinality: 1,
                casing: 'lower',
              },
            },
          })
            .mask(this.$refs.inputField);
          break;
        case 'article':
          this.$inputmask({
            mask: `${this.placeholder.replace('A', '\\A').replace('a', '\\a').replace('9', '\\9')}-*{1,20}`,
            showMaskOnHover: false,
            definitions: {
              '*': {
                validator: '[0-9A-Za-z]',
                cardinality: 1,
              },
            },
          })
            .mask(this.$refs.inputField);
          break;
        case 'email':
          console.log(12313123123, 'email', this.$inputmask)
          this.$inputmask({
            mask: '*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]',
            showMaskOnHover: false,
            definitions: {
              '*': {
                validator: '[0-9A-Za-z!#$%&\'*+/=?^_`{|}~\-]',
                cardinality: 1,
                casing: 'lower',
              },
            },
          })
            .mask(this.$refs.inputField);
          break;

      }
    }
  }
}