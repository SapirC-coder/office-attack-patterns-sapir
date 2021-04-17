import React from "react";
import {Form} from "react-bootstrap";
import classNames from "classnames";

import Search from './Search'

import "./List.style.scss";

function List({ items, currentView, onToggleCurrentView }) {
  const isDetailedView = currentView === "grid";
  const [inHover, setHover] = React.useState(false);

  //filtering data using query (description keywords), query: an input from user in the search bar
  const filterDescription = (docs, query) => {
    if (!query) {
        return docs;
    }
    return docs.filter((doc) => {
      const description = doc.description.toString().toLowerCase();
      return description.includes(query.toLowerCase());
  });
};

  const { search } = window.location;
  const query = new URLSearchParams(search).get('d-search');
  const [searchQuery, setSearchQuery] = React.useState(query || '');
  const filtered = filterDescription(items, searchQuery);

  return (
    <div>
      <div className="fixed-nav">
        <h1>Office Attack Patterns</h1>
        <Search searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}/>
        <div>
        <Form.Check
          checked={isDetailedView}
          onChange={onToggleCurrentView}
          type="switch"
          id="show-details"
          label="Show details"
        />
        </div>
        
      </div>

      <div className={classNames("list", { "list-grid": isDetailedView })} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {filtered.map(item =>(
          <div className="list-item" key={item._id}>
            <h4>{item.name}</h4>
            <p className="list-item-id">{item._id}</p>
            {(inHover || isDetailedView) && (
                <div>
                <p className="list-item-type2">{item.description}</p>
                <p className="list-item-type1">x_mitre_platforms: {item.x_mitre_platforms}</p>
                <p className="list-item-type1">x_mitre_detection:</p>
                <p className="list-item-type2">{item.x_mitre_detection}</p>
                <p className="list-item-type1">phase_names: {item.phase_name}</p>
                </div>)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;