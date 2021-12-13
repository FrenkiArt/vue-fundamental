<template>
  <div class="dialog" v-if="show === true">
    <div class="dialog__overlay" @click="hideDialog"></div>

    <div class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseDialog',
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:show'],
  data() {
    return {};
  },
  methods: {
    hideDialog() {
      this.$emit('update:show', false);
    },
  },
};
</script>

<style lang="scss">
.dialog {
  bottom: 0;
  display: flex;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 5;

  // .dialog__overlay
  &__overlay {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  // .dialog__content
  &__content {
    margin: auto;
    background-color: #ffffff;
    border-radius: 15px;
    min-width: 300px;
    min-height: 150px;
    position: relative;
  }
}
</style>
