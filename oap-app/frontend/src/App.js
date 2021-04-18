import React, {useState, useCallback, useEffect} from "react";
import $ from 'jquery';

import List from './components/AttackPatterns'

const SERVER_IP = 'http://127.0.0.1:3001/';

const App = () => {

  // defining current view (list or grid)
  const [currentView, setCurrentView] = useState("list");

  // handling change of current view
  const handleToggleCurrentView = useCallback(() => {
    setCurrentView(view => (view === "list" ? "grid" : "list"));
  }, [setCurrentView]);

  // for database output
  const [data, setData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState(null);
  
  // getting database information from server
  useEffect(()=> {
    $.ajax({url: SERVER_IP, method: 'GET',
      success: function(result){
        setData(result);
        setIsLoaded(true);
      },
      error: function(xhr, status, error) {
        setIsLoaded(false);
        setError(error);
      }
    })
  });
  
  // showing output (if the data has been loaded, the data if it loaded, or an error if occurred)
  if (error) {
    return <div>Error: {error}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <List
          items={data}
            currentView={currentView}
            onToggleCurrentView={handleToggleCurrentView}
        />
      </div>
    );
  }
}

export default App;
