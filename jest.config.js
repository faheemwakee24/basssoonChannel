module.exports = {
  preset: 'react-native',
  // Some libraries ship ESM which Jest's default transformIgnorePatterns will skip.
  // Allow transforming a few known packages (adjust if other packages fail).
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-navigation/native|@react-navigation/stack|react-native-gesture-handler|@react-native-gesture-handler)/)',
  ],
};
