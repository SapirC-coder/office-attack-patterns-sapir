import FetchData from '../../FetchData'
import { phase_name_get_names, mitre_platforms_get_names, get_names_by_part } from '../../Filter'

//const [data, isLoaded, error] = FetchData(); 

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
    }
  }
  
  export default ActionProvider;
  