
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquareText, Cpu, Sparkles, Settings, Image, Mic } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="w-full px-4 py-4 flex items-center justify-between border-b bg-background/70 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <Cpu className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-semibold">AIChat</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/chat">
            <Button variant="ghost" size="sm">Chat</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">Dashboard</Button>
          </Link>
          <Link to="/chat">
            <Button className="hidden sm:flex">
              Start Chatting
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-12 md:py-20 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl mx-auto space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Experience the future of <span className="text-gradient">AI conversation</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A powerful AI assistant that understands text, images, and voice. Designed with precision and elegance.
          </p>
          <div className="pt-6">
            <Link to="/chat">
              <Button size="lg" className="rounded-full px-8 animate-pulse-subtle">
                Start Chatting Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-gradient-to-b from-background to-accent/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MessageSquareText className="h-8 w-8 text-primary" />}
              title="Text Conversations"
              description="Have natural, flowing conversations with an AI that understands context and nuance."
            />
            <FeatureCard 
              icon={<Image className="h-8 w-8 text-primary" />}
              title="Image Recognition"
              description="Share images with the AI to analyze, describe, or discuss their contents."
            />
            <FeatureCard 
              icon={<Mic className="h-8 w-8 text-primary" />}
              title="Voice Interaction"
              description="Speak naturally and listen to human-like voice responses for a seamless experience."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of users already enhancing their productivity with our AI assistant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/chat">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Start Chatting
                <MessageSquareText className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 hover:bg-white/10">
                Configure Dashboard
                <Settings className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Cpu className="w-5 h-5 text-primary" />
            <span className="font-medium">AIChat</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2023 AIChat. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-background border rounded-2xl p-6 shadow-sm card-hover">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default LandingPage;
