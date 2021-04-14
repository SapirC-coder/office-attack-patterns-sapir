import React from "react";
import {Form} from "react-bootstrap";
import classNames from "classnames";
import Chatbot from 'react-chatbot-kit';

import Search from './Search';
import { filterDescription } from '../Filter';

import ActionProvider from './Chatbot/ActionProvider';
import MessageParser from './Chatbot/MessageParser';
import config from './Chatbot/config';

import "./List.style.scss";

// Component of a list which include all Components
function List({ items, currentView, onToggleCurrentView }) {
  const isDetailedView = currentView === "grid";
  const [inHover, setHover] = React.useState(false);

  const { search } = window.location;
  const query = new URLSearchParams(search).get('d-search');
  const [searchQuery, setSearchQuery] = React.useState(query || '');
  const filtered = filterDescription(items, searchQuery);

  const [showChatbot, toggleChatbot] = React.useState(true);

  return (
    <div>
      <div className="fixed-nav">
        <h1>Office Attack Patterns</h1>

        <Search searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}/>
        
        <Form.Check
          checked={isDetailedView}
          onChange={onToggleCurrentView}
          type="switch"
          id="show-details"
          label="Show details"
        />
        
        <div className="app-chatbot-container">
          {
            //checking if there is a need to show chat bot(happening in the button of the bot under), and showing
            (showChatbot) && (
              <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />)
          }
        </div>
        
        <button
          className="app-chatbot-button"
          onClick={() => toggleChatbot((prev) => !prev)}
        >
          <button icon="app-chatbot-button-icon" />
        </button>

      </div>

      <div className={classNames("list", { "list-grid": isDetailedView })} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {filtered.map(item =>(
          <div className="list-item" key={item._id}>
            <h4>{item.name}</h4>
            <p className="list-item-id">{item._id}</p>
            {(inHover || isDetailedView) && ( //showing more details about every attack pattern on the list
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