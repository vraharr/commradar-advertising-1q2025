import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logVisit } from "@/services/visitTrackingService";

/**
 * Hook to track page visits
 * Should be used inside a component that's within the Router context
 */
export const useVisitTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Log visit whenever the route changes
    logVisit(location.pathname + location.search);
  }, [location.pathname, location.search]);
};
