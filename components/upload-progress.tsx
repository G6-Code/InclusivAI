import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface UploadProgressProps {
  progress: number
}

export function UploadProgress({ progress }: UploadProgressProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Upload Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress value={progress} aria-label={`Upload progress: ${progress}%`} />
          <p className="text-sm text-right text-muted-foreground">{progress}%</p>
        </div>
      </CardContent>
    </Card>
  )
}

