<template>
  <div class="post">
    <div><strong>Название:</strong> {{ post.title }}</div>
    <div><strong>Описание:</strong> {{ post.body }}</div>

    <div class="post__btns">
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
  methods: {},
  components: {},
};
</script>

<style lang="scss">
.post {
  padding: 15px;
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
