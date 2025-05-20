const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function scrapeRojgarResult() {
  const jobs = [];
  try {
    const { data } = await axios.get('https://www.rojgarresult.com/');
    const $ = cheerio.load(data);

    $('td a').each((i, el) => {
      const title = $(el).text().trim();
      const link = $(el).attr('href');
      if (title && link) {
        jobs.push({
          source: "RojgarResult",
          title,
          description: "Latest Rojgar Result Update",
          link: link.startsWith('http') ? link : `https://www.rojgarresult.com/${link}`
        });
      }
    });

    return jobs;
  } catch (err) {
    console.error("RojgarResult Scrape Error:", err.message);
    return [];
  }
};
