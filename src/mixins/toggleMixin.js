export default {
  data() {
    return {};
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    hideDialog() {
      this.$emit('update:show', false);
    },
  },

  mounted() {
    console.log('mixin is mounted');
  },
};
