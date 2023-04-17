// import Modal from "./Modal";
// import { useState } from "react";
// import { useCookies } from "react-cookie";

// const ListHeader = ({ listName, getData }) => {

//     const [cookie, setCookie,removeCookie] = useCookies(null)
//     const [showModal, setShowModal] = useState(false)
//     const signOut = () => {
//         console.log('signing out')
//         removeCookie('Email')
//         removeCookie('AuthToken')
//         window.location.reload()
//     }

//     return (
//         <div className="list-header">
//           {/* <h1 className="journal-title" style={{'fontSize': '3em'}}>&nbsp;{cookie.first_name}'s&nbsp; journal from list header</h1>   */}
          
//           <div className="button-container" >
//             {/* <button className="create" onClick={() => setShowModal(true)}>ADD NEW from list header</button> */}
//             <button className="signout" onClick={signOut} >SIGN OUT from list header</button>
//           </div>
//           {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData} />}
//         </div>
//     );
//   }
  
//   export default ListHeader;
  