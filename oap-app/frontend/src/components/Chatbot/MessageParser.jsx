var checked = {
  part_name: false,
  mit_plat: false,
  phase_name: false,
  url: false,
  ip: false,
  domain: false
};

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
    else if (lowerCaseMessage.includes("chose") || 
             lowerCaseMessage.includes("get") || 
             lowerCaseMessage.includes("choice") || 
             lowerCaseMessage.includes("want") || 
             lowerCaseMessage.includes("give"))
    {
      if(lowerCaseMessage.includes("part of name")) {
        checked.part_name = true;
      }
      else if(lowerCaseMessage.includes("mitre platforms") || 
              lowerCaseMessage.includes("mitre_platforms") || 
              lowerCaseMessage.includes("mitre platform") || 
              lowerCaseMessage.includes("mitre_platform")) {
        checked.mit_plat = true;
      }
      else if(lowerCaseMessage.includes("phase name") ||
              lowerCaseMessage.includes("phase names") ||
              lowerCaseMessage.includes("phase_name") ||
              lowerCaseMessage.includes("phase_names")) {
        checked.phase_name = true;
      }
      else if(lowerCaseMessage.includes("ip")){
        checked.ip = true;
      }
      else if(lowerCaseMessage.includes("url")) {
        checked.url = true;
      }
      else if(lowerCaseMessage.includes("domain")) {
        checked.domain = true;
      }
      this.actionProvider.askForValues();
    }
    else { //checking if theres a need to send results and sending using actionProvider
      if(checked.part_name) {
        checked.part_name = false;
        this.actionProvider.handlePartOfName(lowerCaseMessage);
      }
      else if (checked.mit_plat) {
        checked.mit_plat = false;
        this.actionProvider.handleMitrePlatform(lowerCaseMessage);
      }
      else if (checked.phase_name) {
        checked.phase_name = false;
        this.actionProvider.handlePhaseName(lowerCaseMessage);
      }
      else if (checked.ip) {
        checked.ip = false;
        this.actionProvider.handleIP(lowerCaseMessage);
      }
      else if (checked.url) {
        checked.url = false;
        this.actionProvider.handleURL(lowerCaseMessage);
      }
      else if (checked.domain) {
        checked.domain = false;
        this.actionProvider.handleDomain(lowerCaseMessage);
      }
    }
  }
}

export default MessageParser;
