import React from 'react';
import YoutubeSampler from './YoutubeSampler'; // Import your YoutubeSampler component
import sampleLinks from '../sampleLinks'; // Make sure to import sample links

const Download = () => {
  return (
    <div>
      <h2>Download Your Audio</h2>
      <YoutubeSampler sampleLinks={sampleLinks} /> {/* Pass sampleLinks to YoutubeSampler */}
    </div>
  );
};

export default Download;