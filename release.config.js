module.exports = {
  extends: '@hitechline/semantic-release-config',
  branches: [
    'main',
    {
      name: 'canary',
      channel: 'canary',
      prerelease: 'canary',
    },
  ],
};
