// Job scraping Express API (Latest Jobs route)
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/latest-jobs', async (req, res) => {
  try {
    const { data } = await axios.get('https://nokri24.in/category/latest-govt-jobs/');
    const $ = cheerio.load(data);
    const jobs = [];

    $('article').each((i, elem) => {
      const title = $(elem).find('h3.entry-title').text().trim();
      const link = $(elem).find('a').attr('href');
      const date = $(elem).find('time.entry-date').text().trim();
      jobs.push({ title, link, date });
    });

    res.json({ status: 'success', total: jobs.length, jobs });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on ${PORT}`));
