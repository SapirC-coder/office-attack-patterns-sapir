import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: 'Attack Patterns Bot',
  customStyles: {
    botMessageBox: {
      backgroundColor: "#f8c86e",
    },
    chatButton: {
      backgroundColor: "#f8c86e",
    },
  },
  initialMessages: [
    createChatBotMessage(
      "Hey! I'm here to help you to search about some more data!"
    ),
    createChatBotMessage(
      "Would you like to search in VirusTotal or in our Database?"
    )
  ],
};

export default config

