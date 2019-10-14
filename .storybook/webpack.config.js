const path = require('path')

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.less$/,
    loaders: [
      'style-loader',
      'css-loader',
      {
        loader: 'less-loader',
        options: { javascriptEnabled: true },
      },
    ],
    include: path.resolve(__dirname, '../src/'),
  })

  config.module.rules.push({
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/env', '@babel/flow', '@babel/react'],
        plugins: ['react-docgen', '@babel/plugin-proposal-class-properties'],
      },
    },
  })

  // Return the altered config
  return config
}
