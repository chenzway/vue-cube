1. 创建 a 项目 `vue create name`
2. 选择配置: vuex + vue-router + stylus + eslint
3. 修改配置：

```
1. js保存时格式化单引号
// 创建 .prettierrc
{
  "printWidth": 120,
  "semi": true,
  "singleQuote": true
}

2. 修改doc编译时出现的报错信息
vue.config.js 注意修改后要重启

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    open: true,
    clientLogLevel: 'info',
    proxy: {
      '/cors': {
        target: 'http://120.77.224.230:9090',
        changeOrigin: true,
        pathRewrite: {
          '^/cors': 'piling'
        }
      }
    },
    before(app) {
      app.get('/api/goods', function(req, res) {
        res.json({
          code: 0,
          list: [{ id: '1', text: 'vue', price: '1000' }, { id: '2', text: 'react', price: '1200' }]
        });
      });
    }
  }
};

```

4. [cube-ui](https://didi.github.io/cube-ui/#/zh-CN/docs/quick-start)

```
// 安装并设置参数
vue add cube-ui
// main.js 添加, 没有效果时可重启试试
import './cube-ui';
```

5. 注意 router

```
 watch: {
    $route: {
      handler(route) {
        //component: () => import('./views/Login.vue') 才会触发
        // component: component 下不会route不会给 watch 到
        this.selectedLabelSlots = route.path;
      }
    }
  },
```

6. 安装 axios 并注册到全局
```
1. cnpm i axios -S

2. main.js
Vue.prototy.$http = axios
```

7. 注意表单 input 中的 类型
```
v-model 中 password 默认值如下：
password: 123456
passowrd: '123456'
注意 数字 在提交到后台时会报密码错误。数据类型是有影响的
```

