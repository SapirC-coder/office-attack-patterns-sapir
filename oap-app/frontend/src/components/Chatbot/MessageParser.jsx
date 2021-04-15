class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
    this.checked = {
      part_name : false,
      mit_plat: false,
      phase_name: false
    };
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
        this.setChecked({part_name : true});
      }
      else if(lowerCaseMessage.includes("mitre platforms") || 
              lowerCaseMessage.includes("mitre_platforms") || 
              lowerCaseMessage.includes("mitre platform") || 
              lowerCaseMessage.includes("mitre_platform")) {
        this.setChecked({mit_plat : true});
      }
      else if(lowerCaseMessage.includes("phase name") ||
              lowerCaseMessage.includes("phase names") ||
              lowerCaseMessage.includes("phase_name") ||
              lowerCaseMessage.includes("phase_names")) {
        this.setChecked({phase_name : true});
      }
      this.actionProvider.askForValues();
    }
    if(this.checked.part_name) {
      this.actionProvider.handleAPartOfName(message);
      this.setChecked({part_name : false});
    }
    else if (this.checked.mit_plat) {
      this.actionProvider.handleAMitrePlatform(message);
      this.setChecked({mit_plat : false});
    }
    else if (this.checked.phase_name) {
      this.actionProvider.handleAPhaseName(message);
      this.setChecked({phase_name : false});
    }
  }
}

export default MessageParser;