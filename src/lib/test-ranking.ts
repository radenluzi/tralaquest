import { getLeaderboard } from "./supabase-ranking";

getLeaderboard(10)
  .then((data) => {
    console.log(data);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
