import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Private() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return <p>Hello {data.user.email}</p>;
}
