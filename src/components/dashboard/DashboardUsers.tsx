
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MoreHorizontal, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardUsers() {
  // Sample data - in a real app, this would come from an API
  const users = [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      status: "active",
      lastActive: "Just now",
      conversations: 24,
    },
    {
      id: "2",
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      status: "active",
      lastActive: "5m ago",
      conversations: 17,
    },
    {
      id: "3",
      name: "James Brown",
      email: "james.brown@example.com",
      status: "idle",
      lastActive: "2h ago",
      conversations: 32,
    },
    {
      id: "4",
      name: "Sophie Taylor",
      email: "sophie.taylor@example.com",
      status: "offline",
      lastActive: "1d ago",
      conversations: 8,
    },
    {
      id: "5",
      name: "David Wilson",
      email: "david.wilson@example.com",
      status: "active",
      lastActive: "30m ago",
      conversations: 21,
    },
    {
      id: "6",
      name: "Emma Roberts",
      email: "emma.roberts@example.com",
      status: "offline",
      lastActive: "3d ago",
      conversations: 15,
    },
  ];

  const userStats = [
    {
      title: "Total Users",
      value: "2,543",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Active Today",
      value: "847",
      change: "+5%",
      changeType: "positive",
    },
    {
      title: "New This Week",
      value: "128",
      change: "-3%",
      changeType: "negative",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">
          Manage users and view their interaction with the AI assistant.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {userStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs flex items-center mt-1 ${
                stat.changeType === "positive" ? "text-green-500" : "text-red-500"
              }`}>
                {stat.change}
                <span className="text-muted-foreground ml-1">vs last period</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="offline">Offline</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Conversations</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                            {user.name.charAt(0)}
                          </div>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.status === "active"
                              ? "default"
                              : user.status === "idle"
                              ? "outline"
                              : "secondary"
                          }
                          className="capitalize"
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell>{user.conversations}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Chat History</DropdownMenuItem>
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Suspend User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  View of active users would appear here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="offline" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  View of offline users would appear here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
