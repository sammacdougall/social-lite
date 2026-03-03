# SocialLite

Calendar app with five modes: **Private**, **Duo**, **Group**, **Community**, and **Public**. Built with Expo and Supabase.

## Tabs (visual design)

- **Tab 1 – Private:** Personal calendar; event categories (Work, Personal, Health, Hobbies); confidential events (black line on top, not shared to Duo/Group); recurring vs one-off (transparency); reminders.
- **Tab 2 – Duo:** Link with a friend; only shareable events; color-coded per person.
- **Tab 3 – Group:** 3–6 people (unlimited with Premium); shared calendar; event proposals with accept/reject; color-coded per person.
- **Tab 4 – Community:** Hosts create communities; join without being friends; accept/decline events; accepted events go to private calendar.
- **Tab 5 – Public:** Browse or host public events; private calendar stays private; Join button per event.

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL Editor, run the migration:
   - Copy contents of `supabase/migrations/001_initial_schema.sql`
   - Paste and run in the SQL Editor.
3. Create env vars (see `.env.example`):
   - `EXPO_PUBLIC_SUPABASE_URL` = Project URL (Settings → API).
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY` = anon public key.
4. Copy `.env.example` to `.env` and fill in the values.
5. Enable Auth (e.g. Email or Social) and optionally add a trigger to create a row in `public.profiles` on signup.

## Run the app

```bash
cd social-lite
npm install
npx expo start
```

Then open in iOS simulator, Android emulator, or web.

## Tech stack

- **Expo** (SDK 55) + **Expo Router** (tabs)
- **Supabase** (auth, database, realtime)
- **react-native-calendars** for the calendar UI
- **TypeScript**
