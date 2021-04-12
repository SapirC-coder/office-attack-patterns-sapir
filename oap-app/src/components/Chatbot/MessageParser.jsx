class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase()
    
      if (lowerCaseMessage.includes("virustotal")) {
        this.actionProvider.handelVirusTotalOptions();
      }
      else if (lowerCaseMessage.includes("database")) {
        this.actionProvider.handelDatabaseOptions();
      }
      else if (lowerCaseMessage.includes("chose") || lowerCaseMessage.includes("get") || lowerCaseMessage.includes("choice"))
      {
        if(lowerCaseMessage.includes("part of name")) {
          //
          this.actionProvider.handleAPartOfName();
        }
        else if(lowerCaseMessage.includes("mitre platforms") || 
                lowerCaseMessage.includes("mitre_platforms") || 
                lowerCaseMessage.includes("mitre platform") || 
                lowerCaseMessage.includes("mitre_platform")) {
          //
          this.actionProvider.handleAMitrePlatform();
        }
        else if(lowerCaseMessage.includes("phase name") ||
                lowerCaseMessage.includes("phase names") ||
                lowerCaseMessage.includes("phase_name") ||
                lowerCaseMessage.includes("phase_names")) {
          //
          this.actionProvider.handelAPhaseName();
        }
      }
    }
  }
  
  export default MessageParser;