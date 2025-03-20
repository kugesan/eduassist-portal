
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { moodleApi, Assignment } from '@/services/moodleApi';
import NavBar from '@/components/NavBar';
import AssignmentCard from '@/components/AssignmentCard';
import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    // If no user, redirect to login
    if (!user) {
      navigate('/', { replace: true });
      return;
    }

    loadAssignments();
  }, [user, navigate]);

  const loadAssignments = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const data = await moodleApi.getUpcomingAssignments(user.token);
      // Sort by due date (ascending)
      const sortedAssignments = [...data].sort((a, b) => 
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
      setAssignments(sortedAssignments);
    } catch (error) {
      console.error('Failed to load assignments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadAssignments();
    setIsRefreshing(false);
  };

  // Group assignments by course
  const assignmentsByClass = assignments.reduce((acc, assignment) => {
    (acc[assignment.courseName] = acc[assignment.courseName] || []).push(assignment);
    return acc;
  }, {} as Record<string, Assignment[]>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 page-transition">
      <NavBar />
      
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-semibold">Dashboard</h1>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={isRefreshing || isLoading}
                className="rounded-full"
              >
                <RefreshCw size={16} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
            <p className="text-muted-foreground mt-1">
              Welcome back{user?.username ? `, ${user.username}` : ''}
            </p>
          </header>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 size={36} className="animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading your assignments...</p>
            </div>
          ) : assignments.length > 0 ? (
            <div className="space-y-10">
              {Object.entries(assignmentsByClass).map(([courseName, courseAssignments]) => (
                <section key={courseName} className="animate-slide-in">
                  <h2 className="text-xl font-medium mb-4 px-1">{courseName}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courseAssignments.map((assignment) => (
                      <AssignmentCard key={assignment.id} assignment={assignment} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/50 rounded-xl border border-gray-100">
              <h3 className="text-xl font-medium mb-2">No Upcoming Assignments</h3>
              <p className="text-muted-foreground mb-6">
                You're all caught up! There are no assignments due soon.
              </p>
              <Button onClick={handleRefresh} variant="outline">
                Check Again
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
