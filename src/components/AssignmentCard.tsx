
import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ExplainButton from './ExplainButton';
import PdfSubmission from './PdfSubmission';
import { Assignment } from '@/services/moodleApi';
import { format, isPast, isToday, isTomorrow } from 'date-fns';

interface AssignmentCardProps {
  assignment: Assignment;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment }) => {
  const [showSubmission, setShowSubmission] = useState(false);
  const dueDate = new Date(assignment.dueDate);
  const isPastDue = isPast(dueDate) && !isToday(dueDate);
  
  // Determine due date status
  const getDueDateStatus = () => {
    if (isPastDue) {
      return { color: 'destructive', text: 'Past Due' };
    }
    if (isToday(dueDate)) {
      return { color: 'orange', text: 'Due Today' };
    }
    if (isTomorrow(dueDate)) {
      return { color: 'yellow', text: 'Due Tomorrow' };
    }
    
    const daysUntilDue = Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    if (daysUntilDue <= 3) {
      return { color: 'blue', text: `Due in ${daysUntilDue} days` };
    }
    
    return { color: 'green', text: format(dueDate, 'MMM d') };
  };
  
  const dueDateStatus = getDueDateStatus();
  
  return (
    <Card className={`overflow-hidden transition-all duration-300 ${isPastDue ? 'opacity-70' : 'card-hover'}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-100">
            {assignment.courseName}
          </Badge>
          <Badge 
            variant={dueDateStatus.color === 'destructive' ? 'destructive' : 'outline'} 
            className={
              dueDateStatus.color !== 'destructive' 
                ? `bg-${dueDateStatus.color}-50 text-${dueDateStatus.color}-800 border-${dueDateStatus.color}-100` 
                : ''
            }
          >
            <Calendar size={12} className="mr-1" />
            {dueDateStatus.text}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-2">{assignment.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {assignment.description}
        </p>
      </CardContent>
      <CardFooter className="pt-0 flex flex-col w-full">
        <div className="flex justify-between w-full mb-2">
          <ExplainButton 
            assignmentTitle={assignment.title} 
            assignmentDescription={assignment.description} 
          />
          
          <button 
            onClick={() => setShowSubmission(!showSubmission)}
            className="flex items-center text-sm text-primary hover:underline"
          >
            {showSubmission ? (
              <>
                Hide Submission <ChevronUp size={14} className="ml-1" />
              </>
            ) : (
              <>
                Submit PDF <ChevronDown size={14} className="ml-1" />
              </>
            )}
          </button>
        </div>
        
        {showSubmission && (
          <div className="w-full mt-2">
            <PdfSubmission 
              assignmentId={assignment.id} 
              assignmentTitle={assignment.title} 
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default AssignmentCard;
