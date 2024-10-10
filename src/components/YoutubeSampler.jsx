
export default function YoutubeSampler({sampleLinks}){
const randomLink = sampleLinks[Math.floor(Math.random() * sampleLinks.length)]
 const sampleDownload = async () =>{
  try{
    const response = await fetch(`http://localhost:3000/download?url=${randomLink}`)
    const blob = await response.blob();
    const url = window.URL.createObjectUrl(blob);
    const link = document.createElement('a')
    link.href = url
    link.download ='sample.mp3'
    document.body.appendChild(link)
    link.click()
    link.remove();
  }catch{error
    console.error('Error downloading sample:', error)
  }
  }

return(
  <>
     <iframe src={randomLink}></iframe>
     <button onClick={sampleDownload}>Download track</button>
  </>
)
}