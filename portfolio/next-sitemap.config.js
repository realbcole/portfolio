/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.brandoncole.dev/',
  generateRobotsTxt: true,
  additionalPaths: async (config) => {
    return [
      {
        loc: '/about', // the url for your page
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.9,
      },
      {
        loc: '/projects', // the url for your page
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.9,
      },
      {
        loc: '/contact', // the url for your page
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.9,
      },
      {
        loc: '/audiovisualizer', // the url for your page
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.5,
      },
      {
        loc: '/mealfinder', // the url for your page
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.4,
      },
      {
        loc: '/nysparkbuddy', // the url for your page
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.3,
      },
      {
        loc: '/oldportfolio', // the url for your page
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.3,
      },
      {
        loc: '/survive', // the url for your page
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.4,
      },
      {
        loc: '/truth', // the url for your page
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.5,
      }
    ];
  }
};