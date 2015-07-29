## task cerebral

Simples list example using [cerebral controller](https://github.com/christianalfoni/cerebral)

- [webpack/hot/dev-server](http://webpack.github.io/docs/webpack-dev-server.html#hot-mode) enabled
- production ready version on dist folder
- exposes everything (app, DB) with [ngrok](https://ngrok.com/)

How to run with [azk](http://www.azk.io/):

```
azk restart -R
```

- [task-cerebral dev](http://task-cerebral.dev.azk.io)
    + dev server (for devs, with webpack/hot/dev-server)
- [task caddy](http://task-caddy.dev.azk.io)
    + local prod
- [task caddy + ngrok](http://task-caddy-ngrok.dev.azk.io)
    + ngrok exposed prod (you can send the link for your friends)

----------------------

![gliffy diagram](./github_assets/gliffy diagram.png)

see architecture details on [Azkfile.js](https://github.com/saitodisse/task-cerebral/blob/master/Azkfile.js)

----------------------

![azk status](./github_assets/azk_status.png)

see architecture details on [Azkfile.js](https://github.com/saitodisse/task-cerebral/blob/master/Azkfile.js)

----------------------

> based on christian alfoni's [cerebral todomvc demo](https://github.com/christianalfoni/cerebral/tree/master/demo)
> - https://github.com/christianalfoni/cerebral
