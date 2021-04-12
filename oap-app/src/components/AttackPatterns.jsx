import React from 'react';

import FetchData from '../FetchData';
import List from "./List";

/**
 * Fetching data from server and showing it using List component
 *  
 */
function AttackPatterns() {
  const [currentView, setCurrentView] = React.useState("list");

  const handleToggleCurrentView = React.useCallback(() => {
    setCurrentView(view => (view === "list" ? "grid" : "list"));
  }, [setCurrentView]);

  const [data, isLoaded, error] = FetchData(); 

  if (error) {
    return <div>Error: {error.message}</div>;
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