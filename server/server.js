import express from 'express';
import ytdl from '@distube/ytdl-core';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.ORIGIN || 'http://localhost:5173', // Your frontend URL
  methods: 'GET,POST',
}));

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Your API route for downloading audio
app.get('/download', async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send({ error: 'No URL provided' });
  }

  try {
    const info = await ytdl.getInfo(url);
    const sampleTitle = info.videoDetails.title || 'sample';

    // Stream audio directly to the response
    res.setHeader('Content-Disposition', `attachment; filename="${sampleTitle}.mp3"`);
    res.setHeader('Content-Type', 'audio/mpeg');

    const audioStream = ytdl(url, { filter: 'audioonly' });
    
    audioStream.pipe(res); // Stream the audio directly
    audioStream.on('error', (error) => {
      console.error('Error downloading audio:', error);
      res.status(500).send({ error: 'Failed to download audio' });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: error.message || 'An error occurred' });
  }
});

