export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
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
      betting_users: {
        Row: {
          created_at: string
          date: string | null
          email: string | null
          id: number
          time: string | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          email?: string | null
          id?: number
          time?: string | null
        }
        Update: {
          created_at?: string
          date?: string | null
          email?: string | null
          id?: number
          time?: string | null
        }
        Relationships: []
      }
      "Categories TV": {
        Row: {
          category: string | null
          "change %": string | null
          created_at: string
          id: number
          "station name": string | null
          "year 2024": number | null
          "year 2025": number | null
        }
        Insert: {
          category?: string | null
          "change %"?: string | null
          created_at?: string
          id?: number
          "station name"?: string | null
          "year 2024"?: number | null
          "year 2025"?: number | null
        }
        Update: {
          category?: string | null
          "change %"?: string | null
          created_at?: string
          id?: number
          "station name"?: string | null
          "year 2024"?: number | null
          "year 2025"?: number | null
        }
        Relationships: []
      }
      customer_media_percentages: {
        Row: {
          customer: string
          mg_pct: string | null
          outdoor_pct: string | null
          pa_pct: string | null
          percentage_change: string | null
          radio_pct: string | null
          "total 2025": number | null
          tv_pct: string | null
          web_pct: string | null
        }
        Insert: {
          customer: string
          mg_pct?: string | null
          outdoor_pct?: string | null
          pa_pct?: string | null
          percentage_change?: string | null
          radio_pct?: string | null
          "total 2025"?: number | null
          tv_pct?: string | null
          web_pct?: string | null
        }
        Update: {
          customer?: string
          mg_pct?: string | null
          outdoor_pct?: string | null
          pa_pct?: string | null
          percentage_change?: string | null
          radio_pct?: string | null
          "total 2025"?: number | null
          tv_pct?: string | null
          web_pct?: string | null
        }
        Relationships: []
      }
      email_access: {
        Row: {
          created_at: string | null
          email: string
          id: number
          ip_address: string | null
          page_visited: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: number
          ip_address?: string | null
          page_visited?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: number
          ip_address?: string | null
          page_visited?: string | null
        }
        Relationships: []
      }
      expenditure_weekly: {
        Row: {
          category: string | null
          created_at: string
          customer: string | null
          date: string | null
          id: number
          image_id: string | null
          media_name: string | null
          media_type: string | null
          product: string | null
          sector: string | null
          value: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          customer?: string | null
          date?: string | null
          id?: number
          image_id?: string | null
          media_name?: string | null
          media_type?: string | null
          product?: string | null
          sector?: string | null
          value?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string
          customer?: string | null
          date?: string | null
          id?: number
          image_id?: string | null
          media_name?: string | null
          media_type?: string | null
          product?: string | null
          sector?: string | null
          value?: number | null
        }
        Relationships: []
      }
      gameanalysis: {
        Row: {
          category: string | null
          created_at: string
          customer: string | null
          date: string | null
          duration: number | null
          event: string | null
          id: number
          media_name: string | null
          time: string | null
          type: string | null
          value: number | null
          web_url: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          customer?: string | null
          date?: string | null
          duration?: number | null
          event?: string | null
          id?: number
          media_name?: string | null
          time?: string | null
          type?: string | null
          value?: number | null
          web_url?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          customer?: string | null
          date?: string | null
          duration?: number | null
          event?: string | null
          id?: number
          media_name?: string | null
          time?: string | null
          type?: string | null
          value?: number | null
          web_url?: string | null
        }
        Relationships: []
      }
      "Group Data": {
        Row: {
          amount: number | null
          created_at: string
          id: number
          media_group: string | null
          media_name: string | null
          media_type: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          id?: number
          media_group?: string | null
          media_name?: string | null
          media_type?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          id?: number
          media_group?: string | null
          media_name?: string | null
          media_type?: string | null
        }
        Relationships: []
      }
      lidl_competition: {
        Row: {
          category: string | null
          created_at: string
          customer: string | null
          date: string | null
          duration: string | null
          id: number
          image_id: string | null
          media_name: string | null
          media_type: string | null
          placements: number | null
          product: string | null
          sector: string | null
          value: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          customer?: string | null
          date?: string | null
          duration?: string | null
          id?: number
          image_id?: string | null
          media_name?: string | null
          media_type?: string | null
          placements?: number | null
          product?: string | null
          sector?: string | null
          value?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string
          customer?: string | null
          date?: string | null
          duration?: string | null
          id?: number
          image_id?: string | null
          media_name?: string | null
          media_type?: string | null
          placements?: number | null
          product?: string | null
          sector?: string | null
          value?: number | null
        }
        Relationships: []
      }
      lidlcomp: {
        Row: {
          customer: string | null
          date: string | null
          image_id: string | null
          media_name: string | null
          media_type: string | null
          product: string | null
          total_value: number | null
          url: string | null
        }
        Insert: {
          customer?: string | null
          date?: string | null
          image_id?: string | null
          media_name?: string | null
          media_type?: string | null
          product?: string | null
          total_value?: number | null
          url?: string | null
        }
        Update: {
          customer?: string | null
          date?: string | null
          image_id?: string | null
          media_name?: string | null
          media_type?: string | null
          product?: string | null
          total_value?: number | null
          url?: string | null
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
      new_adverts_weekly: {
        Row: {
          category: string | null
          created_at: string
          customer: string | null
          date: string | null
          id: number
          image_id: string | null
          media_name: string | null
          media_type: string | null
          product: string | null
          sector: string | null
          url: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          customer?: string | null
          date?: string | null
          id?: number
          image_id?: string | null
          media_name?: string | null
          media_type?: string | null
          product?: string | null
          sector?: string | null
          url?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          customer?: string | null
          date?: string | null
          id?: number
          image_id?: string | null
          media_name?: string | null
          media_type?: string | null
          product?: string | null
          sector?: string | null
          url?: string | null
        }
        Relationships: []
      }
      new_products_tv: {
        Row: {
          alpha: number | null
          antenna: number | null
          created_at: string
          id: number
          omega: number | null
          product: string | null
          rik1: number | null
          rik2: number | null
          sigma: number | null
          total: number | null
        }
        Insert: {
          alpha?: number | null
          antenna?: number | null
          created_at?: string
          id?: number
          omega?: number | null
          product?: string | null
          rik1?: number | null
          rik2?: number | null
          sigma?: number | null
          total?: number | null
        }
        Update: {
          alpha?: number | null
          antenna?: number | null
          created_at?: string
          id?: number
          omega?: number | null
          product?: string | null
          rik1?: number | null
          rik2?: number | null
          sigma?: number | null
          total?: number | null
        }
        Relationships: []
      }
      newadverts_radio: {
        Row: {
          "Active Radio": number | null
          "Alpha Radio": number | null
          "Ant1 FM": number | null
          "Astra Radio": number | null
          "Choice 104.3": number | null
          created_at: string
          "Deejay Radio": number | null
          Diesi: number | null
          "Dromos FM": number | null
          id: number
          "Kanali 6": number | null
          "Kiss 89": number | null
          "Klik FM": number | null
          "Love Radio": number | null
          "Mix FM 102.3": number | null
          "NJOY Radio": number | null
          Product: string | null
          "Radio 107.6": number | null
          "Radio Proto": number | null
          "Rik One": number | null
          "Rik Trito": number | null
          "Sfera 96.8": number | null
          "Sport FM": number | null
          "Super Radio 104.8 Nicosia": number | null
          "Supersport FM": number | null
          "Zenith FM": number | null
        }
        Insert: {
          "Active Radio"?: number | null
          "Alpha Radio"?: number | null
          "Ant1 FM"?: number | null
          "Astra Radio"?: number | null
          "Choice 104.3"?: number | null
          created_at?: string
          "Deejay Radio"?: number | null
          Diesi?: number | null
          "Dromos FM"?: number | null
          id?: number
          "Kanali 6"?: number | null
          "Kiss 89"?: number | null
          "Klik FM"?: number | null
          "Love Radio"?: number | null
          "Mix FM 102.3"?: number | null
          "NJOY Radio"?: number | null
          Product?: string | null
          "Radio 107.6"?: number | null
          "Radio Proto"?: number | null
          "Rik One"?: number | null
          "Rik Trito"?: number | null
          "Sfera 96.8"?: number | null
          "Sport FM"?: number | null
          "Super Radio 104.8 Nicosia"?: number | null
          "Supersport FM"?: number | null
          "Zenith FM"?: number | null
        }
        Update: {
          "Active Radio"?: number | null
          "Alpha Radio"?: number | null
          "Ant1 FM"?: number | null
          "Astra Radio"?: number | null
          "Choice 104.3"?: number | null
          created_at?: string
          "Deejay Radio"?: number | null
          Diesi?: number | null
          "Dromos FM"?: number | null
          id?: number
          "Kanali 6"?: number | null
          "Kiss 89"?: number | null
          "Klik FM"?: number | null
          "Love Radio"?: number | null
          "Mix FM 102.3"?: number | null
          "NJOY Radio"?: number | null
          Product?: string | null
          "Radio 107.6"?: number | null
          "Radio Proto"?: number | null
          "Rik One"?: number | null
          "Rik Trito"?: number | null
          "Sfera 96.8"?: number | null
          "Sport FM"?: number | null
          "Super Radio 104.8 Nicosia"?: number | null
          "Supersport FM"?: number | null
          "Zenith FM"?: number | null
        }
        Relationships: []
      }
      outdoor_sign: {
        Row: {
          city: string
          code: string
          id: number
          Latitude: string
          Longitude: string | null
        }
        Insert: {
          city: string
          code: string
          id?: number
          Latitude: string
          Longitude?: string | null
        }
        Update: {
          city?: string
          code?: string
          id?: number
          Latitude?: string
          Longitude?: string | null
        }
        Relationships: []
      }
      product_ranking: {
        Row: {
          channel: string | null
          created_at: string
          id: number
          product: string | null
          value: number | null
        }
        Insert: {
          channel?: string | null
          created_at?: string
          id?: number
          product?: string | null
          value?: number | null
        }
        Update: {
          channel?: string | null
          created_at?: string
          id?: number
          product?: string | null
          value?: number | null
        }
        Relationships: []
      }
      radio_ytd: {
        Row: {
          Abschange: number | null
          Change: string | null
          created_at: string
          Customer: string | null
          id: number
          "Year 2024": number | null
          "Year 2025": number | null
        }
        Insert: {
          Abschange?: number | null
          Change?: string | null
          created_at?: string
          Customer?: string | null
          id?: number
          "Year 2024"?: number | null
          "Year 2025"?: number | null
        }
        Update: {
          Abschange?: number | null
          Change?: string | null
          created_at?: string
          Customer?: string | null
          id?: number
          "Year 2024"?: number | null
          "Year 2025"?: number | null
        }
        Relationships: []
      }
      tv_adverts_all: {
        Row: {
          category: string | null
          customer: string | null
          date: string | null
          duration: string | null
          id: number
          image_id: string | null
          media_name: string | null
          media_type: string | null
          placements: number | null
          product: string | null
          sector: string | null
          value: string | null
        }
        Insert: {
          category?: string | null
          customer?: string | null
          date?: string | null
          duration?: string | null
          id?: number
          image_id?: string | null
          media_name?: string | null
          media_type?: string | null
          placements?: number | null
          product?: string | null
          sector?: string | null
          value?: string | null
        }
        Update: {
          category?: string | null
          customer?: string | null
          date?: string | null
          duration?: string | null
          id?: number
          image_id?: string | null
          media_name?: string | null
          media_type?: string | null
          placements?: number | null
          product?: string | null
          sector?: string | null
          value?: string | null
        }
        Relationships: []
      }
      tv_ytd: {
        Row: {
          Abschange: number | null
          Change: string | null
          created_at: string
          Customer: string | null
          id: number
          "Year 2024": number | null
          "Year 2025": number | null
        }
        Insert: {
          Abschange?: number | null
          Change?: string | null
          created_at?: string
          Customer?: string | null
          id?: number
          "Year 2024"?: number | null
          "Year 2025"?: number | null
        }
        Update: {
          Abschange?: number | null
          Change?: string | null
          created_at?: string
          Customer?: string | null
          id?: number
          "Year 2024"?: number | null
          "Year 2025"?: number | null
        }
        Relationships: []
      }
      user_feedback: {
        Row: {
          created_at: string
          id: string
          message: string
          user_email: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          user_email?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          user_email?: string | null
        }
        Relationships: []
      }
      weekdateranges: {
        Row: {
          created_at: string | null
          id: number
          week1_end: string
          week1_start: string
          week2_end: string
          week2_start: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          week1_end: string
          week1_start: string
          week2_end: string
          week2_start: string
        }
        Update: {
          created_at?: string | null
          id?: number
          week1_end?: string
          week1_start?: string
          week2_end?: string
          week2_start?: string
        }
        Relationships: []
      }
      weekly_comparison_tv: {
        Row: {
          "% Change": string | null
          Change: number | null
          created_at: string
          id: number
          Product: string | null
          Total: number | null
          "Week 1": number | null
          "Week 2": number | null
        }
        Insert: {
          "% Change"?: string | null
          Change?: number | null
          created_at?: string
          id?: number
          Product?: string | null
          Total?: number | null
          "Week 1"?: number | null
          "Week 2"?: number | null
        }
        Update: {
          "% Change"?: string | null
          Change?: number | null
          created_at?: string
          id?: number
          Product?: string | null
          Total?: number | null
          "Week 1"?: number | null
          "Week 2"?: number | null
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
      get_media_duration_july_2025: {
        Args: never
        Returns: {
          media_name: string
          total_duration: unknown
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
