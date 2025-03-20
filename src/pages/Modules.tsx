
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { moodleApi, Module } from '@/services/moodleApi';
import NavBar from '@/components/NavBar';
import ModuleRoadmap from '@/components/ModuleRoadmap';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Modules = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // If no user, redirect to login
    if (!user) {
      navigate('/', { replace: true });
      return;
    }

    loadModules();
  }, [user, navigate]);

  const loadModules = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const data = await moodleApi.getModules(user.token);
      setModules(data);
      
      // Set first module as selected
      if (data.length > 0) {
        setSelectedModule(data[0]);
      }
    } catch (error) {
      console.error('Failed to load modules:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 page-transition">
      <NavBar />
      
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold">Modules</h1>
            <p className="text-muted-foreground mt-1">
              Browse and explore your enrolled modules
            </p>
          </header>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 size={36} className="animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading your modules...</p>
            </div>
          ) : modules.length > 0 ? (
            <Tabs 
              defaultValue={modules[0]?.id} 
              className="animate-slide-in"
              onValueChange={(value) => {
                const selected = modules.find(m => m.id === value);
                if (selected) setSelectedModule(selected);
              }}
            >
              <TabsList className="mb-8 bg-white/70 backdrop-blur-sm p-1 rounded-full w-full max-w-md mx-auto flex">
                {modules.map((module) => (
                  <TabsTrigger 
                    key={module.id} 
                    value={module.id}
                    className="flex-1 rounded-full py-2.5"
                  >
                    {module.code}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {modules.map((module) => (
                <TabsContent key={module.id} value={module.id} className="focus-visible:outline-none focus-visible:ring-0">
                  {selectedModule && selectedModule.id === module.id && (
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm">
                      <ModuleRoadmap module={module} />
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="text-center py-16 bg-white/50 rounded-xl border border-gray-100">
              <h3 className="text-xl font-medium mb-2">No Modules Found</h3>
              <p className="text-muted-foreground">
                You're not enrolled in any modules at the moment.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Modules;
