# Next.js 集成 Auth0 和自定义登入页面

### 注册账号和基本配置

#### 进入 auth0 官网注册账号并登入

[Auth0: Secure access for everyone. But not just anyone.](https://auth0.com/)

#### 进入控制台后访问 ` Applications/Applications`

![image.png](https://img-blog.csdnimg.cn/img_convert/a67ad4665fff856ac408958bf5140d85.png)

![image.png](https://img-blog.csdnimg.cn/img_convert/ab00690942ffe5f80e608ba7d58c306c.png)

#### 进入程序配置页面添加配置

创建完成后，会跳转到应用配置界面，如果不小心关闭，可以在 Applications 找到对应的程序并进入：
![image.png](https://img-blog.csdnimg.cn/img_convert/33971cb89f27538068f54b423db28fe5.png)
跳转后的程序配置页面：
![image.png](https://img-blog.csdnimg.cn/img_convert/2816448023f3b0402efe607e7bca77c3.png)
下滑找到 **Application URIs **配置项：

- 设置 **Allowed Callback URLs** 为 `http://localhost:3000/api/auth/callback`
- 设置 **Allowed Logout URLs** 为 `http://localhost:3000/`

![image.png](https://img-blog.csdnimg.cn/img_convert/9a64f17d1720b7d3431fb629d60cf1ff.png)

### 在 Next.js 使用

打开 Next.js 项目，安装 auth0 依赖：

```bash
npm install @auth0/nextjs-auth0
```

新建 `.env.local` 文件，并添加环境变量，auth0 会自定验证你配置的 env 文件

```bash
# A long secret value used to encrypt the session cookie.
# node -e "console.log(crypto.randomBytes(32).toString('hex'))"
AUTH0_SECRET='4d98dac96fb455a6003547a9ffb1e56239598789a5ed7eb1ec34d0834d00c71e'

# The base URL of your application
AUTH0_BASE_URL='http://localhost:3000'
# The URL of your Auth0 Application Domain (https://)
AUTH0_ISSUER_BASE_URL='https://dev-jkr****flrex.us.auth0.com'
# Your Auth0 application's Client ID
AUTH0_CLIENT_ID='pvYBK9T514********CEMaql12GhY'
#Your Auth0 application's Client Secret.
AUTH0_CLIENT_SECRET='gc2vtfBKqRKqWYdsZbteS1zXU1m7d_IJeEJs9E1cm7SUZgfbJeJNVZ6UMgunXqk0'

```

- `AUTH0_SECRET` 是一个自定义密钥，理论上可以随意填写，但不建议，你可以通过终端使用下面命令生成一个32位的随机字符串，并拷贝到 `.env.local` 文件中

```bash
node -e "console.log(crypto.randomBytes(32).toString('hex'))"
```

![image.png](https://img-blog.csdnimg.cn/img_convert/91cf79e0a728e544df77d68bd448fa12.png)

- `AUTH0_BASE_URL` 你开发的项目地址，Next.js 本地运行环境为3000端口， 所以这里设置为 `http://localhost:3000`
- `AUTH0_ISSUER_BASE_URL` 对应在 auth0 创建的应用程序配置中的 `Domain`，参考下图, 注意在env文件配置时，开头需要加上 `https://`
- `AUTH0_CLIENT_ID` 见下图，对应 Client ID
- `AUTH0_CLIENT_SECRET` 见下图，对应 Client Secret

![image.png](https://img-blog.csdnimg.cn/img_convert/52cf600df484cb5252dfb494f79045a0.png)

#### 在项目中集成

**Next.js 提供了详细文档和示例文件，帮助你快速集成 auth0，你可以下载示例文件，配置env 文件后快速体验**

- [Auth0 Next.js SDK Quickstarts: Add Login to your Next.js application](https://auth0.com/docs/quickstart/webapp/nextjs/interactive)

![image.png](https://img-blog.csdnimg.cn/img_convert/ac73cb7596f6a754e0b403e3b46f9c63.png)

根据提示配置：
![image.png](https://img-blog.csdnimg.cn/img_convert/7abd2cb89f3c79089d2aea31c48e4261.png)

其它参考链接：

- [Auth0 React SDK Quickstarts: Add Login to your React App](https://auth0.com/docs/quickstart/spa/react/interactive)

### 通过 Auth0Lock 配置方式自定义登入页面

#### 效果展示

![image.png](https://img-blog.csdnimg.cn/img_convert/872ee56dc1b090f8debdc7b80c315301.png)

#### 实现过程

登入 auth0 控制台后，进入 Branding/Universal Login 页面，下滑页面后找到 Advanced Options 选项，点击进入
![image.png](https://img-blog.csdnimg.cn/img_convert/972f071d22c3ab3ecc61d7019a86ab58.png)

> 进入后，默认会跳转到 Settings 选项页，不要看！ 也别点击任何操作！这个页面完全就是混淆你的理解，且提供的两个模板都又丑又难改配置，设置个 logo 各种不符合要求，想设置个样式直接把你恶心死！

切换到 Login 选项页面：
![image.png](https://img-blog.csdnimg.cn/img_convert/565ad1c34269aced6f08b6c0d95a9a78.png)

然后我们愉快的写 HTML 文件就好了，终于——舒服了。

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>Login - MontCache</title>
    <link
      rel="icon"
      href="https://www.montplex.com/favicon.ico"
      type="image/x-icon"
    />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
    />
  </head>
  <style>
    body {
      margin: 0;
      padding: 0;
    }
    .auth0-lock.auth0-lock {
      font: inherit !important;
    }

    .auth0-lock.auth0-lock .auth0-lock-center {
      font: inherit !important;
      padding: 0 !important;
    }

    .auth0-lock.auth0-lock .auth0-lock-header,
    .auth0-lock.auth0-lock .auth0-lock-terms {
      display: none !important;
    }

    .auth0-lock.auth0-lock .auth0-lock-submit {
      padding: 2px !important;
      background: #111 !important;
    }

    .auth0-lock.auth0-lock .auth0-lock-submit .auth0-label-submit {
      display: inline-flex !important;
      align-items: center !important;
    }

    .auth0-lock.auth0-lock .auth0-lock-submit span svg.icon-text {
      margin: 0 0 0 8px !important;
    }

    .montcache-login-page {
      background-color: rgb(244 244 245);
      display: grid;
      min-height: 100vh;
      place-items: center;
      /*padding: 32px;*/
    }
    .montcache-login-page-logo {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .montcache-login-page-privacy {
      margin-top: 24px;
      max-width: 640px;
      text-align: center;
      font-size: 14px;
    }
    .montcache-login-page-privacy p {
      color: rgb(63, 63, 70);
    }
    .montcache-login-page-privacy a {
      text-decoration-line: underline;
      color: rgb(63, 63, 70);
    }

    .montcache-login-page-privacy .alert {
      background-color: #fffbe6;
      border: 1px solid #ffe58f;
      margin-top: 16px;
      box-sizing: border-box;
      padding: 8px 12px;
      font-size: 14px;
      line-height: 1.57;
      list-style: none;
      position: relative;
      display: flex;
      align-items: center;
      word-wrap: break-word;
      border-radius: 8px;
    }
  </style>
  <body>
    <div class="montcache-login-page">
      <div>
        <div class="montcache-login-page-logo">
          <div style="display: flex; align-items: center;gap: 8px;">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 256 256"
            >
              <defs>
                <linearGradient
                  id="logosNextjsIcon0"
                  x1="55.633%"
                  x2="83.228%"
                  y1="56.385%"
                  y2="96.08%"
                >
                  <stop offset="0%" stop-color="#FFF" />
                  <stop offset="100%" stop-color="#FFF" stop-opacity="0" />
                </linearGradient>
                <linearGradient
                  id="logosNextjsIcon1"
                  x1="50%"
                  x2="49.953%"
                  y1="0%"
                  y2="73.438%"
                >
                  <stop offset="0%" stop-color="#FFF" />
                  <stop offset="100%" stop-color="#FFF" stop-opacity="0" />
                </linearGradient>
                <circle id="logosNextjsIcon2" cx="128" cy="128" r="128" />
              </defs>
              <mask id="logosNextjsIcon3" fill="#fff">
                <use href="#logosNextjsIcon2" />
              </mask>
              <g mask="url(#logosNextjsIcon3)">
                <circle cx="128" cy="128" r="128" />
                <path
                  fill="url(#logosNextjsIcon0)"
                  d="M212.634 224.028L98.335 76.8H76.8v102.357h17.228V98.68L199.11 234.446a128.433 128.433 0 0 0 13.524-10.418"
                />
                <path
                  fill="url(#logosNextjsIcon1)"
                  d="M163.556 76.8h17.067v102.4h-17.067z"
                />
              </g>
            </svg>
            <h3 style="font-size: 22px;">Next.js Auth0</h3>
          </div>
        </div>

        <div id="montcache-login-container"></div>
        <div class="montcache-login-page-privacy">
          <p style="color: rgb(63, 63, 70);">
            By clicking Log In, you agree to our
            <a
              href="/trust/terms.pdf"
              target="_blank"
              children="Terms of Service"
              >Terms of Service</a
            >
            and
            <a href="/trust/privacy.pdf" target="_blank">Privacy Policy</a>
            .
          </p>
          <div class="alert">
            <div style="color: rgba(124,45,18,.8);flex: 1;font-wight: 300;">
              We have recently made updates to our Terms of Service.<br />Please
              take a moment to review the changes that have been implemented.
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--[if IE 8]>
      <script src="//cdnjs.cloudflare.com/ajax/libs/ie8/0.2.5/ie8.js"></script>
    <![endif]-->

    <!--[if lte IE 9]>
      <script src="https://cdn.auth0.com/js/base64.js"></script>
      <script src="https://cdn.auth0.com/js/es5-shim.min.js"></script>
    <![endif]-->

    <script src="https://cdn.auth0.com/js/lock/12.4/lock.min.js"></script>
    <script>
      // Decode utf8 characters properly
      var config = JSON.parse(
        decodeURIComponent(escape(window.atob("@@config@@")))
      );
      config.extraParams = config.extraParams || {};
      var connection = config.connection;
      var prompt = config.prompt;
      var languageDictionary;
      var language;

      if (config.dict && config.dict.signin && config.dict.signin.title) {
        languageDictionary = { title: config.dict.signin.title };
      } else if (typeof config.dict === "string") {
        language = config.dict;
      }
      var loginHint = config.extraParams.login_hint;
      var colors = config.colors || {};

      // Available Lock configuration options: https://auth0.com/docs/libraries/lock/lock-configuration
      var lock = new Auth0Lock(config.clientID, config.auth0Domain, {
        auth: {
          redirectUrl: config.callbackURL,
          responseType:
            (config.internalOptions || {}).response_type ||
            (config.callbackOnLocationHash ? "token" : "code"),
          params: config.internalOptions,
        },
        // 关闭输入账号密码后自动获取用户头像功能
        avatar: null,
        configurationBaseUrl: config.clientConfigurationBaseUrl,
        overrides: {
          __tenant: config.auth0Tenant,
          __token_issuer: config.authorizationServer.issuer,
        },
        assetsUrl: config.assetsUrl,
        container: "montcache-login-container",
        allowedConnections: connection ? [connection] : null,
        rememberLastLogin: !prompt,
        language: language,
        languageBaseUrl: config.languageBaseUrl,
        languageDictionary: languageDictionary,
        theme: {
          primaryColor: "#000",
        },
        prefill: loginHint ? { email: loginHint, username: loginHint } : null,
        closable: false,
        defaultADUsernameFromEmailPrefix: false,
      });

      lock.show();
    </script>
  </body>
</html>
```

配置参考🔗：

- [https://auth0.com/docs/libraries/lock/lock-configuration](https://auth0.com/docs/libraries/lock/lock-configuration)
