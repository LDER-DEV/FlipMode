import express from 'express';
import ytdl from '@distube/ytdl-core';  // Updated import
import cors from 'cors';
require('dotenv').config


const app = express();
app.use(cors({
  origin: process.env.ORIGIN||'http://localhost:5173' ||'https://flipmode.netlify.app',
  methods: 'GET,POST'
}));

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
});

app.get('/download', async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send({ error: 'No URL provided' });
  }

  try {
    const info = await ytdl.getInfo(url);
    const sampleTitle = info.videoDetails.title || 'sample';

    const audioStream = ytdl(url, { filter: 'audioonly' });
    let bufferChunks = [];

    audioStream.on('data', (chunk) => {
      bufferChunks.push(chunk);
    });

    audioStream.on('end', () => {
      const buffer = Buffer.concat(bufferChunks);

      res.setHeader('Content-Disposition', `attachment; filename="${sampleTitle}.mp3"`);
      res.setHeader('Content-Type', 'audio/mpeg');
      res.send(buffer);
    });

    audioStream.on('error', (error) => {
      console.error('Error downloading audio:', error);
      res.status(500).send({ error: 'Failed to download audio' });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: error.message || 'An error occurred' });
  }
});

