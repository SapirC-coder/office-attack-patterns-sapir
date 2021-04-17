import React, {useState, useCallback, useEffect} from "react";
import $ from 'jquery';

import List from './components/AttackPatterns'

const server_ip = 'http://127.0.0.1:3001/';

const App = () => {
  const [currentView, setCurrentView] = useState("list");

  const handleToggleCurrentView = useCallback(() => {
    setCurrentView(view => (view === "list" ? "grid" : "list"));
  }, [setCurrentView]);

  const [data, setData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState(null);
  
  useEffect(()=> {
    $.ajax({url: server_ip, method: 'GET',
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
  
  if (error) {
    return <div>Error: {error}</div>;
  } 
  else if (!isLoaded) {
    return <div>Loading...</div>;
  } 
  else {
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
