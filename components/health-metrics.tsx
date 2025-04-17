"use client"

import { Heart, Moon, Footprints } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardShell } from "@/components/dashboard-shell"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartXAxis,
  ChartYAxis,
  ChartLine,
  ChartArea,
  ChartGrid,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"

// Sample data for charts
const heartRateData = [
  { date: "2025-03-01", value: 72 },
  { date: "2025-03-02", value: 75 },
  { date: "2025-03-03", value: 68 },
  { date: "2025-03-04", value: 70 },
  { date: "2025-03-05", value: 73 },
  { date: "2025-03-06", value: 71 },
  { date: "2025-03-07", value: 69 },
]

const sleepData = [
  { date: "2025-03-01", value: 7.5 },
  { date: "2025-03-02", value: 6.8 },
  { date: "2025-03-03", value: 8.2 },
  { date: "2025-03-04", value: 7.1 },
  { date: "2025-03-05", value: 7.8 },
  { date: "2025-03-06", value: 6.5 },
  { date: "2025-03-07", value: 7.3 },
]

const stepsData = [
  { date: "2025-03-01", value: 8432 },
  { date: "2025-03-02", value: 7621 },
  { date: "2025-03-03", value: 10254 },
  { date: "2025-03-04", value: 6543 },
  { date: "2025-03-05", value: 9876 },
  { date: "2025-03-06", value: 7654 },
  { date: "2025-03-07", value: 8765 },
]

export function HealthMetrics() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Health Metrics</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
            <Heart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72 BPM</div>
            <p className="text-xs text-muted-foreground">Average over last 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sleep</CardTitle>
            <Moon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.3 hrs</div>
            <p className="text-xs text-muted-foreground">Average over last 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Steps</CardTitle>
            <Footprints className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,449</div>
            <p className="text-xs text-muted-foreground">Average over last 7 days</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="heart-rate" className="w-full">
        <TabsList>
          <TabsTrigger value="heart-rate">Heart Rate</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
          <TabsTrigger value="steps">Steps</TabsTrigger>
        </TabsList>
        <TabsContent value="heart-rate">
          <Card>
            <CardHeader>
              <CardTitle>Heart Rate</CardTitle>
              <CardDescription>Your heart rate over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <Chart data={heartRateData}>
                <ChartContainer>
                  <ChartGrid />
                  <ChartYAxis />
                  <ChartXAxis dataKey="date" />
                  <ChartLine dataKey="value" stroke="#1e3e63" strokeWidth={2} dot={{ fill: "#1e3e63" }} />
                  <ChartArea dataKey="value" fill="#1e3e63" fillOpacity={0.1} />
                  <ChartTooltip>
                    <ChartTooltipContent />
                  </ChartTooltip>
                  <ChartLegend>
                    <ChartLegendItem name="Heart Rate (BPM)" color="#1e3e63" />
                  </ChartLegend>
                </ChartContainer>
              </Chart>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sleep">
          <Card>
            <CardHeader>
              <CardTitle>Sleep</CardTitle>
              <CardDescription>Your sleep duration over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <Chart data={sleepData}>
                <ChartContainer>
                  <ChartGrid />
                  <ChartYAxis />
                  <ChartXAxis dataKey="date" />
                  <ChartLine dataKey="value" stroke="#1e3e63" strokeWidth={2} dot={{ fill: "#1e3e63" }} />
                  <ChartArea dataKey="value" fill="#1e3e63" fillOpacity={0.1} />
                  <ChartTooltip>
                    <ChartTooltipContent />
                  </ChartTooltip>
                  <ChartLegend>
                    <ChartLegendItem name="Sleep (hours)" color="#1e3e63" />
                  </ChartLegend>
                </ChartContainer>
              </Chart>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="steps">
          <Card>
            <CardHeader>
              <CardTitle>Steps</CardTitle>
              <CardDescription>Your step count over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <Chart data={stepsData}>
                <ChartContainer>
                  <ChartGrid />
                  <ChartYAxis />
                  <ChartXAxis dataKey="date" />
                  <ChartLine dataKey="value" stroke="#1e3e63" strokeWidth={2} dot={{ fill: "#1e3e63" }} />
                  <ChartArea dataKey="value" fill="#1e3e63" fillOpacity={0.1} />
                  <ChartTooltip>
                    <ChartTooltipContent />
                  </ChartTooltip>
                  <ChartLegend>
                    <ChartLegendItem name="Steps" color="#1e3e63" />
                  </ChartLegend>
                </ChartContainer>
              </Chart>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
