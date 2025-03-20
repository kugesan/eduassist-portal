
import React, { useState } from 'react';
import { HelpCircle, X, Loader2 } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { aiService } from '@/services/aiService';

interface ExplainButtonProps {
  assignmentTitle: string;
  assignmentDescription: string;
}

const ExplainButton: React.FC<ExplainButtonProps> = ({ 
  assignmentTitle, 
  assignmentDescription 
}) => {
  const [explanation, setExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleExplain = async () => {
    if (!isOpen) return;
    
    setIsLoading(true);
    try {
      const result = await aiService.explainAssignment(
        assignmentTitle, 
        assignmentDescription
      );
      setExplanation(result);
    } catch (error) {
      console.error('Failed to explain assignment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full bg-blue-50 text-primary border-blue-100 hover:bg-blue-100 hover:text-primary"
        >
          <HelpCircle size={14} className="mr-1.5" />
          Explain
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-medium">
            AI Explanation: {assignmentTitle}
          </DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
              <X size={16} />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        
        <div className="py-2">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 size={36} className="animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Generating explanation...</p>
            </div>
          ) : explanation ? (
            <div className="prose prose-blue max-w-none">
              <div dangerouslySetInnerHTML={{ __html: explanation.replace(/\n/g, '<br />') }} />
            </div>
          ) : (
            <div className="text-center py-8">
              <Button onClick={handleExplain} variant="default">
                Generate Explanation
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExplainButton;
