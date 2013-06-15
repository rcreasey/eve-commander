module.exports = {
  development: {
    root: require('path').normalize(__dirname + '/..'),
    app: {
      secret: 'dev'
    }
  },
  test: {
    root: require('path').normalize(__dirname + '/..'),
    app: {
      secret: 'test'
    }
  },
  production: {
    root: require('path').normalize(__dirname + '/..'),
    app: {
      secret: 's3kr3t_34t1ng'
    }
  }
}