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

export interface PivotRow {
  media_group: string;
  [mediaType: string]: number | string; // Dynamic columns for each media type
  grand_total: number;
}

export interface PivotData {
  rows: PivotRow[];
  mediaTypes: string[];
  columnTotals: { [key: string]: number };
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
 * Get pivot table data - media groups as rows, media types as columns
 */
export const getPivotData = (data: GroupDataRow[]): PivotData => {
  // Get unique media types
  const mediaTypesSet = new Set<string>();
  data.forEach((row) => {
    if (row.media_type) mediaTypesSet.add(row.media_type);
  });
  const mediaTypes = Array.from(mediaTypesSet).sort();

  // Build pivot data
  const groupMap = new Map<string, PivotRow>();
  
  data.forEach((row) => {
    if (!row.media_group) return;
    
    if (!groupMap.has(row.media_group)) {
      const newRow: PivotRow = { 
        media_group: row.media_group, 
        grand_total: 0 
      };
      mediaTypes.forEach(mt => { newRow[mt] = 0; });
      groupMap.set(row.media_group, newRow);
    }
    
    const pivotRow = groupMap.get(row.media_group)!;
    if (row.media_type && row.amount) {
      pivotRow[row.media_type] = (pivotRow[row.media_type] as number || 0) + row.amount;
      pivotRow.grand_total += row.amount;
    }
  });

  // Calculate column totals
  const columnTotals: { [key: string]: number } = { grand_total: 0 };
  mediaTypes.forEach(mt => { columnTotals[mt] = 0; });
  
  groupMap.forEach((row) => {
    mediaTypes.forEach(mt => {
      columnTotals[mt] += (row[mt] as number) || 0;
    });
    columnTotals.grand_total += row.grand_total;
  });

  // Sort by grand total descending
  const rows = Array.from(groupMap.values()).sort((a, b) => b.grand_total - a.grand_total);

  return { rows, mediaTypes, columnTotals };
};

/**
 * Format currency value
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
