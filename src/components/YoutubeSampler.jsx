import React, { useState } from 'react';

export default function YoutubeSampler({ sampleLinks }) {
  const [downloadMessage, setDownloadMessage] = useState('');
  const [downloadError, setDownloadError] = useState('');

  const sampleDownload = async (url, title) => {
    try {
      const response = await fetch(`/api/download?url=${url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Check if the response is okay
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to download song');
      }
  
      
  
      // Convert the response to a blob
      const blob = await response.blob();
      const urlBlob = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = urlBlob;
      downloadLink.download = `${title}.mp3`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      console.log(blob,urlBlob,downloadLink)
  
      setDownloadMessage('Your sample is ready');
      setDownloadError('');
    } catch (error) {
      console.error('Error downloading sample:', error);
      setDownloadError(error.message);
      setDownloadMessage('');
    }
  };
  
  const handleDownloadClick = () => {
    const randomIndex = Math.floor(Math.random() * sampleLinks.length);
    const randomLink = sampleLinks[randomIndex];
    sampleDownload(randomLink.url, randomLink.title);
  };

  return (
    <>
      <button onClick={handleDownloadClick}>Download track</button>
      {downloadMessage && <p>{downloadMessage}</p>}
      {downloadError && <p style={{ color: 'red' }}>{downloadError}</p>}
    </>
  );
}