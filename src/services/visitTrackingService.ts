import { supabase } from "@/integrations/supabase/client";
import Cookies from "js-cookie";

const EMAIL_ACCESS_COOKIE = "email_access_verified";
const USER_EMAIL_COOKIE = "user_email";

/**
 * Get client IP address using a simple API service
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
 * Get stored user email from cookie
 */
export const getStoredEmail = (): string | null => {
  return Cookies.get(USER_EMAIL_COOKIE) || null;
};

/**
 * Store user email in cookie for visit tracking
 */
export const storeUserEmail = (email: string): void => {
  Cookies.set(USER_EMAIL_COOKIE, email.toLowerCase().trim(), {
    expires: 30,
    sameSite: "strict",
    secure: window.location.protocol === "https:"
  });
};

/**
 * Check if user has verified email access
 */
export const isVerifiedUser = (): boolean => {
  return Cookies.get(EMAIL_ACCESS_COOKIE) === "true";
};

/**
 * Log a visit to the visits table
 */
export const logVisit = async (pageUrl: string): Promise<void> => {
  // Only log visits for verified users
  if (!isVerifiedUser()) {
    return;
  }

  const email = getStoredEmail();
  if (!email) {
    console.warn("No email found for visit tracking");
    return;
  }

  try {
    const ipAddress = await getClientIpAddress();

    const { error } = await supabase
      .from("visits")
      .insert([
        {
          email,
          page_url: pageUrl,
          ip_address: ipAddress
        }
      ]);

    if (error) {
      console.error("Error logging visit:", error);
    }
  } catch (error) {
    console.error("Error in logVisit:", error);
  }
};
