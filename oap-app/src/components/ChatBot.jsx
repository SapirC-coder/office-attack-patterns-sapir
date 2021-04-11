import ChatBot from 'react-simple-chatbot';

function CustomChatbot(props) {
    const config = {
      width: "300px",
      height: "400px",
      floating: true
    };
    const steps = [
      {
        id: "start",
        message: "Hey! I'm here to help you to search about some more data! would you like to search in VirusTotal or in our Database?",
        trigger: "search_choice",
      },
      {
        id: "search_choice",
        user: true,
        trigger: (value) => {return value.toString().toLowerCase().includes("virustotal")? "virustotal_choice" : value.toString().toLowerCase().includes("database")? "database_choice" : "start"},
      },
      {
        id: "database_choice",
        message: "You chose to search in database! get names of attack patterns that include:",
        trigger: "options_database",
      },
      {
        id: 'options_database',
        options: [
          { value: 1, label: 'mitre platform', trigger: 'mitre_plat_input' },
          { value: 2, label: 'phase name', trigger: 'phase_name_input' },
          { value: 3, label: 'part of name', trigger: 'part_name_input' },
        ],
      },
      {
        id: "mitre_plat_input",
        user: true,
        trigger: "handle_db_choice"
      },
      {
        id: "phase_name_input",
        user: true,
        trigger: "handle_db_choice"
      },
      {
        id: "part_name_input",
        user: true,
        trigger: "handle_db_choice"
      },
      {
        id: "handle_db_choice",
        user: true,
        trigger: "start"
      },
      {
        id: "virustotal_choice",
        message: "You chose to search in VirusTotal!",
        trigger: "start"
      },
      
    
     ];
    
    return <ChatBot steps={steps} {...config} />;

}

export default CustomChatbot;