<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>| <router-link to="/about">About</router-link>|
      <router-link to="/login" v-if="!isLogin">Login</router-link>
      <a @click="logout" v-if="isLogin">logout</a>
    </div>
    <router-view />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  methods: {
    logout() {
      this.$http.get('/api/logout').then(res => {
        const { code } = res.data;
        console.log(code);
      });
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
};
</script>

<style lang="stylus"></style>
