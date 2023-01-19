<template>
  <div class="post-list">
    <PostListItem
      v-for="post in posts"
      :post="post"
      :key="post['.key']"
    />
  </div>
</template>

<script>
import PostListItem from './PostListItem.vue'

export default {
  components: {
    PostListItem,
  },

  props: {
    posts: {
      type: Array,
      required: true,
    }
  }
}
</script>