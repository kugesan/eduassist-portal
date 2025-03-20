
import React, { useState, useEffect } from 'react';
import { aiService } from '@/services/aiService';
import { Module } from '@/services/moodleApi';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, BookOpen, CheckCircle } from 'lucide-react';

interface ModuleRoadmapProps {
  module: Module;
}

interface RoadmapItem {
  week: number;
  topic: string;
  description: string;
}

const ModuleRoadmap: React.FC<ModuleRoadmapProps> = ({ module }) => {
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentWeek, setCurrentWeek] = useState<number>(5); // Mock current week

  useEffect(() => {
    const loadRoadmap = async () => {
      setIsLoading(true);
      try {
        const result = await aiService.generateModuleRoadmap(
          module.description, 
          module.name
        );
        setRoadmap(result);
      } catch (error) {
        console.error('Failed to generate roadmap:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRoadmap();
  }, [module]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 size={36} className="animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Generating module roadmap...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-blue-800">{module.name}</h2>
        <p className="text-blue-600 mt-2">{module.code}</p>
        <p className="mt-4 text-gray-700">{module.description}</p>
      </div>
      
      <div className="relative">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <BookOpen size={20} className="mr-2 text-primary" />
          Module Roadmap
        </h3>
        
        <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gray-200 z-0"></div>
        
        <div className="space-y-6 relative z-10">
          {roadmap.map((item) => (
            <div key={item.week} className="ml-0 flex">
              <div className="relative">
                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-full 
                  ${item.week < currentWeek 
                    ? 'bg-green-100 text-green-600' 
                    : item.week === currentWeek 
                      ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-400' 
                      : 'bg-gray-100 text-gray-500'
                  }
                  transition-all duration-300
                `}>
                  {item.week < currentWeek ? (
                    <CheckCircle size={20} />
                  ) : (
                    <span className="font-semibold">{item.week}</span>
                  )}
                </div>
              </div>
              
              <Card className={`
                flex-1 ml-4 transition-all duration-300 
                ${item.week < currentWeek 
                  ? 'opacity-75' 
                  : item.week === currentWeek 
                    ? 'ring-2 ring-blue-200 shadow-md' 
                    : 'hover:shadow-md'
                }
              `}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-lg">{item.topic}</h4>
                    <Badge 
                      variant="outline" 
                      className={
                        item.week < currentWeek 
                          ? 'bg-green-50 text-green-700 border-green-100' 
                          : item.week === currentWeek 
                            ? 'bg-blue-50 text-blue-700 border-blue-100' 
                            : 'bg-gray-50 text-gray-700 border-gray-100'
                      }
                    >
                      Week {item.week}
                    </Badge>
                  </div>
                  <Separator className="my-2" />
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModuleRoadmap;
