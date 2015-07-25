/* globals systems sync persistent */
systems({
  'task-cerebral': {
    // Dependent systems
    depends: ['server-rdb'],
    image: {'docker': 'azukiapp/node'},
    provision: [
      'npm install'
    ],
    workdir: '/azk/#{manifest.dir}',
    shell: '/bin/bash',
    command: 'npm run deploy && npm start',
    wait: 20,
    mounts: {
      '/azk/#{manifest.dir}': sync('.'),
      '/azk/#{manifest.dir}/dist': sync('./dist'),
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
  'server-rdb': {
    extends: 'task-cerebral',
    depends: ['rethinkdb'],
    workdir: '/azk/#{manifest.dir}/#{system.name}',
    command: 'npm start',
    ports: {
      http: '8080/tcp'
    },
    mounts: {
      '/azk/#{manifest.dir}/#{system.name}': sync('./#{system.name}'),
      '/azk/#{manifest.dir}/#{system.name}/node_modules': persistent('#{system.name}/#{system.name}/node_modules')
    }
  },
  'rethinkdb': {
    // https://registry.hub.docker.com/u/library/rethinkdb/
    image: {'docker': 'rethinkdb'},
    scalable: {'default': 1},
    mounts: {
      // run azk info to check where /data is on host
      // $ azk info
      '/data': persistent('#{system.name}/data')
    },
    http: {
      domains: [ '#{system.name}.#{azk.default_domain}' ]
    },
    ports: {
      http: '8080/tcp',
      rdb_28015: '28015:28015/tcp',
      rdb_29015: '29015:29015/tcp'
    }
  },
  'caddy': {
    depends: ['task-cerebral'],
    image: {docker: 'joshix/caddy'},
    scalable: { default: 1, limit: 1 },
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
  'ngrok': {
    // Dependent systems
    depends: ['caddy'],
    image: {docker: 'azukiapp/ngrok'},

    // Mounts folders to assigned paths
    mounts: {
      // equivalent persistent_folders
      '/ngrok/log': path('./log')
    },
    scalable: { default: 1, limit: 1 },

    http: {
      domains: ['#{system.name}.#{azk.default_domain}']
    },
    ports: {
      http: '4040/tcp'
    },
    envs: {
      NGROK_CONFIG: '/ngrok/ngrok.yml',
      NGROK_LOG: '/ngrok/log/ngrok.log'
    }
  },
});

/**
 * Documentation: http://docs.azk.io/Azkfile.js
 * More images:   http://images.azk.io
 */
