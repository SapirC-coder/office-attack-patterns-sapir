import React from 'react';
import $ from 'jquery';

/**
 * Fetching data from the server
 * 
 * @returns If the data is loaded, the data, and error if there is
 */

 const FetchData = () => {

  const [data, setData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState(null);

  //React.useEffect(()=> {
      $.ajax({url: 'http://127.0.0.1:3001', method: 'GET',
      success: function(result){
        setData(result);
        setIsLoaded(true);
      },
      error: function(xhr, status, error) {
        setIsLoaded(false);
        setError(error);
      }
    })
  //}, []);

  return [data, isLoaded, error];
}

export default FetchData;