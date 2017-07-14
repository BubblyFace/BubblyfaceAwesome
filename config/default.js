module.exports = {
    port: 8082,
    session: {
        secret: 'blog',
        key: 'blog',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/myblog'
}
