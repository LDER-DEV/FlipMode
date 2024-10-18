import express from 'express';
import ytdl from '@distube/ytdl-core';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.ORIGIN || 'http://localhost:5174', // Set this to your frontend URL
  methods: 'GET,POST',
}));

// Your API route
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

// Serve static files from the React app (place this after API routes)
app.use(express.static(path.join(__dirname, 'build'))); // Adjust path as needed for your setup

// Handle any other routes (this should come last)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html')); // Adjust path as needed
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});