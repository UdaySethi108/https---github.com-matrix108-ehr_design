"use client"

import type * as React from "react"
import { Area, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend, ComposedChart } from "recharts"

interface ChartProps {
  data: any[]
  children: React.ReactNode
}

export const Chart = ({ data, children }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
        {children}
      </ComposedChart>
    </ResponsiveContainer>
  )
}

interface ChartXAxisProps {
  dataKey: string
}

export const ChartXAxis = ({ dataKey }: ChartXAxisProps) => {
  return <XAxis dataKey={dataKey} />
}

type ChartYAxisProps = {}

export const ChartYAxis = (props: ChartYAxisProps) => {
  return <YAxis />
}

interface ChartLineProps {
  dataKey: string
  stroke: string
  strokeWidth?: number
  dot?: any
}

export const ChartLine = ({ dataKey, stroke, strokeWidth, dot }: ChartLineProps) => {
  return <Line type="monotone" dataKey={dataKey} stroke={stroke} strokeWidth={strokeWidth} dot={dot} />
}

interface ChartAreaProps {
  dataKey: string
  fill: string
  fillOpacity: number
}

export const ChartArea = ({ dataKey, fill, fillOpacity }: ChartAreaProps) => {
  return <Area type="monotone" dataKey={dataKey} fill={fill} fillOpacity={fillOpacity} />
}

type ChartGridProps = {}

export const ChartGrid = (props: ChartGridProps) => {
  return <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
}

type ChartTooltipProps = {}

export const ChartTooltip = (props: ChartTooltipProps) => {
  return <Tooltip />
}

type ChartTooltipContentProps = {}

export const ChartTooltipContent = (props: ChartTooltipContentProps) => {
  return null
}

type ChartLegendProps = {}

export const ChartLegend = ({ children }: { children: React.ReactNode }) => {
  return <Legend>{children}</Legend>
}

interface ChartLegendItemProps {
  name: string
  color: string
}

export const ChartLegendItem = ({ name, color }: ChartLegendItemProps) => {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
      <span style={{ display: "inline-block", width: "0.75rem", height: "0.75rem", backgroundColor: color }} />
      {name}
    </span>
  )
}

interface ChartContainerProps {
  children: React.ReactNode
}

export const ChartContainer = ({ children }: ChartContainerProps) => {
  return <>{children}</>
}
