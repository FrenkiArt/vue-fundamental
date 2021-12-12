<template>
  <div>
    Количество лайков

    <strong>{{ likes }}</strong>
  </div>

  <div>
    <button @click="addLike">Добавить лайк</button>
  </div>
</template>

<script>
export default {
  name: 'Likes',
  data() {
    return {
      likes: 0,
    };
  },

  methods: {
    addLike() {
      this.likes += 1;
    },
  },
};
</script>

<style lang="scss">
button {
  cursor: pointer;
}
</style>
