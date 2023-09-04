module.exports = {
  apps: [{
    name: "P3L_reminder",
    script: "./dist/app.js",
    watch: false,
    instances: 1,
    exec_mode: "cluster",
    env: {
      "NODE_ENV": "development",
    },
    env_production: {
      "NODE_ENV": "production"
    },
    env_stage: {
      "NODE_ENV": "stage"
    }
  }]
}