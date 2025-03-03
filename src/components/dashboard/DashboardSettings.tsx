
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const DashboardSettings = () => {
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your AI assistant and application settings.
          </p>
        </div>
        <Button onClick={() => toast.success("Settings have been reset to defaults")}>
          Reset to Defaults
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="ai">AI Configuration</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure general application settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input id="site-name" defaultValue="AI Chat Assistant" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Default Language</Label>
                    <select 
                      id="language" 
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      defaultValue="en"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="debug-mode">Debug Mode</Label>
                    <div className="text-sm text-muted-foreground">
                      Enable detailed error logs and debugging tools
                    </div>
                  </div>
                  <Switch id="debug-mode" />
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button type="submit">
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Configuration</CardTitle>
              <CardDescription>
                Configure how the AI assistant responds and processes information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="model">AI Model</Label>
                    <select 
                      id="model" 
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      defaultValue="gpt-4"
                    >
                      <option value="gpt-4">GPT-4</option>
                      <option value="gpt-3.5">GPT-3.5</option>
                      <option value="custom">Custom Model</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input 
                        id="temperature" 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.1" 
                        defaultValue="0.7" 
                      />
                      <Input 
                        type="number" 
                        min="0" 
                        max="1" 
                        step="0.1" 
                        defaultValue="0.7" 
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Controls randomness: Lower values are more deterministic, higher values are more creative
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="contextual-memory">Contextual Memory</Label>
                    <div className="text-sm text-muted-foreground">
                      Allow AI to remember previous conversations
                    </div>
                  </div>
                  <Switch id="contextual-memory" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button type="submit">
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how the application looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <select 
                      id="theme" 
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      defaultValue="system"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animations">Animations</Label>
                    <div className="text-sm text-muted-foreground">
                      Enable UI animations and transitions
                    </div>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button type="submit">
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="message-notifications">New Messages</Label>
                    <div className="text-sm text-muted-foreground">
                      Notify when you receive new messages
                    </div>
                  </div>
                  <Switch id="message-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="system-notifications">System Notifications</Label>
                    <div className="text-sm text-muted-foreground">
                      Notify about system updates and maintenance
                    </div>
                  </div>
                  <Switch id="system-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sounds">Notification Sounds</Label>
                    <div className="text-sm text-muted-foreground">
                      Play sounds for notifications
                    </div>
                  </div>
                  <Switch id="sounds" />
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button type="submit">
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
