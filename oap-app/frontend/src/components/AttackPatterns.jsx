import React, {useState, useCallback, useEffect} from 'react';

import FetchData from '../FetchData';
import List from "./List";

/**
 * Fetching data from server and showing it using List component
 *  
 */
const AttackPatterns = () => {
  const [currentView, setCurrentView] = useState("list");

  const handleToggleCurrentView = useCallback(() => {
    setCurrentView(view => (view === "list" ? "grid" : "list"));
  }, [setCurrentView]);

  const [data, setData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState(null);

  useEffect(()=> {
    const[data, isLoaded, error] = FetchData();
    setData(data);
    setIsLoaded(isLoaded);
    setError(error);
  }, []);
  
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

export default AttackPatterns;