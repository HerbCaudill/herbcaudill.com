module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/words',
        permanent: true,
      },
    ]
  },
}
