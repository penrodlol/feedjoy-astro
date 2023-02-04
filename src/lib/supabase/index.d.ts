export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      post: {
        Row: {
          id: number;
          link: string;
          pub_date: string;
          site: string;
          title: string;
          url_id: number;
        };
        Insert: {
          id?: number;
          link: string;
          pub_date: string;
          site: string;
          title: string;
          url_id: number;
        };
        Update: {
          id?: number;
          link?: string;
          pub_date?: string;
          site?: string;
          title?: string;
          url_id?: number;
        };
      };
      url: {
        Row: {
          id: number;
          url: string;
        };
        Insert: {
          id?: number;
          url: string;
        };
        Update: {
          id?: number;
          url?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      add_url_and_feed: {
        Args: { _title: string; _url: string };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
