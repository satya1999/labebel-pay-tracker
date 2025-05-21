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
      bookings: {
        Row: {
          aadhar_card_number: string | null
          address: string | null
          advance_paid: number
          age: number | null
          blood_group: string | null
          booking_date: string | null
          collected_at: string | null
          collected_by: string | null
          contact_number: string
          created_at: string
          discount_given: number
          gender: string | null
          id: string
          is_cancelled: boolean
          is_payment_collected: boolean
          notes: string | null
          passenger_name: string
          payment_mode: string
          payment_transferred_to: string
          relative_contact_number: string | null
          remaining_amount: number
          screenshot_url: string | null
          seat_number: string
          total_amount: number
          trip_id: string
          updated_at: string
        }
        Insert: {
          aadhar_card_number?: string | null
          address?: string | null
          advance_paid?: number
          age?: number | null
          blood_group?: string | null
          booking_date?: string | null
          collected_at?: string | null
          collected_by?: string | null
          contact_number: string
          created_at?: string
          discount_given?: number
          gender?: string | null
          id?: string
          is_cancelled?: boolean
          is_payment_collected?: boolean
          notes?: string | null
          passenger_name: string
          payment_mode: string
          payment_transferred_to: string
          relative_contact_number?: string | null
          remaining_amount?: number
          screenshot_url?: string | null
          seat_number: string
          total_amount: number
          trip_id: string
          updated_at?: string
        }
        Update: {
          aadhar_card_number?: string | null
          address?: string | null
          advance_paid?: number
          age?: number | null
          blood_group?: string | null
          booking_date?: string | null
          collected_at?: string | null
          collected_by?: string | null
          contact_number?: string
          created_at?: string
          discount_given?: number
          gender?: string | null
          id?: string
          is_cancelled?: boolean
          is_payment_collected?: boolean
          notes?: string | null
          passenger_name?: string
          payment_mode?: string
          payment_transferred_to?: string
          relative_contact_number?: string | null
          remaining_amount?: number
          screenshot_url?: string | null
          seat_number?: string
          total_amount?: number
          trip_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          name: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          name: string
          role: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      trips: {
        Row: {
          created_at: string
          departure_date: string
          destination: string
          id: string
          name: string
          price: number
          return_date: string
          total_seats: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          departure_date: string
          destination: string
          id?: string
          name: string
          price: number
          return_date: string
          total_seats: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          departure_date?: string
          destination?: string
          id?: string
          name?: string
          price?: number
          return_date?: string
          total_seats?: number
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
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
