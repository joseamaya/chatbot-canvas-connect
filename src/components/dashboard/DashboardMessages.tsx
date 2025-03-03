
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardMessages() {
  // Sample data - in a real app, this would come from an API
  const recentConversations = [
    {
      id: "1",
      user: "Alex Johnson",
      lastMessage: "Can you help me find information about machine learning?",
      time: "Just now",
      unread: true,
    },
    {
      id: "2",
      user: "Maria Garcia",
      lastMessage: "I uploaded an image but it's not analyzing correctly.",
      time: "2m ago",
      unread: true,
    },
    {
      id: "3",
      user: "James Brown",
      lastMessage: "Thanks for the help with my project!",
      time: "1h ago",
      unread: false,
    },
    {
      id: "4",
      user: "Sophie Taylor",
      lastMessage: "Can we schedule a time to discuss the API integration?",
      time: "3h ago",
      unread: false,
    },
    {
      id: "5",
      user: "David Wilson",
      lastMessage: "The voice recognition didn't work as expected.",
      time: "5h ago",
      unread: false,
    },
  ];

  const flaggedMessages = [
    {
      id: "f1",
      user: "Anonymous User",
      message: "The system misunderstood my request about data analysis.",
      time: "2h ago",
      category: "Misinterpretation",
    },
    {
      id: "f2",
      user: "Jacob Martin",
      message: "Bot gave incorrect information about cloud computing services.",
      time: "1d ago",
      category: "Inaccurate Info",
    },
    {
      id: "f3",
      user: "Emma Roberts",
      message: "Voice message was not processed correctly multiple times.",
      time: "2d ago",
      category: "Voice Processing",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          Monitor conversations and review message history.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search messages..."
            className="pl-8"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button size="sm">
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="w-full max-w-md grid grid-cols-2">
          <TabsTrigger value="recent">Recent Conversations</TabsTrigger>
          <TabsTrigger value="flagged">Flagged Messages</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Conversations</CardTitle>
              <CardDescription>
                View and manage recent user interactions with the AI.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentConversations.map((convo) => (
                  <div
                    key={convo.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                          {convo.user.charAt(0)}
                        </div>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{convo.user}</h3>
                          {convo.unread && (
                            <Badge variant="default" className="rounded-full px-1">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px]">
                          {convo.lastMessage}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{convo.time}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                          <DropdownMenuItem>Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="flagged" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Flagged Messages</CardTitle>
              <CardDescription>
                Review messages that require attention or improvement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {flaggedMessages.map((message) => (
                  <div
                    key={message.id}
                    className="p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <div className="flex h-full w-full items-center justify-center bg-destructive text-destructive-foreground text-xs">
                            {message.user.charAt(0)}
                          </div>
                        </Avatar>
                        <h3 className="font-medium">{message.user}</h3>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        {message.category}
                      </Badge>
                    </div>
                    <p className="text-sm mb-2">{message.message}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{message.time}</span>
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
