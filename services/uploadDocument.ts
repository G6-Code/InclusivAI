export async function uploadDocumentToAzureBlobStorage(documentFile: File | null) {
    if (!documentFile) return
  
    const sasUrl = process.env.NEXT_PUBLIC_DOCUMENT_SAS_URL as string
    if (!sasUrl) throw new Error("Missing Azure Storage SAS URL for documents.")
  
    const response = await fetch(sasUrl, {
      method: "PUT",
      headers: { "x-ms-blob-type": "BlockBlob", "Content-Type": documentFile.type },
      body: documentFile,
    })
  
    if (!response.ok) throw new Error(`Upload failed: ${response.status}`)
  }
  