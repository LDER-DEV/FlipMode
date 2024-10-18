import express from 'express';
import ytdl from '@distube/ytdl-core';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.ORIGIN || 'http://localhost:5173',
  methods: 'GET,POST',
}));

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Your API route for downloading audio
app.get('/api/download', async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send({ error: 'No URL provided' });
  }

  try {
    const info = await ytdl.getInfo(url);
    const sampleTitle = info.videoDetails.title || 'sample';

    // Set up the path for the temporary file
    const filePath = path.join(__dirname, `${sampleTitle}.mp3`);

    // Download the audio and save to file
    const audioStream = ytdl(url, { filter: 'audioonly' });

    const fileStream = fs.createWriteStream(filePath);
    audioStream.pipe(fileStream);

    fileStream.on('finish', () => {
      // Send the file to the client
      res.setHeader('Content-Disposition', `attachment; filename="${sampleTitle}.mp3"`);
      res.setHeader('Content-Type', 'audio/mpeg');
      res.sendFile(filePath, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          res.status(500).send({ error: 'Failed to send file' });
        }

        // Optional: delete the file after sending to prevent clutter
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error('Error deleting file:', unlinkErr);
          }
        });
      });
    });

    fileStream.on('error', (error) => {
      console.error('Error writing file:', error);
      res.status(500).send({ error: 'Failed to write audio to file' });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: error.message || 'An error occurred' });
  }
});