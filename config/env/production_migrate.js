/**
 * Production MIGRATION environment settings
 */
module.exports = {
  datastores: {
    default: {
      // k8s
      adapter: 'sails-postgresql',
      url: 'postgresql://admin:Mjuns6NVBpkLxHGV@svc-postgres:5432/prod',
    },
  },
  models: {
    migrate: 'alter',
  },

  // TODO - the rest of these configs can probaby be removed
  blueprints: {
    shortcuts: false,
  },
  security: {
    cors: {
      // allowOrigins: [
      //   'https://example.com',
      // ]
    },
  },
  session: {
    cookie: {
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    },
  },
  sockets: {
    onlyAllowOrigins: [
    //   'https://example.com',
    //   'https://staging.example.com',
    ],
  },
  log: {
    level: 'debug'
  },
  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000, // One year
    // trustProxy: true,
  },
  port: 80,
  // ssl: undefined,
  custom: {
    baseUrl: 'http://localhost',
    internalEmailAddress: 'support@colbyblair.com',
  },
};
