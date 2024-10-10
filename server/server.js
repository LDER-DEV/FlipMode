import express from 'express';
import { Downloader } from 'ytdl-mp3';
const app = express();

app.get('/download', async(req,res)=>{

  const sampleURL = req.query.url
  if(!sampleURL){
    return res.status(400).send('missing url parameter')
  }
  const downloader = new Downloader({
    getTags: true,
  })


try{
  const filePath = await downloader.downloadSong(sampleURL)
  res.download(filePath);
}catch(error){
  res.status(500).send('download failed')
}
});

app.listen(3000,()=>{
  console.log('listening on 3000')
})