// import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
import Chatbot from "./web.js"


function handleEvent(event) {
    const config = event.detail.config;
    const theme_color = event.detail.color;

    Chatbot.initFull({
        chatflowid: chatId,
        apiHost: BASE_URL,
        observersConfig: {
            observeMessages: (messages) => {
              for (let i = messages.length-1; i >= 0; i--){
                if (i==0) continue;
                const curr_msg = messages[i];
                const prev_msg = messages[i-1];
                if (curr_msg.type == 'apiMessage' && prev_msg.type=='apiMessage'){
                    if (curr_msg.message.includes(prev_msg)){
                        config.title = 'duplicate issue happened'
                    }
                }
              }
            },
        }, theme: {
            chatWindow: {
                showTitle: true,
                title: config.title,
                titleAvatarSrc: config.titleAvatarSrc,
                showAgentMessages: false,
                welcomeMessage: config.welcomeMessage,
                errorMessage: 'This is a custom error message',
                backgroundColor: "#ffffff",
                height: 0,
                width: 0,
                fontSize: 16,
                poweredByTextColor: theme_color,
                botMessage: {
                    backgroundColor: config.botMessage.backgroundColor,
                    textColor: config.botMessage.textColor,
                    showAvatar: config.botMessage.showAvatar,
                    avatarSrc: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAclBMVEX////4+Ppxdp4JHG88RIHAwtIqNHkABmoBGW4AAF3IythBSYTW1+IAAGMNHnAAEmxkapbk5ewAAFsAFW0AAGfP0NxNVIohLXYADmujpb7p6u81Pn4AAGCztcnu7vOSlbP19fh3e6F9gaW6vM5SWIxZX5AJD7lpAAABlklEQVR4AYWTh5bbIBQFB6MGMnIB7aJeLP//L0YvPVmXURf1Dgd+ow46SXlBluvCWCAtD4qvHF1VVaczXK4+nPlKLRX8B6ShKj55QHGqKh0BH0zDA9qud8HVoIaax6gxLSveMGUzz2gHCyz9erMzAvWRvxhMcAkoF0MwA9B65zIlBssUmI2uqjDB5vc0poVuj5Uf4Bz89QI2iKg7LHF/CQOq359aw2dRhRRuQf6vMMmLs4xirkigMcEDa/QxhBnmkJ9CIka1P5kUqAcFc++2ZZoBxvU+AaWLH2fLL7JF/SdE/+2z1tN/UpeMX9jzFl0JTPd1BpinZXO9vNYjkJrotcRIwkkmyRhC9HEFOneV/4WkGrGSSkStubzckD8+A633714xSPy4wP0kFSwcjc43OOS7wA5aUe03ESWqZ6AJ5Qgqc65oQRYrRKcgcbJYf3GsQZjtbTULYIeWZ8yfE28oynRUPGasgdoF13ctD0ivrgOi3mMVPCDzlbPw4cXcka9suTZHOJ+eVRjL0ADWFDrPeEGa6L+29zePvhz6Kr862gAAAABJRU5ErkJggg==",
                },
                userMessage: {
                    backgroundColor: theme_color,
                    textColor: config.userMessage.textColor,
                    showAvatar: config.userMessage.showAvatar,
                    avatarSrc: "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
                },
                textInput: {
                    placeholder: 'Type your question',
                    backgroundColor: '#ffffff',
                    textColor: '#303235',
                    sendButtonColor: theme_color,
                    maxChars: 500,
                    maxCharsWarningMessage: 'You exceeded the characters limit. Please input less than 500 characters.',
                    // autoFocus: true, // If not used, autofocus is disabled on mobile and enabled on desktop. true enables it on both, false disables it on both.
                    sendMessageSound: false,
                    // sendSoundLocation: "send_message.mp3", // If this is not used, the default sound effect will be played if sendSoundMessage is true.
                    receiveMessageSound: false,
                    // receiveSoundLocation: "receive_message.mp3", // If this is not used, the default sound effect will be played if receiveSoundMessage is true. 
                },
                feedback: {
                    color: '#303235',
                },
                footer: {
                    textColor: theme_color,
                    text: 'Powered by',
                    company: 'Evolved AI',
                    companyLink: 'https://www.evolved.ai/',
                }
            }
        }
    })
}

// Listen for the custom event
window.addEventListener('moduleEvent', handleEvent);
