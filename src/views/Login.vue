<template>
  <div class="login">
    <cube-form :model="model" :schema="schema" :immediate-validate="false" @submit="submitHandler"></cube-form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'login',
  data() {
    return {
      model: {
        username: 'aaaaaa',
        password: '123456'
      },
      schema: {
        fields: [
          {
            type: 'input',
            modelKey: 'username', // 对应 model 中的key值
            rules: {
              required: true
            },
            messages: {
              required: '请输入用户名'
            }
          },
          {
            type: 'input',
            modelKey: 'password',
            rules: {
              required: true
            },
            messages: {
              required: '请输入密码'
            },
            props: {
              type: 'password', // 设置为密码框 
              eye: {
                open: false,
                reverse: false
              }
            }
          },
          {
            type: 'submit',
            label: 'Submit'
          }
        ]
      }
    };
  },
  methods: {
    async submitHandler(e) {
      e.preventDefault();  // 阻止表单的默认事件
      let res = await this.$http.post('/api/login', { ...this.model });
      const { token, code, message } = res.data;
      if (!code) {
        this.$store.commit('setToken', token);
        const redirect = this.$route.query.redirect || '/';
        this.$router.push(redirect);
      } else {
        const toast = this.$createToast({
          time: 2000,
          txt: message || '登录失败',
          type: 'error'
        });
        toast.show();
      }
    }
  }
};
</script>

<style scoped lang="stylus"></style>
