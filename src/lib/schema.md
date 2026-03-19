# MVP schema draft

## users
- id
- fid
- username
- wallet_address
- total_points
- streak
- last_checkin_date
- created_at

## checkins
- id
- user_id
- checkin_date
- fee_amount
- fee_symbol
- points_earned
- created_at

## quests
- id
- title
- description
- type
- points_reward
- is_daily
- is_active
- created_at

## quest_submissions
- id
- user_id
- quest_id
- proof_url_or_text
- status
- points_earned
- created_at

## point_logs
- id
- user_id
- source
- amount
- meta
- created_at

## conversions
- id
- user_id
- points_spent
- token_amount
- status
- created_at
