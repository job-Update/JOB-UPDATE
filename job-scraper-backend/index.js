const express = require('express');
const cors = require('cors');

const sarkariResult = require('./scraper/sarkariResult');
const rojgarResult = require('./scraper/rojgarResult');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Job Scraper API is running!');
});

app.get('/api/jobs', async (req, res) => {
  try {
    const [sarkariJobs, rojgarJobs] = await Promise.all([
      sarkariResult(),
      rojgarResult()
    ]);

    const allJobs = [...sarkariJobs, ...rojgarJobs];
    res.json(allJobs.slice(0, 20));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch job data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
