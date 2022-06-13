/* eslint-disable no-undef */
const metadata = {
  name: "test",
  description: "test",
  start_url: "/",
  icon: "src/assets/icon.png",
};

module.exports = {
  siteMetadata: metadata,
  plugins: [
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-transformer-json",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.svg/
        }
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/src/assets/`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: `${__dirname}/src/data/`
      }
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: metadata,
    }
  ],
};
