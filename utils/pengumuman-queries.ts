import { createClient } from "@/utils/supabase/server"

export type Pengumuman = {
  id: string
  judul: string
  deskripsi: string
  status: string
  file_url: string | null
  created_at: string
}

export async function getPengumuman(status?: string): Promise<Pengumuman[]> {
  const supabase = await createClient()

  let query = supabase
    .from("pengumuman")
    .select("*")
    .order("created_at", { ascending: false })

  if (status) {
    query = query.eq("status", status)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching pengumuman:", error)
    throw error
  }

  return data || []
}

export async function getPengumumanById(id: string): Promise<Pengumuman | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("pengumuman")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching pengumuman by ID:", error)
    return null
  }

  return data
}