module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            app: './app',
            assets: './assets',
            config: './config',
            hooks: './hooks',
            services: './services',
            store: './store',
            theme: './theme',
            types: './types',
            ui: './ui',
            utils: './utils',
            test: './test',
          },
        },
      ],
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development',
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
