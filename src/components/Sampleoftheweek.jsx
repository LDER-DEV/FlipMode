export default function Sampleoftheweek(){

const trackDownload = async (url, title) =>{
  try {
    const response = await fetch('https://flipmode.up.railway.app/api/download?url=https://www.youtube.com/watch?v=x71SoqpALxQ&list=LL&index=110');
    const audioBlob = await response.blob();

  }catch (error){
    console.error(error);
    alert('An error occurred while downloading the track.');
  }
  
}
  return(
    <div>
      <button onClick={trackDownload}>Sample of the week</button>
    </div>
  )
}