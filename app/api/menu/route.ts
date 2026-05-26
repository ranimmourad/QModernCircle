export const dynamic = 'force-dynamic'; 
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function GET() {
  const { data, error } = await supabase.from("menu_items").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    const handleMenuSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true); setError(null);
    try {
      const isEditing = !!editingMenu;
      // Remove in_stock so Supabase doesn't crash (menu_items table doesn't have that column)
      const { in_stock, ...menuPayload } = menuForm; 
      const res = await fetch('/api/admin/menu-items', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': ADMIN_SECRET },
        body: JSON.stringify({ ...menuPayload, price: Number(menuPayload.price), id: editingMenu }),
      });
}
