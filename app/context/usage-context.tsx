"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UsageContextType {
  creditsUsed: number;
  isSyncing: boolean;
}

const UsageContext = createContext<UsageContextType | undefined>(undefined);

export function UsageProvider({ children }: { children: React.ReactNode }) {
  // Starting mock balance for the pro agency
  const [creditsUsed, setCreditsUsed] = useState(12450); 

  // Simulation: Increment credits every 5 seconds to simulate bot work
  useEffect(() => {
    const interval = setInterval(() => {
      // Logic: Simulate background consumption (adds 1-5 credits)
      setCreditsUsed((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <UsageContext.Provider value={{ creditsUsed, isSyncing: false }}>
      {children}
    </UsageContext.Provider>
  );
}

export const useUsage = () => {
  const context = useContext(UsageContext);
  if (context === undefined) {
    throw new Error("useUsage must be used within a UsageProvider");
  }
  return context;
};