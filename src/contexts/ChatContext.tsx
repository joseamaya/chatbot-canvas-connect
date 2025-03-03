
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

type MessageType = 'text' | 'image' | 'audio';

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'bot';
  type: MessageType;
  status: 'sending' | 'sent' | 'error';
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string, type: MessageType) => Promise<void>;
  isTyping: boolean;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatContextProviderProps {
  children: ReactNode;
}

export const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Load messages from localStorage on initial render
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      try {
        // Parse the messages and convert string timestamps back to Date objects
        const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(parsedMessages);
      } catch (error) {
        console.error('Failed to parse saved messages:', error);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Function to generate a simple bot response
  const generateBotResponse = async (userMessage: string, type: MessageType): Promise<string> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // For now, just return a simple response based on the message type
    switch (type) {
      case 'text':
        return `Thanks for your message: "${userMessage}". This is a simulated response. In a real implementation, this would connect to an AI backend.`;
      case 'image':
        return 'I've received your image. If I were connected to a vision model, I could analyze it for you.';
      case 'audio':
        return 'I've received your audio message. With a proper backend, I could transcribe and respond to it.';
      default:
        return 'I received your message but I'm not sure how to process this type of content yet.';
    }
  };

  const sendMessage = async (content: string, type: MessageType = 'text') => {
    if (!content.trim() && type === 'text') {
      return;
    }

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      sender: 'user',
      type,
      status: 'sending'
    };

    // Add user message to the chat
    setMessages(prev => [...prev, newUserMessage]);

    try {
      // Show bot typing indicator
      setIsTyping(true);

      // Generate bot response
      const botResponse = await generateBotResponse(content, type);

      // Set user message as sent
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newUserMessage.id 
            ? { ...msg, status: 'sent' } 
            : msg
        )
      );

      // Add bot response
      setMessages(prev => [
        ...prev, 
        {
          id: (Date.now() + 1).toString(),
          content: botResponse,
          timestamp: new Date(),
          sender: 'bot',
          type: 'text', // Bot always responds with text for now
          status: 'sent'
        }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Mark message as error
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newUserMessage.id 
            ? { ...msg, status: 'error' } 
            : msg
        )
      );
      
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
    toast.success('Chat history cleared');
  };

  return (
    <ChatContext.Provider value={{ 
      messages, 
      sendMessage, 
      isTyping,
      clearChat
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatContextProvider');
  }
  return context;
};
