module.exports = {
  name: 'nx-angular-capacitor-seed',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/nx-angular-capacitor-seed',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
