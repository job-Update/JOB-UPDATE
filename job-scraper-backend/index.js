const express = require('express');
const cors = require('cors');
const path = require('path'); // ✅ missing import

const sarkariResult = require('./scraper/sarkariResult');
const rojgarResult = require('./scraper/rojgarResult');

const app = express();
app.use(cors());

// ✅ Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Serve index.html on root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
    console.error('Error in /api/jobs:', error);
    res.status(500).json({ error: 'Failed to fetch job data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
