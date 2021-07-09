module.exports = {
  extends: '@hitechline/semantic-release-config',
  branches: [
    {
      name: 'canary',
      channel: 'canary',
      prerelease: 'canary',
    },
  ],
};
