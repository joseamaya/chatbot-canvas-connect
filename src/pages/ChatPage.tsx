
import { useState, useRef, useEffect } from "react";
import { Send, Image as ImageIcon, Mic, X, RefreshCw, MoreVertical, ArrowLeft, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import { format } from "date-fns";
import { useChat } from "@/contexts/ChatContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatPage = () => {
  const { messages, sendMessage, isTyping, clearChat } = useChat();
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      await sendMessage(inputValue, "text");
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageDataUrl = event.target?.result as string;
        await sendMessage(imageDataUrl, "image");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      // In a real app, you would stop recording and process the audio here
      setIsRecording(false);
      // Simulate sending an audio message after stopping recording
      await sendMessage("Audio recording", "audio");
    } else {
      // In a real app, you would start recording here
      setIsRecording(true);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Chat Header */}
      <header className="px-4 py-3 border-b flex items-center justify-between bg-background/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center">
          <Link to="/" className="mr-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Avatar className="h-8 w-8">
            <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground text-sm font-medium">
              AI
            </div>
          </Avatar>
          <div className="ml-3">
            <h2 className="font-medium text-sm">AI Assistant</h2>
            {isTyping ? (
              <p className="text-xs text-muted-foreground animate-pulse">Typing...</p>
            ) : (
              <p className="text-xs text-muted-foreground">Online</p>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={clearChat}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Clear chat
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard">
                <Paperclip className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Mic className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Start a conversation</h3>
            <p className="text-muted-foreground max-w-md">
              Send a message, image, or voice recording to begin chatting with the AI assistant.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`${message.sender === "user" ? "chat-message-user" : "chat-message-bot"}`}
              >
                {message.type === "image" ? (
                  <img 
                    src={message.content} 
                    alt="User uploaded" 
                    className="max-w-full rounded-lg" 
                    loading="lazy"
                  />
                ) : (
                  <p>{message.content}</p>
                )}
                <div className="text-xs opacity-70 mt-1">
                  {format(new Date(message.timestamp), "h:mm a")}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-message-bot">
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-current animate-pulse delay-150"></div>
                  <div className="w-2 h-2 rounded-full bg-current animate-pulse delay-300"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>

      {/* Chat Input */}
      <div className="p-4 border-t bg-background/80 backdrop-blur-md">
        <div className="flex items-end gap-2">
          <div className="flex space-x-2">
            <Button 
              type="button"
              size="icon"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-full"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <ImageIcon className="h-5 w-5" />
            </Button>
            <Button 
              type="button"
              size="icon"
              variant={isRecording ? "destructive" : "outline"}
              onClick={toggleRecording}
              className="rounded-full"
            >
              {isRecording ? <X className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          </div>
          <div className="flex-1 relative">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="resize-none pr-12 py-3 min-h-[50px] max-h-[200px] rounded-2xl input-glass"
              rows={1}
            />
            <Button
              type="button"
              size="icon"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="absolute right-2 bottom-2 h-8 w-8 rounded-full"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
