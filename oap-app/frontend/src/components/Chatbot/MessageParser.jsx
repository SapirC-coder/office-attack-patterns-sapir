import ActionProvider from './ActionProvider'

const [handelDatabaseOptions,
  handleAPartOfName,
  handelAPhaseName,
  handleAMitrePlatform,
  askForValues,
  handelVirusTotalOptions] = ActionProvider();
  
class MessageParser {
    constructor(state) {
      this.state = state;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase()
    
      if (lowerCaseMessage.includes("virustotal")) {
        handelVirusTotalOptions();
      }
      else if (lowerCaseMessage.includes("database")) {
        handelDatabaseOptions();
      }
      else if (lowerCaseMessage.includes("chose") || lowerCaseMessage.includes("get") || lowerCaseMessage.includes("choice"))
      {
        if(lowerCaseMessage.includes("part of name")) {
          //
          handleAPartOfName();
        }
        else if(lowerCaseMessage.includes("mitre platforms") || 
                lowerCaseMessage.includes("mitre_platforms") || 
                lowerCaseMessage.includes("mitre platform") || 
                lowerCaseMessage.includes("mitre_platform")) {
          //
          handleAMitrePlatform();
        }
        else if(lowerCaseMessage.includes("phase name") ||
                lowerCaseMessage.includes("phase names") ||
                lowerCaseMessage.includes("phase_name") ||
                lowerCaseMessage.includes("phase_names")) {
          //
          handelAPhaseName();
        }
      }
    }
  }
  
  export default MessageParser;