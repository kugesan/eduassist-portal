
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { user, login, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnimating(true);
    await login(username, password);
    setIsAnimating(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700 mb-2">
            EduAssist
          </h1>
          <p className="text-gray-600">Your AI-powered learning companion</p>
        </div>
        
        <div className="glass-panel rounded-2xl p-8 animate-slide-in">
          <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Your Moodle username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Your Moodle password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
                disabled={isLoading}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full py-6" 
              disabled={isLoading || !username || !password}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Demo credentials: <br />
              Username: <span className="font-mono bg-gray-100 px-1 py-0.5 rounded">student</span> | 
              Password: <span className="font-mono bg-gray-100 px-1 py-0.5 rounded">password</span>
            </p>
          </div>
        </div>
        
        <div className="text-center mt-6 text-sm text-gray-500 animate-fade-in">
          <p>
            Connects with your Moodle account <br />
            for seamless learning assistance
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
