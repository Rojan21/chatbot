import React, { useState, useRef, useEffect } from 'react';
import { Bot } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { generateMockingResponse } from './utils/mockingUtils';
import { Message } from './types';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Go ahead, tell me something. I promise to be totally supportive... Not! 😈",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Add bot response
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: generateMockingResponse(content),
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center gap-2 p-4 bg-white border-b border-gray-100">
        <div className="bg-purple-100 p-2 rounded-full">
          <Bot className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">MockBot</h1>
          <p className="text-sm text-gray-500">Professionally unprofessional</p>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
}

export default App;