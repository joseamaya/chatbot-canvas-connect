
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, FileText, Info, ArrowUpRight, Clock, Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function DashboardGeneral() {
  // Sample data - in a real app, this would come from an API
  const stats = [
    {
      title: "Total Messages",
      value: "5,231",
      icon: <MessageSquare className="h-5 w-5" />,
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Active Users",
      value: "1,234",
      icon: <Users className="h-5 w-5" />,
      change: "+5%",
      changeType: "positive",
    },
    {
      title: "Response Time",
      value: "1.2s",
      icon: <Clock className="h-5 w-5" />,
      change: "-0.3s",
      changeType: "positive",
    },
    {
      title: "Accuracy Rate",
      value: "94%",
      icon: <Activity className="h-5 w-5" />,
      change: "+2%",
      changeType: "positive",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Monitor and manage your AI chatbot performance and configuration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs flex items-center mt-1 ${
                stat.changeType === "positive" ? "text-green-500" : "text-red-500"
              }`}>
                {stat.change}
                {stat.changeType === "positive" ? (
                  <ArrowUpRight className="h-3 w-3 ml-1" />
                ) : (
                  <ArrowUpRight className="h-3 w-3 ml-1 rotate-180" />
                )}
                <span className="text-muted-foreground ml-1">vs last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Usage Analytics</CardTitle>
            <CardDescription>
              Message volume and user engagement over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
              <div className="text-muted-foreground flex flex-col items-center">
                <FileText className="h-10 w-10 mb-2" />
                <p>Analytics chart would display here</p>
                <p className="text-sm">(Simulated placeholder)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Current system performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>CPU Usage</span>
                <span className="text-muted-foreground">28%</span>
              </div>
              <Progress value={28} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Memory Usage</span>
                <span className="text-muted-foreground">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>API Requests</span>
                <span className="text-muted-foreground">62%</span>
              </div>
              <Progress value={62} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Storage</span>
                <span className="text-muted-foreground">17%</span>
              </div>
              <Progress value={17} className="h-2" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              <Info className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
