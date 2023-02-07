export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      post: {
        Row: {
          id: number
          link: string
          pub_date: string
          site_id: number
          title: string
        }
        Insert: {
          id?: number
          link: string
          pub_date: string
          site_id: number
          title: string
        }
        Update: {
          id?: number
          link?: string
          pub_date?: string
          site_id?: number
          title?: string
        }
      }
      site: {
        Row: {
          id: number
          name: string
          slug: string
          url: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
          url: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          url?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_url_and_feed: {
        Args: { _title: string; _url: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
