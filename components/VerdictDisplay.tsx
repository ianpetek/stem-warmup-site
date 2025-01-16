import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Code, Award, Brain, HardDrive, Loader2 } from 'lucide-react'

interface VerdictData {
  language: string
  time_used_millis: number
  memory_used_megabytes: number
  verdict: string
  awarded_score: number
}

interface VerdictDisplayProps {
  data?: VerdictData
  error?: string
  evaluating: boolean
}

export function VerdictDisplay({ data, error, evaluating }: VerdictDisplayProps) {
  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-red-500">Greška</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Verdict</CardTitle>
      </CardHeader>
      <CardContent>
        {evaluating ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-lg font-medium">Evaluiranje...</p>
          </div>
        ) : data ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <VerdictItem icon={Code} label="Jezik" value={data.language} />
            <VerdictItem icon={Clock} label="Vrijeme (ms)" value={data.time_used_millis} />
            <VerdictItem icon={HardDrive} label="Memorija (MB)" value={data.memory_used_megabytes} />
            <VerdictItem icon={Brain} label="Verdict" value={data.verdict} />
            <VerdictItem icon={Award} label="Bodovi" value={data.awarded_score} />
          </div>
        ) : (
          <p className="text-center text-muted-foreground">Nema dostupnih podataka</p>
        )}
      </CardContent>
    </Card>
  )
}

interface VerdictItemProps {
  icon: React.ElementType
  label: string
  value: string | number
}

function VerdictItem({ icon: Icon, label, value }: VerdictItemProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-2">
      <Icon className="w-6 h-6 text-primary" />
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{label}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}
