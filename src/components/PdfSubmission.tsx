
import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface PdfSubmissionProps {
  assignmentId: string;
  assignmentTitle: string;
}

const PdfSubmission: React.FC<PdfSubmissionProps> = ({ assignmentId, assignmentTitle }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      return;
    }
    
    // Check if file is PDF
    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed');
      return;
    }
    
    // Check file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size should not exceed 10MB');
      return;
    }
    
    setSelectedFile(file);
  };
  
  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error('Please select a PDF file first');
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload with progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(i);
    }
    
    // In a real application, you would upload the file to your server here
    // const formData = new FormData();
    // formData.append('file', selectedFile);
    // formData.append('assignmentId', assignmentId);
    // const response = await fetch('/api/submit-assignment', { method: 'POST', body: formData });
    
    // For demo purposes, we'll just simulate a successful upload
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast.success('Assignment submitted successfully');
    setIsUploading(false);
    setUploadProgress(0);
    setSelectedFile(null);
  };
  
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-base font-medium mb-3">Submit PDF for: {assignmentTitle}</h3>
      
      {selectedFile ? (
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-md mb-3 text-sm">
          <FileText size={16} className="text-blue-600" />
          <span className="flex-1 truncate">{selectedFile.name}</span>
          <span className="text-xs text-gray-500">
            {(selectedFile.size / 1024).toFixed(0)} KB
          </span>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 mb-3 text-center">
          <input
            type="file"
            id={`file-upload-${assignmentId}`}
            className="hidden"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          <label
            htmlFor={`file-upload-${assignmentId}`}
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <Upload size={24} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Click to select PDF</span>
            <span className="text-xs text-gray-500">Max size: 10MB</span>
          </label>
        </div>
      )}
      
      {isUploading && (
        <div className="mb-3">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-xs text-center mt-1 text-gray-500">
            Uploading: {uploadProgress}%
          </p>
        </div>
      )}
      
      <div className="flex gap-2">
        {selectedFile && !isUploading && (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSelectedFile(null)}
              className="flex-1"
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSubmit}
              className="flex-1"
              disabled={isUploading}
            >
              <Upload size={16} className="mr-1" />
              Submit
            </Button>
          </>
        )}
        
        {!selectedFile && !isUploading && (
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={() => document.getElementById(`file-upload-${assignmentId}`)?.click()}
          >
            <Upload size={16} className="mr-1" />
            Select PDF
          </Button>
        )}
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        <p className="flex items-center">
          <AlertCircle size={12} className="mr-1" />
          Only PDF files are accepted
        </p>
      </div>
    </div>
  );
};

export default PdfSubmission;
