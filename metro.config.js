const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: ['bin', 'jpg', 'jpeg', 'png', 'gif', 'mp4', 'wav', 'aac', 'svg'], // Include other asset types as needed
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json', 'svg'], // Include SVG here
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
