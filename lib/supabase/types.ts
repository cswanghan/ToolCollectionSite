export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          slug: string
          name: string
          icon: string | null
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          icon?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          icon?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      tools: {
        Row: {
          id: string
          category_id: string | null
          name: string
          description: string | null
          url: string
          icon: string | null
          tags: string[] | null
          click_count: number
          is_featured: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id?: string | null
          name: string
          description?: string | null
          url: string
          icon?: string | null
          tags?: string[] | null
          click_count?: number
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string | null
          name?: string
          description?: string | null
          url?: string
          icon?: string | null
          tags?: string[] | null
          click_count?: number
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      click_logs: {
        Row: {
          id: string
          tool_id: string | null
          ip_address: string | null
          user_agent: string | null
          referrer: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tool_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          referrer?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          tool_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          referrer?: string | null
          created_at?: string
        }
      }
      user_favorites: {
        Row: {
          user_id: string
          tool_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          tool_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          tool_id?: string
          created_at?: string
        }
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
  }
}