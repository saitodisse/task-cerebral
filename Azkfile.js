/* globals systems sync persistent */
/**
 * Documentation: http://docs.azk.io/Azkfile.js
 * More images:  http://images.azk.io
 */
systems({
  'task-cerebral': {
    // Dependent systems
    depends: ['rethinkdb'],
    image: {'docker': 'azukiapp/node'},
    provision: [
      'npm install'
    ],
    workdir: '/azk/#{manifest.dir}',
    shell: '/bin/bash',
    command: 'npm start',
    wait: 20,
    mounts: {
      '/azk/#{manifest.dir}': sync('.'),
      '/azk/#{manifest.dir}/node_modules': persistent('#{system.name}/node_modules')
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
      PORT: '8080'
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
  }
});
