import { supabase } from "@/shared/lib/supabase";

export async function getInstruments() {
  const { data, error } = await supabase.from("string_life").select();
  if (error) throw error;
  return data;
}

export async function getInstrumentById(id: string) {
  const { data, error } = await supabase
    .from("string_life")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function addInstrument(name: string, type: string) {
  const { error } = await supabase
    .from("string_life")
    .insert([{ name, type, replacement_date: null, progress: 0 }]);

  if (error) throw error;
}

export async function deleteInstrumentById(id: string) {
  const { error } = await supabase.from("string_life").delete().eq("id", id);

  if (error) throw error;
}
