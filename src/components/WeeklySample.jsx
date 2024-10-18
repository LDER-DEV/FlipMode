export default function WeeklySample(){

const trackDownload = async () =>{
  try {
    const response = await fetch('https://flipmode.up.railway.app/api/download?url=https://www.youtube.com/watch?v=x71SoqpALxQ');
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