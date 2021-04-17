import $ from 'jquery';
import { sha256 } from 'js-sha256';
import { phase_name_get_names, mitre_platforms_get_names, get_names_by_part } from '../../Filter'

const server_ip = 'http://127.0.0.1:3001/';

var db_data = [];
var vt_data = {};

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;

    this.fetchDB();
  }

  /**
  * This function is fetching data from the server and returning a meassage as a respone of the request from the user
  * @param {string} url_addition the continuation of the url to fetch from backend
  */
  fetchVT(url_addition) {
    $.ajax({url: server_ip + url_addition, method: 'GET',
      success: function(result) {
        vt_data = result;
      }
    })
  }

  /**
  * This function is fetching data from the server (of the database)
  */
  fetchDB(){
    $.ajax({url: server_ip, method: 'GET',
      success: function(result){
        db_data = result;
      }
    })
  }

  updateChatbotState(message) {
    //preserving the previous state
       this.setState(prevState => ({
          ...prevState, messages: [...prevState.messages, message]
        }))
  }

  handelVirusTotalOptions() {
    const message = this.createChatBotMessage("You can check if a url, domain, or an ip is safe with virustotal, which would you like to check about? ")
    this.updateChatbotState(message)
  }

  handelDatabaseOptions() {
    const message = this.createChatBotMessage("You can get names of attack patterns that include given mitre platform or a phase name (or a part of it), you can also enter a part of name and get all the matching attacks, what's your choice? ")
    this.updateChatbotState(message)
  }

  askForValues() {
    const message = this.createChatBotMessage("Please enter value: ")
    this.updateChatbotState(message)
  }

  handlePartOfName(value) {   
    const message = this.createChatBotMessage("Matching names: " + get_names_by_part(db_data, value))
    this.updateChatbotState(message)
  }

  handleMitrePlatform(value) {
    const message = this.createChatBotMessage("Names of attack patterns with matching given mitre platform: " + mitre_platforms_get_names(db_data, value)) 
    this.updateChatbotState(message)
  }

  handlePhaseName(value) {
    const message = this.createChatBotMessage("Matching names: " + phase_name_get_names(db_data, value))
    this.updateChatbotState(message)
  }

  sendVTResults() {
    //while($.isEmptyObject(vt_data)){  }
    const message = this.createChatBotMessage("results by virus total: harmless: " + Object.keys(vt_data).length)
    //const message = this.createChatBotMessage("results by virus total: harmless: " + vt_data.harmless + ", malicious: " + vt_data.malicious + ", suspicious: " + vt_data.suspicious + ", undetected: " + vt_data.undetected)
    vt_data = {};
    this.updateChatbotState(message)
  }

  pleaseWaitForVT() {
    const message = this.createChatBotMessage("It would take some time please wait..");
    this.updateChatbotState(message)
  }

  handleURL(value) {
    this.fetchVT('vt-url/' + sha256(value).toString());
    this.sendVTResults();
  }

  handleIP(value) {
    this.fetchVT('vt-ip/' + value);
    this.sendVTResults();
  }

  handleDomain(value) {
    this.fetchVT('vt-domain/' + value);
    this.sendVTResults();
  }
}

export default ActionProvider;
  