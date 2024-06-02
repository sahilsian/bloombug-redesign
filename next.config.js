if (!process.env.WORDPRESS_API_URL) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `);
}

/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: [
      process.env.WORDPRESS_API_URL.match(/(?!(w+)\.)\w*(?:\w+\.)+\w+/)[0], // Valid WP Image domain.
      process.env.WORDPRESS_IMAGES_URL,
      '0.gravatar.com',
      '1.gravatar.com',
      '2.gravatar.com',
      'secure.gravatar.com',
      'lh3.googleusercontent.com'
    ],
  },
  webpack: (config, { isServer }) => {
    // Find the existing JavaScript rule
    const jsRuleIndex = config.module.rules.findIndex(rule => rule.test && rule.test instanceof RegExp && rule.test.test('.js'));

    if (jsRuleIndex !== -1) {
      // Modify the existing rule for JavaScript files
      config.module.rules[jsRuleIndex].exclude = /node_modules\/(?!(@gravityforms)\/).*/;
    } else {
      // If no rule for JavaScript files exists, add it
      config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules\/(?!(@gravityforms)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel', '@babel/preset-react'],
          },
        },
      });
    }

    return config;
  },
};
