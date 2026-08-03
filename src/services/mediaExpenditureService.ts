
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
        .order('exp_current_year', { ascending: false });
      
      if (error) {
        console.warn("Supabase query error, using mock data instead:", error);
        return MOCK_MEDIA_EXPENDITURES.sort((a, b) => b.expenditure_2025 - a.expenditure_2025);
      }
      
      if (data && data.length > 0) {
        console.log("Successfully fetched data from Supabase");
        // Map the new column names (H1 2026 = exp_current_year, H1 2025 = "exp_y-1")
        return (data as any[]).map((row) => {
          const current = Number(row.exp_current_year) || 0;
          const previous = Number(row["exp_y-1"]) || 0;
          const pct = row.percentage_change !== null && row.percentage_change !== undefined
            ? Number(row.percentage_change)
            : previous
              ? parseFloat((((current - previous) / previous) * 100).toFixed(2))
              : 0;
          return {
            id: row.id,
            medium: row.medium,
            expenditure_2025: current,
            expenditure_2024: previous,
            percentage_change: pct,
          };
        });
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
