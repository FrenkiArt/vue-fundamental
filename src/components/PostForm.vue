<template>
  <form class="form-1" @submit.prevent="createPost">
    <h4>Создание поста</h4>
    <MyInput
      v-focus
      v-model="post.title"
      name="inputTitle"
      placeholder="Название поста"
    />

    <MyInput v-model="post.body" name="inputBody" placeholder="Тело поста" />

    <MyButton type="submit" class="added-class"> Создать пост </MyButton>
  </form>
</template>

<script>
export default {
  name: 'PostForm',
  emits: ['createPost'],
  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    };
  },
  methods: {
    createPost(e) {
      this.post.id = Date.now();
      this.$emit('createPost', this.post);

      this.post = {
        title: '',
        body: '',
      };
    },
  },
};
</script>

<style lang="scss">
.form-1 {
  display: block;
  max-width: 320px;
  padding: 10px;
  border: 1px solid green;
}
</style>
