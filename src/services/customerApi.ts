
import { supabase } from "@/integrations/supabase/client";
import { CustomerSpend } from "./types";
import { mediaTypeMapping } from "./mediaTypes";

/**
 * Fetch top customers by media type
 */
export const fetchTopCustomersByMedia = async (mediaType: string, limit: number = 10): Promise<CustomerSpend[]> => {
  try {
    console.log(`Fetching top ${limit} customers for ${mediaType}...`);
    
    // Map the media type to its database representation if needed
    const dbMediaType = mediaTypeMapping[mediaType.toUpperCase()] || mediaType.toUpperCase();
    
    const { data, error } = await supabase
      .from('ad_spend')
      .select('customer, value')
      .eq('media_type', dbMediaType);
    
    if (error) {
      console.warn(`Error fetching customers for ${mediaType}:`, error);
      return [];
    }
    
    if (data && data.length > 0) {
      console.log(`Successfully fetched ${data.length} customer records for ${mediaType}`);
      
      // Properly aggregate values by customer
      const customerMap = new Map<string, number>();
      
      data.forEach(item => {
        const currentValue = customerMap.get(item.customer) || 0;
        customerMap.set(item.customer, currentValue + Number(item.value));
      });
      
      // Convert map to array
      const aggregatedCustomers = Array.from(customerMap.entries()).map(([customer, value]) => ({
        customer,
        value: Number(value),
        percentage: 0 // Will calculate after getting total
      }));
      
      // Calculate total spend for percentage calculation
      const totalSpend = aggregatedCustomers.reduce((acc, item) => acc + item.value, 0);
      
      // Sort by value (descending) and take top 'limit'
      return aggregatedCustomers
        .sort((a, b) => b.value - a.value)
        .slice(0, limit)
        .map(item => ({
          customer: item.customer,
          value: item.value,
          percentage: parseFloat(((item.value / totalSpend) * 100).toFixed(2))
        }));
    }
    
    return [];
  } catch (error) {
    console.error(`Error fetching top customers for ${mediaType}:`, error);
    return [];
  }
};
