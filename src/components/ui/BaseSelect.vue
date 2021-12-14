<template>
  <select v-model="modelValue" @change="changeOptions">
    <option disabled value="">Выберите из списка</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'BaseSelect',
  components: {},
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {};
  },
  methods: {
    changeOptions(e) {
      this.$emit('update:modelValue', e.target.value);
    },
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
