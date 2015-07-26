/* globals systems sync persistent */

/**
 * cerebral controller app
 * - rethink-db as database
 * - ngrok exposes app and db server
 */

systems({

  /////////////////////////////////////////////////
  /// Rethink DB
  /////////////////////////////////////////////////
  'rethink-db': {
    // https://registry.hub.docker.com/u/library/rethink-db/
    image: {'docker': 'rethinkdb'},
    scalable: {'default': 1},
    mounts: {
      // run azk info to check where /data is on host
      // $ azk info
      '/data': persistent('#{system.name}/data')
    },
    wait: 10,
    http: {
      domains: [ '#{system.name}.#{azk.default_domain}' ]
    },
    ports: {
      http: '8080/tcp',
      rdb_28015: '28015:28015/tcp',
      rdb_29015: '29015:29015/tcp'
    }
  },

  /////////////////////////////////////////////////
  /// express + thinky lib - REST
  /////////////////////////////////////////////////
  'server-rdb': {
    extends: 'task-cerebral',
    depends: ['rethink-db'],
    workdir: '/azk/#{manifest.dir}/#{system.name}',
    command: 'npm start',
    wait: 10,
    ports: {
      http: '8080/tcp'
    },
    mounts: {
      '/azk/#{manifest.dir}/#{system.name}': sync('./#{system.name}'),
      '/azk/#{manifest.dir}/#{system.name}/node_modules': persistent('#{system.name}/#{system.name}/node_modules')
    },
    export_envs: {
      APP_URL: "#{azk.default_domain}:#{net.port.http}"
    }
  },

  /////////////////////////////////////////////////
  /// server-rdb web exposer
  /////////////////////////////////////////////////
  'ngrok-server-rdb': {
    depends: ['server-rdb'],
    // Dependent systems
    image: {docker: 'azukiapp/ngrok'},

    // Mounts folders to assigned paths
    mounts: {
      // equivalent persistent_folders
      '/ngrok/log': path('/tmp')
    },
    scalable: { default: 1 },

    wait: 10,
    http: {
      domains: ['#{system.name}.#{azk.default_domain}']
    },
    ports: {
      http: '4040/tcp'
    },
    envs: {
      NGROK_CONFIG: '/ngrok/ngrok.yml',
      NGROK_LOG: '/ngrok/log/#{system.name}_ngrok.log'
    }
  },

  /////////////////////////////////////////////////
  /// express - config saver
  /// ----------------------
  /// saves configuration to a json file
  /// so the task-cerebral can use on browser
  /////////////////////////////////////////////////
  'server-save-config': {
    extends: 'server-rdb',
    depends: ['ngrok-server-rdb'],
    workdir: '/azk/#{manifest.dir}/#{system.name}',
    command: 'npm start',
    wait: 10,
    ports: {
      http: '8080/tcp'
    },
    mounts: {
      '/azk/#{manifest.dir}': path('.'),
      '/azk/#{manifest.dir}/#{system.name}/node_modules': persistent('#{system.name}/#{system.name}/node_modules'),
    }
  },



  /////////////////////////////////////////////////
  /// main web app
  /////////////////////////////////////////////////
  'task-cerebral': {
    // Dependent systems
    depends: ['server-save-config'],
    image: {'docker': 'azukiapp/node'},
    provision: [
      'npm install'
    ],
    workdir: '/azk/#{manifest.dir}',
    shell: '/bin/bash',
    command: 'npm run deploy && npm start',
    wait: 30,
    mounts: {
      '/azk/#{manifest.dir}': path('.'),
      // '/azk/#{manifest.dir}/dist': path('./dist'),
      '/azk/#{manifest.dir}/node_modules': persistent('#{manifest.dir}/node_modules')
    },
    scalable: {'default': 1},
    http: {
      domains: [ '#{system.name}.#{azk.default_domain}' ]
    },
    ports: {
      http: '8080/tcp'
    },
    envs: {
      NODE_ENV: 'dev',
      HOST_NAME: '#{system.name}.#{azk.default_domain}',
      // Make sure that the PORT value is the same as the one
      // in ports/http below, and that it's also the same
      // if you're setting it in a .env file
      PORT: '8080',
      PATH: 'node_modules/.bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'
    }
  },

  /////////////////////////////////////////////////
  /// http2 static server for deploy version
  /////////////////////////////////////////////////
  'caddy': {
    depends: ['task-cerebral'],
    image: {docker: 'joshix/caddy'},
    scalable: { default: 1 },
    wait: 10,
    http: {
      domains: ['#{system.name}.#{azk.default_domain}']
    },
    mounts: {
      // equivalent persistent_folders
      '/var/www/html/': path('./dist')
    },
    ports: {
      http: '2015/tcp'
    },
    export_envs: {
      APP_URL: "#{azk.default_domain}:#{net.port.http}"
    }
  },

  /////////////////////////////////////////////////
  /// deploy version web exposer
  /////////////////////////////////////////////////
  'ngrok-caddy': {
    // Dependent systems
    depends: ['caddy'],
    image: {docker: 'azukiapp/ngrok'},

    // Mounts folders to assigned paths
    mounts: {
      // equivalent persistent_folders
      '/ngrok/log': path('/tmp')
    },
    scalable: { default: 1 },

    wait: 10,
    http: {
      domains: ['#{system.name}.#{azk.default_domain}']
    },
    ports: {
      http: '4040/tcp'
    },
    envs: {
      NGROK_CONFIG: '/ngrok/ngrok.yml',
      NGROK_LOG: '/ngrok/log/#{system.name}_ngrok.log'
    }
  },

});

/**
 *
 *  ---------------------------------
 *  More about azk
 *  ---------------------------------
 *  + Site
 *      http://azk.io
 *
 *  + Github
 *      https://github.com/azukiapp/azk
 *
 *  + Documentation
 *      http://docs.azk.io
 *
 *  + Images directory created by the azk team
 *      http://images.azk.io
 *
 *
 *  ---------------------------------
 *  Contribute to azk
 *  ---------------------------------
 *  + Star azk on Github
 *      https://github.com/azukiapp/azk
 *
 *  + Report an issue
 *      https://github.com/azukiapp/azk/issues/new
 *
 *  + Help solving a reported issue
 *      https://github.com/azukiapp/azk/issues
 *
 *  + Check out our awesome sponsors
 *      http://azk.io/#sponsors
 *
 *
 *  ---------------------------------
 *  Stay in touch with the azk team
 *  ---------------------------------
 *  + Sign up the weekly digest
 *      http://www.azk.io/#newsletter
 *
 *  + Follow the blog
 *      https://medium.com/azuki-news
 *
 *  + Talk to our support (chat)
 *      https://gitter.im/azukiapp/azk (English) ehttps://gitter.im/azukiapp/azk/pt (Português)
 *
 *  + Facebook
 *      https://www.facebook.com/azukiapp
 *
 *  + Twitter
 *      http://twitter.com/azukiapp
 *
 */
