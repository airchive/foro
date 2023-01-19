<template>
  <div class="thread">
    <div>
      <p>
        <router-link :to="{name: 'ThreadShow', params: {id: thread['.key']}}">
          {{thread.title}}
        </router-link>
      </p>

      <p class="text-faded text-xsmall">
        By <a href="#">{{user.name}}</a>, <AppDate :timestamp="thread.publishedAt"/>.
      </p>
    </div>

    <div class="activity">
      <p class="replies-count">
        {{repliesCount}} replies
      </p>
    </div>
  </div>
</template>

<script>
import sourceData from '@/data'

export default {
  props: {
    thread: {
      type: Object,
      required: true,
    }
  },

  computed: {
    repliesCount () {
      return this.$store.getters['threads/threadRepliesCount'](
        this.thread['.key']
      )
    },

    user () {
      return this.$store.state.users.items[this.thread.userId]
    }
  }
}
</script>