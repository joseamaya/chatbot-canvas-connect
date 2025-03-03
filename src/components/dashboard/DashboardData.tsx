
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Download, UploadCloud, MoreHorizontal, FileText, Database, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardData() {
  // Sample data - in a real app, this would come from an API
  const datasets = [
    {
      id: "1",
      name: "Training Conversations",
      size: "145 MB",
      records: "12,543",
      lastUpdated: "Today",
      category: "Conversations",
    },
    {
      id: "2",
      name: "User Interactions",
      size: "78 MB",
      records: "8,921",
      lastUpdated: "Yesterday",
      category: "Analytics",
    },
    {
      id: "3",
      name: "Knowledge Base",
      size: "256 MB",
      records: "5,231",
      lastUpdated: "3 days ago",
      category: "Knowledge",
    },
    {
      id: "4",
      name: "Image Recognition Data",
      size: "512 MB",
      records: "2,450",
      lastUpdated: "1 week ago",
      category: "Images",
    },
    {
      id: "5",
      name: "Voice Samples",
      size: "320 MB",
      records: "1,825",
      lastUpdated: "2 weeks ago",
      category: "Audio",
    },
  ];

  const recentOperations = [
    {
      id: "op1",
      operation: "Data Import",
      details: "Imported new conversation training data",
      timestamp: "2 hours ago",
      user: "Admin",
      status: "completed",
    },
    {
      id: "op2",
      operation: "Database Backup",
      details: "Weekly automated backup",
      timestamp: "1 day ago",
      user: "System",
      status: "completed",
    },
    {
      id: "op3",
      operation: "Data Export",
      details: "Exported user analytics for reporting",
      timestamp: "3 days ago",
      user: "Marketing Team",
      status: "completed",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Data Management</h1>
        <p className="text-muted-foreground">
          Manage training data, imports, exports, and knowledge bases.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search datasets..."
            className="pl-8"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <UploadCloud className="mr-2 h-4 w-4" />
            Import Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="datasets" className="w-full">
        <TabsList>
          <TabsTrigger value="datasets">Datasets</TabsTrigger>
          <TabsTrigger value="operations">Recent Operations</TabsTrigger>
          <TabsTrigger value="exports">Exports</TabsTrigger>
        </TabsList>
        <TabsContent value="datasets" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Datasets</CardTitle>
              <CardDescription>
                View and manage datasets used for training and operation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {datasets.map((dataset) => (
                  <div
                    key={dataset.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {dataset.category === "Conversations" && <MessageIcon className="h-5 w-5 text-primary" />}
                        {dataset.category === "Analytics" && <AnalyticsIcon className="h-5 w-5 text-primary" />}
                        {dataset.category === "Knowledge" && <KnowledgeIcon className="h-5 w-5 text-primary" />}
                        {dataset.category === "Images" && <ImagesIcon className="h-5 w-5 text-primary" />}
                        {dataset.category === "Audio" && <AudioIcon className="h-5 w-5 text-primary" />}
                      </div>
                      <div>
                        <h3 className="font-medium">{dataset.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{dataset.size}</span>
                          <span>•</span>
                          <span>{dataset.records} records</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-right">
                        <Badge variant="outline">{dataset.category}</Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          Updated {dataset.lastUpdated}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Download</DropdownMenuItem>
                          <DropdownMenuItem>Update</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="operations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Operations</CardTitle>
              <CardDescription>
                View history of recent data operations and processes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOperations.map((op) => (
                  <div
                    key={op.id}
                    className="p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{op.operation}</h3>
                      <Badge
                        variant={op.status === "completed" ? "outline" : "secondary"}
                        className="capitalize"
                      >
                        {op.status}
                      </Badge>
                    </div>
                    <p className="text-sm mb-2">{op.details}</p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>By: {op.user}</span>
                      <span>{op.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="exports" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Exports</CardTitle>
              <CardDescription>
                Create and download exports of your data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Conversation Export</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Export all conversation data for analysis or backup.
                      </p>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Export Conversations
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">User Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Export user activity and engagement metrics.
                      </p>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Export Analytics
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Need a custom data export? Contact support for assistance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Icon components for visual variety
function MessageIcon(props: React.SVGProps<SVGSVGElement>) {
  return <FileText {...props} />;
}

function AnalyticsIcon(props: React.SVGProps<SVGSVGElement>) {
  return <Database {...props} />;
}

function KnowledgeIcon(props: React.SVGProps<SVGSVGElement>) {
  return <FileText {...props} />;
}

function ImagesIcon(props: React.SVGProps<SVGSVGElement>) {
  return <FileText {...props} />;
}

function AudioIcon(props: React.SVGProps<SVGSVGElement>) {
  return <FileText {...props} />;
}
