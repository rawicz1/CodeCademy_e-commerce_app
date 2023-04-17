import './style/ImagesList.css'
import ImageTile from "./ImageTile"

// create tiles for each painting in stock

const ImagesList = ({ paintingsData, authToken, getCartData }) => {  
    
   
    return(
        <>
            <div className="images-list">             
                    {paintingsData.map((painting, index) => {
                    return <ImageTile key={index} painting={painting} name={painting.name} authToken={authToken} getCartData={getCartData}/>
                    })}
            </div>
       
        </>
        
    )
}

export default ImagesList