<template>
  <div class="post">
    <div>{{ post.id }}</div>
    <div><strong>Название:</strong> {{ post.title }}</div>
    <div><strong>Описание:</strong> {{ post.body }}</div>

    <div class="post__btns">
      <MyButton class="btn-open-post" @click="openPost"> Открыть </MyButton>
      <MyButton class="btn-remove-post" @click="$emit('removePost', post)">
        Удалить
      </MyButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  emits: ['removePost'],
  data() {
    return {};
  },
  props: {
    post: Object,
  },
  methods: {
    openPost() {
      this.$router.push(`/posts/${this.post.id}`);
    },
  },
  components: {},
};
</script>

<style lang="scss">
.post {
  width: 100%;
  padding: 35px 15px 15px;
  border: 1px solid green;
  margin: 0 auto 15px;
  position: relative;
  max-width: 320px;

  // .post__btns
  &__btns {
    position: absolute;
    top: 0;
    right: 0;
  }
}

.btn-remove-post {
  position: relative;
}
</style>
