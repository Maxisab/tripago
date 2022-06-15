import { useState } from "react"
import { useFetch } from '../hooks/useFetch' //IMPORTS CUSTOM HOOK

//styles
import './TripList.css'

//EXPORT DEFAULT IS PLACED HERE BEFORE THE FUNCTION WHICH ALLOWS 
//US TO IMPORT IT WITHOUT THE CURLY BRACKETS (SEE APP.JS)
export default function TripList() {
  const [url, setUrl] = useState('http://localhost:3000/trips')//THIS URL IS OUR LOCAL DATABASE USING JSON
  
  //HERE WE IMPORTED 'DATA' FROM OUR USEFETCH HOOK BUT CHANGED ITS NAME TO 'TRIPS' USING
  //A COLON ALLOWING US TO USE THAT DATA WITH A DIFFERENT NAME THAN ITS ORIGIN IN THIS COMPONENT
  const { data: trips, isPending, error } = useFetch(url, { type: 'GET' })

  return (
    <div className="trip-list">
      <h2>Trip List</h2>

      {/* THIS WILL SHOW THE LOADING MESSAGE WHILE WE WAIT FOR THE FETCH REQUEST TO FINALIZE */}
      {isPending && <div>Loading trips...</div>}

      {/* THIS WILL DISPLAY THE ERROR MESSAGE TO THE PAGE IF THE FETCH REQUEST RUNS INTO AN ERROR */}
      {error && <div>{error}</div>}
      <ul>
        {/* HERE WE SEE 'TRIPS' BEING USED INSTEAD OF 'DATA' FROM OUR USEFETCH HOOK */}
        {trips && trips.map(trip => (
          <li key={trip.id}>
            <h3>{trip.title}</h3>
            <p>{trip.price}</p>
          </li>
        ))}
      </ul>
      <div className="filters">

{/* HERE WE MANIPULATE THE URL WITH AN '?' AT THE END WHICH SEND A QUERY AND RETURNS OBJECTS FROM
THE DATABASE AT THE URL WITH MATCHING VALUE/KEY PAIRS. IN THIS EXAMPLE WITH THE VALUE/KEY
PAIR OF LOC:EUROPE */}
        <button onClick={() => setUrl('http://localhost:3000/trips?loc=europe')}>
          European Trips
        </button>
        <button onClick={() => setUrl('http://localhost:3000/trips')}>
          All Trips
        </button>
      </div>
    </div>
  )
}