import './App.css';
import TripList from './components/TripList';
import { useState } from 'react'

function App() {
  const [showTrips, setShowTrips] = useState(true)

  return (
    <div className="App">
      {/* ADDED THIS BUTTON TO DEMONSTRATE HANDLING ERRORS WHEN YOU UNMOUNT STATE */}

      {/* IF YOU CLICK THE BUTTON BEFORE THE FETCH REQUEST COMPLETES IT THROWS AN ERROR SINCE 
      THE SHOW TRIPS STATE IS FALSE WHICH CAUSES THE TRIPLIST COMPONENT TO NOT MOUNT */}
      <button onClick={() => {setShowTrips(false)}}>Hide Trips</button>
      
      {/* THE USE OF 'LOGICAL AND' (&&) BASICALLY WORKS LIKE A SWITCH, IF THE ITEM TO THE LEFT IS 
      'FALSE' * THEN THE ITEM TO THE RIGHT WILL NOT BE POSTED. IF 'TRUE' IT WILL */}
      {showTrips && <TripList />}
    </div>
  );
}

export default App;
