import React, { useState } from "react";
import MessageInput from "./MessageInput";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCMhuhudG9S33XEF8ThLZYAFrrbK1ZVzLM");
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
        responseMimeType: "text/plain",
    },
});

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);

    const handleSendMessage = async (message) => {
        if (message.trim()) {
            const newMessages = [
                ...messages,
                { sender: "user", text: message },
            ];
            setMessages(newMessages);

            // Restrict the model by customizing the prompt
            const customPrompt = `Please provide a short and concise response (maximum 2-3 sentences) strictly related to plants and the environment. Question: "${message}"`;

            try {
                const result = await model.generateContent(customPrompt);
                const response = result.response.text();
                console.log(response);
                setMessages([
                    ...newMessages,
                    { sender: "bot", text: response },
                ]);
            } catch (error) {
                console.error("Error generating response:", error);
                setMessages([
                    ...newMessages,
                    { sender: "bot", text: "Sorry, I couldn't process that." },
                ]);
            }
        }
    };

    return (
        <div className="fixed bottom-20 right-4 w-80 h-96 md:w-100 md:h-120 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col ml-4 mr-4">
            <div className="bg-blue-500 text-white p-4 rounded-t-lg text-center">
                Chat
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-2 ${
                            msg.sender === "user" ? "text-right" : "text-left"
                        }`}
                    >
                        <span
                            className={`inline-block p-2 rounded-lg ${
                                msg.sender === "user"
                                    ? "bg-blue-100"
                                    : "bg-gray-100"
                            }`}
                        >
                            {msg.text}
                        </span>
                    </div>
                ))}
            </div>
            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatWindow;