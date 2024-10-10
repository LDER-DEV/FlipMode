
export default function YoutubeSampler({sampleLinks}){
const randomLink = sampleLinks[Math.floor(Math.random() * sampleLinks.length)]
const embed = randomLink.url.split('=')
const embedUrl = `https://www.youtube.com/embed/${embed}`
 const sampleDownload = async () =>{
  try{
    const response = await fetch(`http://localhost:3000/download?url=${randomLink.url}`)
    const blob = await response.blob();
    const url = URL.createObjectUrl(blob);
    const link = document.createElement('a')
    link.href = url
    link.download ='sample.mp3'
    document.body.appendChild(link)
    link.click()
    link.remove();
  }catch(error){
    console.error('Error downloading sample:', error)
  }
  }

return(
  <>
     
     <button onClick={sampleDownload}>Download track</button>
  </>
)
}