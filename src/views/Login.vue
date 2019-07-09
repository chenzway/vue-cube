<template>
  <cube-form :model="model" :schema="schema" @validate="validateHandler" @submit="submitHandler"></cube-form>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      validity: {},
      valid: undefined,
      model: {
        username: '',
        password: ''
      },
      schema: {
        fields: [
          {
            type: 'input',
            modelKey: 'username',
            label: '用户名',
            props: {
              placeholder: '请输入用户名'
            },
            rules: {
              required: true
            },
            messages: {
              required: '用户名不能为空'
            },
            trigger: 'blur'
          },
          {
            type: 'input',
            modelKey: 'password',
            label: '密码',
            props: {
              placeholder: '请输入密码',
              // 密码框
              type: 'password',
              eye: { open: false }
            },
            rules: {
              required: true
            },
            messages: {
              required: '密码不能为空'
            },
            trigger: 'blur'
          },
          // 登录按钮
          {
            type: 'submit',
            label: '登录'
          }
        ]
      },
      options: {
        scrollToInvalidField: true,
        layout: 'standard' // classic fresh
      }
    };
  },
  methods: {
    async submitHandler(e) {
      e.preventDefault(); // 阻止表单的默认行为
      const res = await this.$http.get('/api/login', {
        params: {
          username: this.model.username,
          password: this.model.password
        }
      });

      const { code, token, messages } = res.data;
      // 判断登录是否成功并处理 token
      if (!code) {
        localStorage.setItem('token', token);
        this.$store.commit('setToken', token);
        this.$router.push({ path: '/' });
      } else {
        const toast = this.$createToast({
          time: 2000,
          txt: messages || '登录失败!',
          type: 'error'
        });
        toast.show();
      }
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
      console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex);
    }
  }
};
</script>
