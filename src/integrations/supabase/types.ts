export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ad_spend: {
        Row: {
          category: string | null
          customer: string
          date: string
          id: number
          media_type: string
          product: string | null
          sector: string | null
          value: number
        }
        Insert: {
          category?: string | null
          customer: string
          date: string
          id?: number
          media_type: string
          product?: string | null
          sector?: string | null
          value: number
        }
        Update: {
          category?: string | null
          customer?: string
          date?: string
          id?: number
          media_type?: string
          product?: string | null
          sector?: string | null
          value?: number
        }
        Relationships: []
      }
      customer_media_percentages: {
        Row: {
          customer: string
          mg_pct: number | null
          outdoor_pct: number | null
          pa_pct: number | null
          percentage_change: number | null
          radio_pct: number | null
          "total 2025": number | null
          tv_pct: number | null
          web_pct: number | null
        }
        Insert: {
          customer: string
          mg_pct?: number | null
          outdoor_pct?: number | null
          pa_pct?: number | null
          percentage_change?: number | null
          radio_pct?: number | null
          "total 2025"?: number | null
          tv_pct?: number | null
          web_pct?: number | null
        }
        Update: {
          customer?: string
          mg_pct?: number | null
          outdoor_pct?: number | null
          pa_pct?: number | null
          percentage_change?: number | null
          radio_pct?: number | null
          "total 2025"?: number | null
          tv_pct?: number | null
          web_pct?: number | null
        }
        Relationships: []
      }
      email_access: {
        Row: {
          created_at: string | null
          email: string
          id: number
          ip_address: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: number
          ip_address?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: number
          ip_address?: string | null
        }
        Relationships: []
      }
      media_expenditure: {
        Row: {
          created_at: string | null
          expenditure_2024: number
          expenditure_2025: number
          id: string
          medium: string
          percentage_change: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          expenditure_2024: number
          expenditure_2025: number
          id?: string
          medium: string
          percentage_change: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          expenditure_2024?: number
          expenditure_2025?: number
          id?: string
          medium?: string
          percentage_change?: number
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      ad_summary_view: {
        Row: {
          customer: string | null
          date: string | null
          media_type: string | null
          product: string | null
          value: number | null
        }
        Insert: {
          customer?: string | null
          date?: string | null
          media_type?: string | null
          product?: string | null
          value?: number | null
        }
        Update: {
          customer?: string | null
          date?: string | null
          media_type?: string | null
          product?: string | null
          value?: number | null
        }
        Relationships: []
      }
      top_advertisers_q1_2025: {
        Row: {
          customer: string | null
          "Grand Total": number | null
          mg: number | null
          outdoor: number | null
          pa: number | null
          radio: number | null
          tv: number | null
          web: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
