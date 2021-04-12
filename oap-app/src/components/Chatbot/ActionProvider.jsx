import { phase_name_get_names, mitre_platforms_get_names, get_names_by_part } from '../../Filter'

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
    }

    updateChatbotState(message) {
      //preserving the previous state
         this.setState(prevState => ({
            ...prevState, messages: [...prevState.messages, message]
          }))
    }

    handelVirusTotalOptions() {
      this.updateChatbotState(this.createChatBotMessage(""))
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
  