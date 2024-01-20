module.exports = {
  apps: [
    {
      name: 'shop-app',
      script: 'dist/main.js',
      instances: '4',
      exec_mode: 'cluster',
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
