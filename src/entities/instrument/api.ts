import { supabase } from "@/shared/lib/supabase";

export async function getInstruments() {
  const { data, error } = await supabase.from("string_life").select();
  if (error) throw error;
  return data;
}

export async function addInstrument(name: string, type: string) {
  const { error } = await supabase
    .from("string_life")
    .insert([{ name, type, replacement_date: null, progress: 0 }]);

  if (error) throw error;
}
