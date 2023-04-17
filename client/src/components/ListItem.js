// import { useState } from 'react';
// import Modal from './Modal';
// import useCollapse from 'react-collapsed'

// const ListItem = ({entry, getData}) => {
//   const [showModal, setShowModal] = useState(false)
//   const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
 
//   const deleteEntry = async () => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_SERVER}/entries/${entry.id}`, {
//         method: "DELETE",
//         headers: { 'Content-Type': 'application/json'},
//         // body: JSON.stringify(data)
//       })
//       if (response.status === 200) {        
        
//         getData()
//         }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//     return (
//       <div className='list-item'>       
//         <div className='info-container'>          
//           <div className="collapsible">
//             <div className="header" {...getToggleProps()}>
//                 <div className='title-date'>{entry.date.substring(0, 10)}</div>
//                 {isExpanded ? <div className='title-box'>{entry.title} <span className='expand-title'>Click to collapse</span></div> : <div className='title-box'>{entry.title} <span className='expand-title'>Click to expand</span></div> }
//             </div>
//             <div {...getCollapseProps()}>
//                 <div className="content">
//                     <p>{entry.content}</p>
//                 </div>
                
//             </div>
//           </div>
                    
        

//         </div>
//           <div className='button-container'>
//             <button className='edit' onClick={() => setShowModal(true)}>EDIT</button>
//             <button className='delete' onClick={deleteEntry}>DELETE</button>
//           </div>
//         {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} entry={entry}/>}
//       </div> 
//     );
//   }
  
//   export default ListItem;
  