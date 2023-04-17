import { useState } from 'react'
import './style/ImageTile.css'
import ImageBox from './ImageBox'



const ImageTile = ({ painting, name, authToken, getCartData }) => {    

    const [showImage, setShowImage] = useState(false)
    
    const showImageBox = () => {   
    setShowImage(true)    
   }
    const link = `./images/${name}.jpg`
   
    return(
        <div className='tile-div'>  
            {showImage && <ImageBox painting={painting} setShowImage={setShowImage} authToken={authToken} getCartData={getCartData}/>}
            
            <div className="image-tile" onClick={() => showImageBox()}>
                {painting.name ? <><p>{`${painting.name}`}</p>
                    <img
                        src={require(`${link}`)}
                        alt={name}
                        height="300px" 
                        width="80%"
                   
                        />
                            </> :'Loading...'}
         
            </div>
        
        </div>
    )
}
export default ImageTile