import { useState, useEffect, useRef } from "react"

export const useFetch = (url, _options) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  //use userRef to wrap an object/array argument
  //which is a useEffect dependency
  const options = useRef(_options).current

// REACT SEE'S ALL FUNCTIONS, OBJECTS AND ARRAYS THROUGH A REFERENCE POINT THAT IS STORED LOCALLY
// AT THE TIME THE PAGE RENDERS. WHEN THE PAGE IS RENDERED AGAIN THESE PARAMATERS WILL CHANGE 
// REFERENECE EVEN IF THEY DONT CHANGE THEIR VALUE. WHEN REACT SEE'S A CHANGE IT RENDERS AGAIN WHICH
// CAN CAUSE AN INFINITE LOOP. FOR THIS REASON WE WANT TO USE 'USEEFFECT'. SEE BELOW. 

// USEEFFECT ALLOWS US TO FIRE OFF WHATEVER WE NEST IN THE FUNCTION ONLY ON THE INITIAL RENDER OF THE
// REACT PAGE AND THEN AGAIN ONLY IF THE CONTINGENCIES LISTED IN THE ARRAY AT THE END OF THE FUNCTION
// (IN THIS EXAMPLE 'URL' AND 'OPTIONS') HAVE CHANGED IN ANY WAY. 
  useEffect(() => {
    console.log(options)

    {/* THIS CONTROLLER IS WHAT IS USED TO RUN A CLEAN UP FUNCTION WHEN A COMPONENT IS UNMOUNTED 
  BEFORE A FETCH REQUEST CAN FINALIZE */}
    const controller = new AbortController()

    const fetchData = async () => {
      
      {/* THIS IS A PIECE OF STATE WE USE TO SHOW A LOADING MESSAGE WHILE WE 
    WAIT FOR THE FETCH REQUEST TO FINALIZE. YOU CAN SEE IT IN THE TRIPLIST COMPONENT */}
      setIsPending(true) 

      {/* HERE WE HAVE A 'TRY/CATCH' PIECE OF CODE WHICH WILL ATTEMPT A FETCH REQUEST AND IF IT
  RUNS INTO AN ERROR IT WILL THROW IT TO THE 'CATCH' WHICH WE HAVE SET UP TO SHOW US THE ERROR */}
      try {

        //THE SECOND PARAMETER IN THE FETCH REQUEST IS OUR CONTROLLER FOR THE CLEANUP FUNCTION
        const res = await fetch(url, { signal: controller.signal })

        //IF STATEMENT CHECKS IF THE RES STATUS IS NOT OK IN WHICH CASE IT THROWS AN ERROR TO 
        //THE CATCH BELOW
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        const json = await res.json()

        setIsPending(false)
        setData(json)
        setError(null)
      } catch (err) {
        if (err.name === "AbortError") {
          console.log('the fetch was aborted')
        } else {
          setIsPending(false)
          setError('Could no fetch the data')
        }
      }
    }

    fetchData()

    // HERE WE RETURN THE CONTROLLER ABORT FOR THE CLEANUP FUNCTION WHICH ABORTS THE FETCH REQUEST
    // IF NECESSARY, FOR EXAMPLE IN CASE OF AN UNMOUNTED COMPONENT
    return () => {
      controller.abort()
    }
  }, [url, options])

  return { data, isPending, error }

}