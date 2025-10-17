"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "./StatCard"
import { BookCheck, Clock, FileX, Library } from "lucide-react"
import { theses } from "@/lib/mock-data"

const departmentData = theses.reduce((acc, thesis) => {
  const dept = thesis.department;
  if (!acc[dept]) {
    acc[dept] = 0;
  }
  acc[dept]++;
  return acc;
}, {} as Record<string, number>);

const chartData = Object.keys(departmentData).map(dept => ({
  name: dept.split(' ').map(w => w[0]).join(''),
  total: departmentData[dept]
}));

export function AdminDashboard() {
  const totalSubmissions = theses.length;
  const approved = theses.filter(t => t.status === 'Approved').length;
  const pending = theses.filter(t => t.status !== 'Approved' && t.status !== 'Rejected').length;
  const rejected = theses.filter(t => t.status === 'Rejected').length;

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-4">
      <div className="grid gap-4 md:grid-cols-2 lg:col-span-2 xl:col-span-4 xl:grid-cols-4">
        <StatCard title="Total Submissions" value={totalSubmissions.toString()} icon={Library} description="All theses in the system." />
        <StatCard title="Approved" value={approved.toString()} icon={BookCheck} description="Fully approved theses." />
        <StatCard title="Pending Review" value={pending.toString()} icon={Clock} description="Theses awaiting action." />
        <StatCard title="Rejected" value={rejected.toString()} icon={FileX} description="Rejected thesis submissions." />
      </div>
      <div className="grid gap-4 md:gap-8 lg:col-span-2 xl:col-span-4">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Department-wise Distribution</CardTitle>
            <CardDescription>
              Total thesis submissions from each department.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
