# Farcaster Daily Quest

Mini app MVP gratis keur Farcaster.

## Core fitur MVP
- Daily check-in
- Streak tracker
- Daily quest list
- Point summary
- Leaderboard sederhana
- Convert page (mock/internal)

## Stack gratis
- Next.js
- Tailwind CSS
- Vercel (deploy gratis)
- Supabase free tier

## Pages
- `/` Home
- `/daily` Daily check-in
- `/quests` Quest list
- `/ranking` Leaderboard
- `/points` Point summary
- `/convert` Convert mock

## Nyambungkeun ka Supabase
1. Jieun project Supabase
2. Copy `.env.example` jadi `.env.local`
3. Eusian:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Jalankeun SQL di `supabase-schema.sql`

## Catetan
Ayeuna app masih make mock UI + flow dasar. Helper Supabase geus disiapkeun, tapi can disambungkeun ka page produksi pinuh.
