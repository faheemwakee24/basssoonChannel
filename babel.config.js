module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@/components': './src/shared/components',
          '@/features': './src/features',
          '@/app': './src/app',
          '@/shared': './src/shared',
          '@/utils': './src/shared/utils',
          '@/types': './src/types',
          '@/assets': './src/assets',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
