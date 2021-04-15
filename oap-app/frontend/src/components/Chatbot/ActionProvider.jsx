import { useState } from 'react';
import $ from 'jquery';
import { phase_name_get_names, mitre_platforms_get_names, get_names_by_part } from '../../Filter'

const server_ip = 'http://localhost:3001/';

/**
 * This function is fetching data from the server and returning a meassage as a respone of the request from the user
 * @param {string} url_addition the continuation of the url to fetch from backend
 * @return {string} the result for the user
 */
function FetchFromVt(url_addition){
  const [data, setData] = useState([]);
  $.ajax({url: server_ip + url_addition, method: 'GET',
    success: function(result){
      setData(result);
    }
  })
  return data.toString();
}

/**
 * This function is fetching data from the server (of the database)
 */
 function FetchDB(){
  const [data, setData] = useState([]);
  $.ajax({url: server_ip, method: 'GET',
    success: function(result){
      setData(result);
    }
  })
  return JSON.parse(data);
}

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.data = FetchDB();
  }

  updateChatbotState(message) {
    //preserving the previous state
       this.setState(prevState => ({
          ...prevState, messages: [...prevState.messages, message]
        }))
  }

  handelVirusTotalOptions() {
    this.updateChatbotState(this.createChatBotMessage("You can check if a url, domain, or an ip is safe with virustotal, which would you like to check about? "))
  }

  handelDatabaseOptions() {
    const message = this.createChatBotMessage("You can get names of attack patterns that include given mitre platform or a phase name (or a part of it), you can also enter a part of name and get all the matching attacks, what's your choice? ")
    this.updateChatbotState(message)
  }

  askForValues() {
    this.updateChatbotState(this.createChatBotMessage("Please enter values: "))
  }

  handleAPartOfName(value) {   
    this.updateChatbotState(this.createChatBotMessage("Matching names: " + get_names_by_part(value)))
  }

  handleAMitrePlatform(value) {
    this.updateChatbotState(this.createChatBotMessage("Names of attack patterns with matching given mitre platform: " + mitre_platforms_get_names(value))) 
  }

  handelAPhaseName(value) {
    this.updateChatbotState(this.createChatBotMessage("Matching names: " + phase_name_get_names(value)))
  }

}

export default ActionProvider;
  