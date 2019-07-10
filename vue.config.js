module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: ['./src/theme']
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },

  lintOnSave: false,

  configureWebpack: {
    devServer: {
      open: true,
      overlay: {
        warnings: false,
        errors: false
      },
      before(app) {
        // 中间件
        app.use(function(req, res, next) {
          // 检查token
          if (/^\/api/.test(req.path)) {
            // 之校验/api开头的请求
            if (req.path == '/api/login' || req.headers.token) {
              next();
            } else {
              res.sendStatus(401); // 错误状态提示用户需要登录
            }
          } else {
            next();
          }
        });

        app.get('/api/goods', function(req, res) {
          res.json({
            code: 0,
            list: [{ id: 1, text: 'Web全栈架构师', price: 1000 }, { id: 2, text: 'Python架构师', price: 1000 }]
          });
        });

        /* app.get('/api/login', function(req, res) {
          const { username, password } = req.query;
          if (username === 'aaaaaa' && password === '123456') {
            res.json({
              code: 0,
              token: 'jilei'
            });
          } else {
            res.json({
              code: 1,
              message: '用户名或密码错误'
            });
          }
        }); */

        app.post('/api/login', function(req, res) {
          let body = [];
          // post 提交获取参数
          req
            .on('data', chunk => {
              body.push(chunk);
            })
            .on('end', () => {
              body = Buffer.concat(body).toString();
              const { username, password } = JSON.parse(body);
              if (username === 'aaaaaa' && password === '123456') {
                res.json({
                  code: 0,
                  token: 'jilei'
                });
              } else {
                res.json({
                  code: 1,
                  message: '用户名或密码错误'
                });
              }
            });
        });

        app.get('/api/logout', function(req, res) {
          res.json({ code: -1 });
        });
      }
    }
  }
};
