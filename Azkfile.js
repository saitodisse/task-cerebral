/* globals systems sync persistent */
/**
 * Documentation: http://docs.azk.io/Azkfile.js
 */
// Adds the systems that shape your system
systems({
  'task-cerebral': {
    // Dependent systems
    depends: [],
    // More images:  http://images.azk.io
    image: {'docker': 'azukiapp/node'},
    // Steps to execute before running instances
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
      // exports global variables
      http: '8080/tcp'
    },
    envs: {
      // Make sure that the PORT value is the same as the one
      // in ports/http below, and that it's also the same
      // if you're setting it in a .env file
      NODE_ENV: 'dev',
      HOST_NAME: '#{system.name}.#{azk.default_domain}',
      PORT: '8080'
    }
  }
});
