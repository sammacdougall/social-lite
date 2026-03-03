import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { EventRow } from '@/types/database';
import type { CalendarMode } from '@/types/database';

export function usePrivateEvents(userId: string | undefined) {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setEvents([]);
      setLoading(false);
      return;
    }
    const channel = supabase
      .channel('private-events')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events',
          filter: `user_id=eq.${userId}`,
        },
        () => fetch()
      )
      .subscribe();

    fetch();

    async function fetch() {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('user_id', userId)
        .eq('mode', 'private')
        .order('start_at', { ascending: true });
      if (!error) setEvents(data ?? []);
      setLoading(false);
    }

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return { events, loading };
}

export function usePublicEvents() {
  const [events, setEvents] = useState<Awaited<ReturnType<typeof fetchPublicEvents>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicEvents().then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  return { events, loading };
}

async function fetchPublicEvents() {
  const { data } = await supabase
    .from('public_events')
    .select('*')
    .gte('start_at', new Date().toISOString())
    .order('start_at', { ascending: true });
  return data ?? [];
}
