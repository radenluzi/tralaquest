import { runSupabaseDailyCheckin } from "./supabase-checkin";

runSupabaseDailyCheckin()
  .then((result) => {
    console.log(result);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
