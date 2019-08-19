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
        username: 'aaaaaa',
        password: '123456'
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
              required: true,
              custom: v => {
                return v.length > 3;
              }
            },
            messages: {
              required: '用户名不能为空',
              custom: '用户名至少要3个字符以上'
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

      /* get
      const res = await this.$http.get('/api/login', {
        params: {
          ...this.model
        }
      });
      */

      // post
      const res = await this.$http.post('/api/login', {
        ...this.model
      });

      const { code, token, messages } = res.data;
      // 判断登录是否成功并处理 token
      if (!code) {
        localStorage.setItem('token', token);
        this.$store.commit('setToken', token);
        // 注意 $route 与 $router 的区别
        const redirect = this.$route.query.redirect || '/';
        this.$router.push(redirect);
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
      console.log('validity', result);
    }
  }
};
</script>
