import { createClient } from "@/utils/supabase/server"

export type AntiHoax = {
  id: string
  judul: string
  penjelasan: string
  written_by: string
  gambar_url: string | null
  jenis: 'hoax' | 'sebagian' | 'verified'
  created_at: string
}

export async function getAntiHoax(jenis?: string): Promise<AntiHoax[]> {
  const supabase = await createClient()

  let query = supabase
    .from("antihoax")
    .select("*")
    .order("created_at", { ascending: false })

  if (jenis) {
    query = query.eq("jenis", jenis)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching antihoax:", error)
    throw error
  }

  return data || []
}

export async function getAntiHoaxById(id: string): Promise<AntiHoax | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("antihoax")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching antihoax by ID:", error)
    return null
  }

  return data
}

export async function getAntiHoaxByJenis(): Promise<{
  hoax: AntiHoax[]
  verified: AntiHoax[]
}> {
  const supabase = await createClient()

  const [hoaxResult, verifiedResult] = await Promise.all([
    supabase
      .from("antihoax")
      .select("*")
      .in("jenis", ["hoax", "sebagian"])
      .order("created_at", { ascending: false }),
    supabase
      .from("antihoax")
      .select("*")
      .eq("jenis", "verified")
      .order("created_at", { ascending: false })
  ])

  return {
    hoax: hoaxResult.data || [],
    verified: verifiedResult.data || []
  }
}