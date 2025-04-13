
import { supabase } from "@/integrations/supabase/client";
import Cookies from "js-cookie";

const EMAIL_ACCESS_COOKIE = "email_access_verified";
const COOKIE_EXPIRY_DAYS = 30;

/**
 * Checks if user has previously verified email access
 * @returns boolean indicating if access is granted
 */
export const hasEmailAccess = (): boolean => {
  return Cookies.get(EMAIL_ACCESS_COOKIE) === "true";
};

/**
 * Set email access cookie for future visits
 */
export const setEmailAccessCookie = (): void => {
  Cookies.set(EMAIL_ACCESS_COOKIE, "true", { 
    expires: COOKIE_EXPIRY_DAYS, 
    sameSite: "strict",
    secure: window.location.protocol === "https:"
  });
};

/**
 * Clears email access cookie (for testing/logout)
 */
export const clearEmailAccessCookie = (): void => {
  Cookies.remove(EMAIL_ACCESS_COOKIE);
};

/**
 * Get client IP address using a simple API service
 * @returns IP address string or null if unable to retrieve
 */
const getClientIpAddress = async (): Promise<string | null> => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Failed to get IP address:", error);
    return null;
  }
};

/**
 * Check if email exists and store it in Supabase if it's new
 * @param email User's email address
 * @returns boolean indicating if operation was successful
 */
export const checkAndStoreEmail = async (email: string): Promise<boolean> => {
  try {
    const ipAddress = await getClientIpAddress();
    
    const { error } = await supabase
      .from("email_access")
      .insert([
        {
          email: email.toLowerCase().trim(),
          ip_address: ipAddress
        }
      ]);
    
    if (error && error.code !== "23505") { // Not a unique constraint error
      console.error("Error storing email:", error);
      return false;
    }
    
    // Set cookie for future access
    setEmailAccessCookie();
    return true;
  } catch (error) {
    console.error("Error in checkAndStoreEmail:", error);
    return false;
  }
};
