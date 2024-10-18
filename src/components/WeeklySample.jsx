export default function WeeklySample(){

const trackDownload = async () =>{
const url ='https://www.youtube.com/watch?v=1fjPYAPQFno'
  try {
    const response = await fetch(`https://flipmode.up.railway.app/api/download?url=${url}`, {
      method: 'GET',
    });
    console.log(response, '-response');

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
    downloadLink.download = `mysterySample.mp3`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    console.log(blob,urlBlob,downloadLink)

    //unhide iframe youtube video of sample
    document.querySelector('iframe').classList.remove('hide');
  }catch (error){
    console.error(error);
    alert('An error occurred while downloading the track.');
  }
  
}
  return(
    <div>
      <button onClick={trackDownload}>Sample of the week</button>
      <iframe className = 'hide' width="420" height="315"
         src="https://www.youtube.com/embed/1fjPYAPQFno">
      </iframe>
    </div>
  )
}