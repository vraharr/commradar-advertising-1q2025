import { supabase } from "@/integrations/supabase/client";

export interface GroupDataRow {
  id: number;
  media_type: string | null;
  media_group: string | null;
  media_name: string | null;
  amount: number | null;
  created_at: string;
}

export interface MediaGroupSummary {
  media_group: string;
  media_type: string;
  total_amount: number;
}

/**
 * Fetch all group data from Supabase
 */
export const fetchGroupData = async (): Promise<GroupDataRow[]> => {
  const { data, error } = await supabase
    .from('Group Data')
    .select('*')
    .order('amount', { ascending: false });

  if (error) {
    console.error("Error fetching group data:", error);
    throw error;
  }

  return data || [];
};

/**
 * Get aggregated data by media group and media type
 */
export const getGroupSummaryByMediaType = (data: GroupDataRow[]): MediaGroupSummary[] => {
  const summaryMap = new Map<string, MediaGroupSummary>();

  data.forEach((row) => {
    if (!row.media_group || !row.media_type) return;
    
    const key = `${row.media_group}-${row.media_type}`;
    const existing = summaryMap.get(key);
    
    if (existing) {
      existing.total_amount += row.amount || 0;
    } else {
      summaryMap.set(key, {
        media_group: row.media_group,
        media_type: row.media_type,
        total_amount: row.amount || 0,
      });
    }
  });

  return Array.from(summaryMap.values()).sort((a, b) => b.total_amount - a.total_amount);
};

/**
 * Format currency value
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
