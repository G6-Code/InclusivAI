import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface FormSelectorProps {
  selectedForms: string[]
  setSelectedForms: (forms: string[]) => void
}

const AVAILABLE_FORMS = [
  { id: "0009", name: "Positive Personal Profile Summary" },
  { id: "0010", name: "Supported Employment Initial Placement Information Report" },
  { id: "0011", name: "Job Coaching Progress Report - Day 30" },
  { id: "0012", name: "Job Coaching Progress Report" },
  { id: "0013", name: "Supported Employment Job Stabilization Progress Report" },
  { id: "0014", name: "Supported Employment Letter of Commitment" },
  { id: "0015", name: "Trial Work Evaluation Report (TWER)" },
  { id: "0016", name: "Plan of Extended Services and Support" },
]

export function FormSelector({ selectedForms, setSelectedForms }: FormSelectorProps) {
  const handleFormChange = (formId: string, checked: boolean) => {
    if (checked) {
      setSelectedForms([...selectedForms, formId])
    } else {
      setSelectedForms(selectedForms.filter((id) => id !== formId))
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold border-b pb-2">
        Select Form Types <span className="text-destructive">*</span>
      </h2>
      <p className="text-sm text-muted-foreground mb-2">Select one or more forms for transcription</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {AVAILABLE_FORMS.map((form) => (
          <div
            key={form.id}
            className="flex items-start space-x-2 border rounded-md p-3 hover:bg-accent transition-colors"
          >
            <Checkbox
              id={`form-${form.id}`}
              checked={selectedForms.includes(form.id)}
              onCheckedChange={(checked) => handleFormChange(form.id, checked as boolean)}
              aria-labelledby={`label-${form.id}`}
            />
            <Label htmlFor={`form-${form.id}`} id={`label-${form.id}`} className="text-sm leading-tight cursor-pointer">
              <span className="font-medium">{form.id}</span> - {form.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}

