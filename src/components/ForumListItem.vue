<template>
  <div class="forum-listing">
    <div class="forum-details">
      <router-link
        class="text-xlarge"
        :to="{name: 'Forum', params: {id: forum['.key']}}"
      >
        {{forum.name}}
      </router-link>
      <p>{{forum.description}}</p>
    </div>

    <div class="threads-count">
      <p class="count">{{threadsCount}}</p>
      {{threadsCount === 1 ? 'thread' : 'threads'}}
    </div>

    <div class="last-thread"></div>
  </div>
</template>

<script>
export default {
  props: {
    forum: {
      type: Object,
      required: true,
    }
  },

  computed: {
    threadsCount () {
      return this.forum.threads
        ? Object.values(this.forum.threads).length
        : 0
    }
  }
}
</script>