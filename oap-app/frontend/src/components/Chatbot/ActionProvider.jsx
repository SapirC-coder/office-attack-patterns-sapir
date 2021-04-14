import { phase_name_get_names, mitre_platforms_get_names, get_names_by_part } from '../../Filter'
import FetchData from '../../FetchData'

const ActionProvider = (createChatBotMessage, setStateFunc, createClientMessage) => {

    //const [data, isLoaded, error]  = FetchData();

    function updateChatbotState(message){
      //preserving the previous state
         setStateFunc(prevState => ({
            ...prevState, messages: [...prevState.messages, message]
          }))
    }

    function handelVirusTotalOptions(){
      updateChatbotState(createChatBotMessage(""))
    }

    function handelDatabaseOptions(){
      const message = createChatBotMessage("You can get names of attack patterns that include given mitre platform or a phase name (or a part of it), you can also enter a part of name and get all the matching attacks, what's your choice? ")
      updateChatbotState(message)
    }

    function askForValues() {
      updateChatbotState(createChatBotMessage("Please enter values: "))
    }

    function handleAPartOfName(value) {   
      updateChatbotState(createChatBotMessage("Matching names: " + get_names_by_part(value)))
    }

    function handleAMitrePlatform(value) {
      updateChatbotState(createChatBotMessage("Names of attack patterns with matching given mitre platform: " + mitre_platforms_get_names(value))) 
    }

    function handelAPhaseName(value) {
      updateChatbotState(createChatBotMessage("Matching names: " + phase_name_get_names(value)))
    }

    return(
      [handelDatabaseOptions,
      handleAPartOfName,
      handelAPhaseName,
      handleAMitrePlatform,
      askForValues,
      handelVirusTotalOptions]
    );

}

export default ActionProvider;

  