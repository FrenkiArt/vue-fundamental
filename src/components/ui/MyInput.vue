<template>
  <input
    type="text"
    name=""
    placeholder=""
    class="input"
    :value="modelValue"
    @input="updateInput"
  />
</template>

<script>
export default {
  name: 'MyInput',
  data() {
    return {};
  },
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script>

<style lang="scss">
.input {
  display: block;
  width: 100%;
  margin: 0 auto 5px;
  padding: 5px 10px;
  box-sizing: border-box;
}
</style>
