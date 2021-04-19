import $ from 'jquery';
import { sha256 } from 'js-sha256';
import { phaseNameGetNames, mitrePlatformsGetNames, getNamesByPart } from '../../Filter'

const SERVER_IP = 'http://127.0.0.1:3001/';
const CUCKOO_IP = 'http://127.0.0.1:8090/';

var db_data = [];
var vt_data = {};

let fileReader;

var HEADERS_CUCKOO = {"Authorization": "Bearer S4MPL3"};

var tasks_ids = [];

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;

    this.fetchDB();
  }

  /**
  * This function is fetching data from the server and returning a meassage as a respone of the request from the user
  * @param {string} urlAddition the continuation of the url to fetch from backend
  */
  fetchVT(urlAddition) {
    $.ajax({url: SERVER_IP + urlAddition, 
            method: 'GET', 
            async: false,
      success: function(result) {
        vt_data = result;
      }
    })
  }

  /**
  * This function is fetching data from the server (of the database)
  */
  fetchDB(){
    $.ajax({url: SERVER_IP, 
            method: 'GET',
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
    const message = this.createChatBotMessage("Matching names: " + getNamesByPart(db_data, value))
    this.updateChatbotState(message)
  }

  handleMitrePlatform(value) {
    const message = this.createChatBotMessage("Names of attack patterns with matching given mitre platform: " + mitrePlatformsGetNames(db_data, value)) 
    this.updateChatbotState(message)
  }

  handlePhaseName(value) {
    const message = this.createChatBotMessage("Matching names: " + phaseNameGetNames(db_data, value))
    this.updateChatbotState(message)
  }

  sendVTResults() {
    const message = this.createChatBotMessage("results by virus total: harmless: " + vt_data.harmless + ", malicious: " + vt_data.malicious + ", suspicious: " + vt_data.suspicious + ", undetected: " + vt_data.undetected)
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

  cuckooHandleFileRead() {
    const content = fileReader.result;

    var output = {'file' : ('file', content)};

    $.ajax({url: CUCKOO_IP + '/tasks/create/file', 
            type: 'POST',
            data: output,
            headers: HEADERS_CUCKOO,
            success: function(result) {
              tasks_ids.push(result.json()['task_id']);
              const message = this.createChatBotMessage('File has been submited! '+ result.json()['task_id']);
              this.updateChatbotState(message);
            }
            
    })
  }

  cuckooCreateFile(file) {
    fileReader = new FileReader();
    fileReader.onloadend = this.cuckooHandleFileRead;
    fileReader.readAsText(file);
  }

  cuckooGetReports() {
    var reports = [];
    tasks_ids.forEach(id => {
      $.ajax({url: CUCKOO_IP + '/tasks/summary/' + id, 
            method: 'GET',
            success: function(result){
              reports.push(result['task_id'] +' : ' +  result['score']);
            }
      })
    })
    tasks_ids = [];
    const message = this.createChatBotMessage('reports: ' + reports.join(', '));
    this.updateChatbotState(message);
  }
}

export default ActionProvider;
  