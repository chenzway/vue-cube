<template>
  <div class="home">Home</div>
</template>

<script>
export default {
  name: 'home',
  async created() {
    const res = await this.$http.get('/api/goods');
    console.log(res.data);
  }
};
</script>
