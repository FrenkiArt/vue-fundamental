<template>
  <form class="form-1" @submit.prevent="createPost">
    <h4>Создание поста</h4>
    <input
      v-model="post.title"
      type="text"
      name="inputTitle"
      placeholder="Название поста"
    />
    <input
      v-model="post.body"
      name="inputBody"
      type="text"
      placeholder="Тело поста"
    />

    <Button type="submit" class="added-class"> Создать пост </Button>
  </form>
</template>

<script>
export default {
  name: 'PostForm',
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
  margin: 0 auto 15px;
  padding: 10px;
  border: 1px solid green;

  input {
    display: block;
    width: 100%;
    margin: 0 auto 5px;
  }
}
</style>
