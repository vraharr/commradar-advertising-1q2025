
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { checkAndStoreEmail } from "@/services/emailAccessService";
import Image from "@/components/ui/image"; // We'll create this component

interface EmailGateProps {
  onAccessGranted: () => void;
}

const EmailGate = ({ onAccessGranted }: EmailGateProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const success = await checkAndStoreEmail(email);
      if (success) {
        toast.success("Access granted! Welcome to the dashboard.");
        onAccessGranted();
      } else {
        toast.error("There was an error processing your request. Please try again.");
      }
    } catch (error) {
      toast.error("There was an error processing your request. Please try again.");
      console.error("Email access error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="flex justify-center mb-6">
          <Image 
            src="/lovable-uploads/06a408e2-77ae-4ea7-b7f0-5cfd6579771c.png" 
            alt="CommRadar Logo" 
            className="h-20 w-auto"
          />
        </div>
        
        <p className="text-center text-gray-600 mb-6">
          Please enter your email address to access the advertising expenditure dashboard.
          <span className="block mt-2 text-sm font-medium">
            You'll only need to enter your email once.
          </span>
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your-email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full transition-all bg-[#003366] hover:bg-[#004477]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : "Access Dashboard"}
          </Button>

          <p className="text-xs text-center text-gray-500 mt-4">
            We'll remember your device so you won't need to enter your email again.
          </p>
        </form>
      </div>
    </div>
  );
};

export default EmailGate;
