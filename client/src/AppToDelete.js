import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem"
import { useEffect, useState } from "react"
require('dotenv').config();
// const cors = require ('cors')

const App = () => {
  
  const userEmail = "test@test.com"
  const [entries, setEntries] = useState(null)

  const getData = async () => {  
    try {
      const response = await fetch(`http://localhost:8000/entries/${userEmail}`)
      const json = await response.json()
      setEntries(json)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => getData, [])  

  return (
    <div className="app">
      <ListHeader listName={ 'My journal entries'} getData={getData}/>
      <div className="app-items">{entries?.map((entry) => <ListItem key={entry.id} entry={entry} getData={getData} />)}
      </div>      
    </div>
  );
}

export default App;
