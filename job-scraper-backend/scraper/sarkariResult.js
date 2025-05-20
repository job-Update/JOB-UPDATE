const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function scrapeSarkariResult() {
  const jobs = [];
  try {
    const { data } = await axios.get('https://www.sarkariresult.com/');
    const $ = cheerio.load(data);

    $('table tr td a').each((i, el) => {
      const title = $(el).text().trim();
      const link = $(el).attr('href');
      if (title && link) {
        jobs.push({
          source: "SarkariResult",
          title,
          description: "Latest Sarkari Result Update",
          link: link.startsWith('http') ? link : `https://www.sarkariresult.com/${link}`
        });
      }
    });

    return jobs;
  } catch (err) {
    console.error("SarkariResult Scrape Error:", err.message);
    return [];
  }
};
