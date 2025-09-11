
import { supabase } from "@/integrations/supabase/client";
import { MediaExpenditure } from "./types";
import { MOCK_MEDIA_EXPENDITURES } from "./mockData";

// Re-export all types and functions from the new utility files
export { formatCurrency } from "./formatters";
export { getTotalExpenditure, getMediaCategoryData, getAllMediaData } from "./mediaAnalytics";
export { fetchTopCustomersByMedia } from "./customerApi";
export type { MediaExpenditure, CustomerSpend } from "./types";

/**
 * Fetch media expenditures from Supabase or fallback to mock data
 */
export const fetchMediaExpenditures = async (): Promise<MediaExpenditure[]> => {
  try {
    console.log("Fetching media expenditures...");
    
    // Try to fetch from Supabase first
    try {
      const { data, error } = await supabase
        .from('media_expenditure')
        .select('*')
        .order('expenditure_2025', { ascending: false });
      
      if (error) {
        console.warn("Supabase query error, using mock data instead:", error);
        return MOCK_MEDIA_EXPENDITURES.sort((a, b) => b.expenditure_2025 - a.expenditure_2025);
      }
      
      if (data && data.length > 0) {
        console.log("Successfully fetched data from Supabase");
        return data;
      } else {
        console.warn("No data from Supabase, using mock data instead");
        return MOCK_MEDIA_EXPENDITURES.sort((a, b) => b.expenditure_2025 - a.expenditure_2025);
      }
    } catch (supabaseError) {
      console.warn("Supabase client error, using mock data instead:", supabaseError);
      return MOCK_MEDIA_EXPENDITURES.sort((a, b) => b.expenditure_2025 - a.expenditure_2025);
    }
  } catch (error: any) {
    console.error("Unexpected error in fetchMediaExpenditures:", error);
    // Always return mock data as fallback to ensure the UI can render
    return MOCK_MEDIA_EXPENDITURES.sort((a, b) => b.expenditure_2025 - a.expenditure_2025);
  }
};
