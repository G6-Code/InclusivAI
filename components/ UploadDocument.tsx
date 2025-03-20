import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { uploadDocumentToAzureBlobStorage } from "@/services/uploadDocument"

interface UploadDocumentProps {
  documentFile: File | null
  setDocumentFile: (file: File | null) => void
}

export function UploadDocument({ documentFile, setDocumentFile }: UploadDocumentProps) {
  const { toast } = useToast()

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDocumentFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!documentFile) return

    try {
      await uploadDocumentToAzureBlobStorage(documentFile)
      toast({ title: "Upload Successful", description: "Document uploaded to Azure Blob Storage." })
    } catch (error) {
      toast({ title: "Upload Failed", description: "Error uploading document.", variant: "destructive" })
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="documentUpload" className="text-base">
        Upload Document
      </Label>
      <Input id="documentUpload" type="file" accept=".pdf,.doc,.docx" onChange={handleDocumentChange} />
      {documentFile && <p className="text-sm text-muted-foreground">Selected: {documentFile.name}</p>}
      <Button type="button" className="mt-2" onClick={handleUpload} disabled={!documentFile}>
        Upload Document
      </Button>
    </div>
  )
}
