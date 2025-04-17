"use client"

import { AlertTriangle, Heart, Lightbulb, Activity, Zap, ArrowRight, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DashboardShell } from "@/components/dashboard-shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for insights
const riskFactors = [
  {
    id: 1,
    title: "Heart Disease Risk",
    description: "Based on your family history and recent blood pressure readings",
    risk: "Moderate",
    score: 65,
    recommendations: [
      "Schedule a cardiac check-up in the next 3 months",
      "Consider reducing sodium intake",
      "Increase cardiovascular exercise to 150 minutes weekly",
    ],
    icon: Heart,
  },
  {
    id: 2,
    title: "Type 2 Diabetes Risk",
    description: "Based on your recent lab results and activity patterns",
    risk: "Low",
    score: 25,
    recommendations: [
      "Maintain current healthy diet",
      "Continue regular exercise routine",
      "Schedule routine blood work in 6 months",
    ],
    icon: Activity,
  },
  {
    id: 3,
    title: "Sleep Apnea Risk",
    description: "Based on your sleep patterns and reported symptoms",
    risk: "High",
    score: 85,
    recommendations: [
      "Consult with a sleep specialist",
      "Consider a sleep study",
      "Evaluate sleeping position and environment",
    ],
    icon: Zap,
  },
]

const alerts = [
  {
    id: 1,
    title: "Medication Reminder",
    description: "Your prescription for Lisinopril will expire in 7 days. Schedule a follow-up appointment.",
    severity: "medium",
  },
  {
    id: 2,
    title: "Unusual Heart Rate Pattern",
    description:
      "We've detected irregular heart rate patterns during your sleep. Consider discussing with your doctor.",
    severity: "high",
  },
  {
    id: 3,
    title: "Preventive Screening Due",
    description: "Based on your age and history, it's time for your annual preventive screening.",
    severity: "low",
  },
]

const preventiveCare = [
  {
    id: 1,
    title: "Annual Physical Examination",
    description: "Recommended based on your age and health profile",
    dueIn: "2 months",
  },
  {
    id: 2,
    title: "Cholesterol Screening",
    description: "Recommended based on your family history",
    dueIn: "3 weeks",
  },
  {
    id: 3,
    title: "Dental Check-up",
    description: "Regular preventive dental care",
    dueIn: "Overdue by 2 months",
  },
  {
    id: 4,
    title: "Eye Examination",
    description: "Recommended based on your screen time and previous prescriptions",
    dueIn: "5 months",
  },
]

export function HealthInsights() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Health Insights</h1>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Alerts & Notifications</h2>
        <div className="grid gap-4">
          {alerts.map((alert) => (
            <Alert
              key={alert.id}
              variant={alert.severity === "high" ? "destructive" : alert.severity === "medium" ? "default" : "outline"}
            >
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="flex items-center gap-2">
                {alert.title}
                {alert.severity === "high" && (
                  <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                    High Priority
                  </Badge>
                )}
              </AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
            </Alert>
          ))}
        </div>
      </div>

      <Tabs defaultValue="risk" className="w-full">
        <TabsList>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="preventive">Preventive Care</TabsTrigger>
        </TabsList>
        <TabsContent value="risk">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {riskFactors.map((factor) => (
              <Card key={factor.id} className="flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <factor.icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{factor.title}</CardTitle>
                    </div>
                    <Badge
                      variant={
                        factor.risk === "High" ? "destructive" : factor.risk === "Moderate" ? "default" : "outline"
                      }
                    >
                      {factor.risk} Risk
                    </Badge>
                  </div>
                  <CardDescription>{factor.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2 flex-1">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Risk Score</span>
                        <span className="font-medium">{factor.score}%</span>
                      </div>
                      <Progress value={factor.score} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Recommendations:</h4>
                      <ul className="text-sm space-y-1">
                        {factor.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <ThumbsUp className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View Detailed Analysis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="preventive">
          <div className="grid gap-4 md:grid-cols-2">
            {preventiveCare.map((item) => (
              <Card key={item.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <Badge
                      variant={item.dueIn.includes("Overdue") ? "destructive" : "outline"}
                      className={item.dueIn.includes("Overdue") ? "bg-destructive/10" : ""}
                    >
                      {item.dueIn}
                    </Badge>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Schedule Appointment
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Personalized Health Tips
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Based on your recent activity data:</h3>
                <p className="text-sm text-muted-foreground">
                  Your step count has decreased by 20% in the last two weeks. Consider setting a daily step goal and
                  taking short walking breaks throughout the day to improve cardiovascular health and energy levels.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Based on your sleep patterns:</h3>
                <p className="text-sm text-muted-foreground">
                  Your sleep quality could be improved. Try maintaining a consistent sleep schedule, reducing screen
                  time before bed, and creating a relaxing bedtime routine to enhance sleep quality.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Based on your health records:</h3>
                <p className="text-sm text-muted-foreground">
                  Your vitamin D levels were slightly below optimal range in your last lab test. Consider spending more
                  time outdoors in natural sunlight or discussing supplements with your healthcare provider.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
