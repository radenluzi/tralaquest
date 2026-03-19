import { getActiveQuests } from "./supabase-quests";

getActiveQuests()
  .then((data) => {
    console.log(data);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
