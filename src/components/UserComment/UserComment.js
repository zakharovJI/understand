export default {
  name: 'UserComment',
  props: {
    comment: {}
  },
  data() {
    return {

    }
  },
  computed: {
    name() {
      const arr = this.comment.comm_fullname.split(' ');

      return arr.length > 2 ? arr.slice(0,2).join(' ') : arr.join(' ')
    }
  },
  methods: {

  }
}