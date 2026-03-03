export type CalendarMode = 'private' | 'duo' | 'group' | 'community' | 'public';
export type EventCategory = 'work' | 'personal' | 'health' | 'hobbies';
export type EventStatus = 'scheduled' | 'tentative' | 'cancelled';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      events: {
        Row: {
          id: string;
          user_id: string;
          calendar_id: string | null;
          title: string;
          description: string | null;
          start_at: string;
          end_at: string;
          category: EventCategory;
          is_confidential: boolean;
          is_recurring: boolean;
          recurrence_rule: string | null;
          status: EventStatus;
          location: string | null;
          reminder_minutes: number | null;
          mode: CalendarMode;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['events']['Insert']>;
      };
      calendars: {
        Row: {
          id: string;
          name: string;
          mode: CalendarMode;
          owner_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['calendars']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['calendars']['Insert']>;
      };
      calendar_members: {
        Row: {
          id: string;
          calendar_id: string;
          user_id: string;
          role: 'owner' | 'member' | 'viewer';
          color_hex: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['calendar_members']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['calendar_members']['Insert']>;
      };
      duo_links: {
        Row: {
          id: string;
          user_a_id: string;
          user_b_id: string;
          calendar_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['duo_links']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['duo_links']['Insert']>;
      };
      event_proposals: {
        Row: {
          id: string;
          event_id: string;
          calendar_id: string;
          proposed_by: string;
          status: 'pending' | 'accepted' | 'rejected';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['event_proposals']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['event_proposals']['Insert']>;
      };
      event_attendees: {
        Row: {
          id: string;
          event_id: string;
          user_id: string;
          response: 'accepted' | 'declined' | 'pending';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['event_attendees']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['event_attendees']['Insert']>;
      };
      friendships: {
        Row: {
          id: string;
          user_id: string;
          friend_id: string;
          status: 'pending' | 'accepted';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['friendships']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['friendships']['Insert']>;
      };
      communities: {
        Row: {
          id: string;
          name: string;
          host_id: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['communities']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['communities']['Insert']>;
      };
      community_members: {
        Row: {
          id: string;
          community_id: string;
          user_id: string;
          role: 'host' | 'member';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['community_members']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['community_members']['Insert']>;
      };
      public_events: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          start_at: string;
          end_at: string;
          location: string | null;
          host_id: string;
          is_public: true;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['public_events']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['public_events']['Insert']>;
      };
    };
  };
}

export type EventRow = Database['public']['Tables']['events']['Row'];
export type CalendarRow = Database['public']['Tables']['calendars']['Row'];
