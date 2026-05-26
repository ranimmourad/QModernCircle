export const dynamic = 'force-dynamic'; 

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data, error } = await supabase.from("menu_items").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  return NextResponse.json(
    { items: data ?? [] },
    { headers: { 'Cache-Control': 'no-store, must-revalidate' } }
  );
}