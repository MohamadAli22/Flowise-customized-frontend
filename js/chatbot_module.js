// import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
import Chatbot from "./web.js"


function handleEvent(event) {
    const config = event.detail.config;
    const theme_color = event.detail.color;

    function removeMsgBoxByText(text) {
        // Get all elements with the attribute data-testid="host-bubble"

        const elements = document.querySelector("body > flowise-fullchatbot").shadowRoot
            .querySelectorAll('[data-testid="host-bubble"]');

        elements.forEach(element => {
            // Initialize a variable to hold the combined text
            let combinedText = '';

            // Function to recursively get text from all child nodes
            function getTextFromNode(node) {
                if (node.nodeType === Node.TEXT_NODE)
                    combinedText += node.textContent.trim();
                else if (node.nodeType === Node.ELEMENT_NODE)
                    node.childNodes.forEach(childNode => getTextFromNode(childNode));
            }

            // Start the recursive text extraction from the element itself
            getTextFromNode(element);

            // Check if the combined text contains the specified text
            if (combinedText.includes(text)) {
                console.log('removing this', element)
                element.remove(); // Remove the element from the DOM
            }
        });
    }

    function startsWith(longerString, shorterString) {
        // Check if the length of the longer string is at least as long as the shorter string
        if (longerString.length < shorterString.length) {
            let temp = shorterString
            shorterString = longerString
            longerString = temp
        }

        // Check character by character
        for (let i = 0; i < shorterString.length; i++) {
            if (longerString[i] !== shorterString[i]) {
                return false;
            }
        }

        return true;
    }


    function checkDuplicateMsgRegularly() {
        console.log('check duplication...')
        let combinedText = '';
        // Function to recursively get text from all child nodes
        function getTextFromNode(node) {
            if (node.nodeType === Node.TEXT_NODE)
                combinedText += node.textContent.trim();
            else if (node.nodeType === Node.ELEMENT_NODE)
                node.childNodes.forEach(childNode => getTextFromNode(childNode));
        }

        const elements = document.querySelector("body > flowise-fullchatbot").shadowRoot
            .querySelectorAll('[data-testid="host-bubble"]');

        if (elements)
            elements.forEach(element1 => {
                combinedText = '';
                getTextFromNode(element1);
                const text1 = combinedText

                elements.forEach(element2 => {
                    // Initialize a variable to hold the combined text
                    combinedText = '';

                    // Start the recursive text extraction from the element itself
                    getTextFromNode(element2);

                    if (combinedText != text1)
                        // Check if the combined text contains the specified text
                        if (combinedText.includes(text1) && startsWith(combinedText, text1) && text1.length > 50) {
                            console.log('removing this', element1)
                            element1.remove(); // Remove the element from the DOM
                        } else if (text1.includes(combinedText) && startsWith(combinedText, text1) && combinedText.length > 50) {
                            console.log('removing this', element2)
                            element2.remove(); // Remove the element from the DOM
                        }
                });
            });
    }

    setInterval(checkDuplicateMsgRegularly, 2000);

    Chatbot.initFull({
        chatflowid: chatId,
        apiHost: BASE_URL,
        observersConfig: {
            observeMessages: (messages) => {
                for (let i = messages.length - 1; i >= 0; i--) {
                    if (i == 0) continue;
                    const curr_msg = messages[i];
                    const prev_msg = messages[i - 1];
                    if (curr_msg.type == 'apiMessage' && prev_msg.type == 'apiMessage'
                        && curr_msg.message.includes(prev_msg))
                        removeMsgBoxByText(prev_msg)
                    else if (curr_msg.type == 'apiMessage' && prev_msg.type == 'apiMessage'
                        && prev_msg.message.includes(curr_msg))
                        removeMsgBoxByText(curr_msg)
                }
            }
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
