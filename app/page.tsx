import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { error } = await supabase.from("categories").select("id").limit(1);
  const connected = !error;

  return (
    <section className="flex flex-col items-center justify-center gap-6 py-16">
      <h1 className="text-3xl md:text-5xl font-semibold text-center">
        Sumbar Smart Portal
      </h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-default-500">Supabase connection</span>
        <Chip color={connected ? "success" : "danger"} variant="flat">
          {connected ? "Connected" : "Not connected"}
        </Chip>
      </div>

      <Button color="primary" variant="solid">
        Contoh Tombol HeroUI
      </Button>
    </section>
  );
}
