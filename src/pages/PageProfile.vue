<template>
  <div class="flex-grid">
    <UserProfileCard
      v-if="!edit"
      :user="user"
      :userPostsCount="userPostsCount"
      :userThreadsCount="userThreadsCount"
    />

    <UserProfileCardEditor
      v-else
      :user="user"
      :userPostsCount="userPostsCount"
      :userThreadsCount="userThreadsCount"
    />

    <div class="col-7 push-top">

      <div class="profile-header">
        <span class="text-lead">
            {{user.username}}'s recent activity
        </span>

        <a href="#">See only started threads?</a>
      </div>

      <hr>

      <PostList :posts="userPosts"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import PostList from '@/components/PostList'
import {countObjectProperties} from '@/utils'
import UserProfileCard from '@/components/UserProfileCard'
import UserProfileCardEditor from '@/components/UserProfileCardEditor'

export default {
  components: {
    PostList,
    UserProfileCard,
    UserProfileCardEditor
  },

  props: {
    edit: {
      type: Boolean,
      default: false,
    }
  },

  computed: {
    ...mapGetters({
      user: 'auth/authUser'
    }),

    userThreadsCount () {
      return countObjectProperties(this.user.threads)
    },

    userPostsCount () {
      return countObjectProperties(this.user.posts)
    },

    userPosts () {
      return this.$store.getters['users/userPosts'](this.user['.key'])
    }
  },

  created () {
    this.$store.dispatch('posts/fetchPosts', {ids: this.user.posts})
      .then(() => this.asyncDataStatus_fetched())
  }
}
</script>