'use client';

import { useEffect, useState, FormEvent } from 'react';
import { notFound } from 'next/navigation';
import { Search } from 'lucide-react';

const ADMIN_SECRET = '849204';

interface Item {
  id: string;
  name: string;
  price: number;
  image: string | null;
  category: string | null;
  in_stock?: boolean;
  description: string | null;
  created_at: string;
}

const emptyProductForm = { name: '', price: '', image: '', category: '', description: '', in_stock: true };
const emptyMenuForm = { name: '', price: '', image: '', category: '', description: '' };

export default function AdminDashboardPage({ params }: { params: { slug: string } }) {
  if (params.slug !== ADMIN_SECRET) notFound();

  const [products, setProducts] = useState<Item[]>([]);
  const [menuItems, setMenuItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [productForm, setProductForm] = useState(emptyProductForm);
  const [menuForm, setMenuForm] = useState(emptyMenuForm);
  
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editingMenu, setEditingMenu] = useState<string | null>(null);

  // Search & Filter States
  const [productQuery, setProductQuery] = useState('');
  const [productFilter, setProductFilter] = useState('All');
  const [menuQuery, setMenuQuery] = useState('');
  const [menuFilter, setMenuFilter] = useState('All');

  const fetchAll = async () => {
    setLoading(true);
    try {
      const headers = { 'x-admin-secret': ADMIN_SECRET, 'Content-Type': 'application/json' };
      const pRes = await fetch('/api/admin/products', { headers, cache: 'no-store' });
      const pData = await pRes.json();
      if (!pRes.ok) throw new Error(pData.error);
      setProducts(pData.products || []);

      const mRes = await fetch('/api/admin/menu-items', { headers, cache: 'no-store' });
      const mData = await mRes.json();
      if (!mRes.ok) throw new Error(mData.error);
      setMenuItems(mData.items || []);
    } catch (e: any) {
      setError(e.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleProductSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true); setError(null);
    try {
      const isEditing = !!editingProduct;
      const res = await fetch('/api/admin/products', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': ADMIN_SECRET },
        body: JSON.stringify({ ...productForm, price: Number(productForm.price), id: editingProduct }),
      });
      if (!res.ok) { const j = await res.json().catch(() => ({})); throw new Error(j.error); }
      setProductForm(emptyProductForm); setEditingProduct(null);
      await fetchAll();
    } catch (e: any) { setError(e.message); } finally { setSubmitting(false); }
  };

  const handleMenuSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true); setError(null);
    try {
      const isEditing = !!editingMenu;
      const payload: any = {
        name: menuForm.name,
        price: Number(menuForm.price),
        image: menuForm.image,
        category: menuForm.category,
        description: menuForm.description,
      };
      if (isEditing) payload.id = editingMenu;

      const res = await fetch('/api/admin/menu-items', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': ADMIN_SECRET },
        body: JSON.stringify(payload),
      });
      if (!res.ok) { const j = await res.json().catch(() => ({})); throw new Error(j.error || `Failed to add`); }
      setMenuForm(emptyMenuForm); setEditingMenu(null);
      await fetchAll();
    } catch (e: any) { setError(e.message); } finally { setSubmitting(false); }
  };

  const handleDelete = async (type: 'products' | 'menu-items', id: string) => {
    if (!confirm('Delete this item?')) return;
    try {
      const res = await fetch(`/api/admin/${type}?id=${id}`, { method: 'DELETE', headers: { 'x-admin-secret': ADMIN_SECRET } });
      if (!res.ok) { const j = await res.json().catch(() => ({})); throw new Error(j.error); }
      if (type === 'products') setProducts(prev => prev.filter(p => p.id !== id));
      else setMenuItems(prev => prev.filter(m => m.id !== id));
    } catch (e: any) { setError(e.message); }
  };

  const editProduct = (p: Item) => {
    setEditingProduct(p.id);
    setProductForm({ name: p.name, price: String(p.price), image: p.image || '', category: p.category || '', description: p.description || '', in_stock: p.in_stock ?? true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const editMenu = (m: Item) => {
    setEditingMenu(m.id);
    setMenuForm({ name: m.name, price: String(m.price), image: m.image || '', category: m.category || '', description: m.description || '' });
    document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filtering Logic
  const productCategories = ['All', ...Array.from(new Set(products.map(p => p.category).filter(Boolean) as string[]))];
  const menuCategories = ['All', ...Array.from(new Set(menuItems.map(m => m.category).filter(Boolean) as string[]))];

  const filteredProducts = products.filter((p) => {
    const matchCat = productFilter === 'All' || p.category === productFilter;
    const matchQuery = p.name.toLowerCase().includes(productQuery.toLowerCase()) || (p.description && p.description.toLowerCase().includes(productQuery.toLowerCase()));
    return matchCat && matchQuery;
  });

  const filteredMenu = menuItems.filter((m) => {
    const matchCat = menuFilter === 'All' || m.category === menuFilter;
    const matchQuery = m.name.toLowerCase().includes(menuQuery.toLowerCase()) || (m.description && m.description.toLowerCase().includes(menuQuery.toLowerCase()));
    return matchCat && matchQuery;
  });

  return (
    <section className="min-h-screen bg-cream pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 flex items-end justify-between border-b border-cocoa/15 pb-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-bark mb-2">Modern Circle</p>
            <h1 className="font-display text-5xl tracking-widest text-cocoa">Admin Dashboard</h1>
          </div>
          <button onClick={fetchAll} className="text-xs uppercase tracking-widest text-cocoa border border-cocoa/30 px-4 py-2 hover:bg-cocoa hover:text-cream transition-colors">Refresh</button>
        </div>

        {error && <div className="mb-8 border border-terracotta text-terracotta px-4 py-3 text-sm flex justify-between"><span>{error}</span><button onClick={() => setError(null)} className="font-bold">X</button></div>}

        {/* --- BOUTIQUE PRODUCTS SECTION --- */}
        <div className="mb-24 border border-cocoa/15 p-6 md:p-8 bg-white/40">
          <h2 className="font-heading text-3xl text-cocoa mb-6">
            {editingProduct ? 'Edit Boutique Product' : 'Add Boutique Product'}
            {!loading && <span className="ml-3 text-sm font-normal text-bark">({products.length} total)</span>}
          </h2>
          
          <form onSubmit={handleProductSubmit} className="grid md:grid-cols-2 gap-6 mb-10">
            <div><label className="block text-xs uppercase tracking-widest text-bark mb-2">Name</label><input required value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="w-full bg-transparent border-b border-cocoa/30 py-2 text-cocoa focus:border-cocoa focus:outline-none" /></div>
            <div><label className="block text-xs uppercase tracking-widest text-bark mb-2">Price (TND)</label><input required type="number" step="0.01" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} className="w-full bg-transparent border-b border-cocoa/30 py-2 text-cocoa focus:border-cocoa focus:outline-none" /></div>
            <div><label className="block text-xs uppercase tracking-widest text-bark mb-2">Image path</label><input value={productForm.image} onChange={e => setProductForm({...productForm, image: e.target.value})} placeholder="/ceramics.jpg" className="w-full bg-transparent border-b border-cocoa/30 py-2 text-cocoa focus:border-cocoa focus:outline-none" /></div>
            <div><label className="block text-xs uppercase tracking-widest text-bark mb-2">Category</label><input value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} placeholder="Ceramics & Stoneware" className="w-full bg-transparent border-b border-cocoa/30 py-2 text-cocoa focus:border-cocoa focus:outline-none" /></div>
            <div className="md:col-span-2"><label className="block text-xs uppercase tracking-widest text-bark mb-2">Description</label><textarea rows={2} value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} className="w-full bg-transparent border-b border-cocoa/30 py-2 text-cocoa focus:border-cocoa focus:outline-none resize-none" /></div>
            <div className="md:col-span-2 flex items-center gap-6">
              <div className="flex items-center gap-3"><input id="p-stock" type="checkbox" checked={productForm.in_stock} onChange={e => setProductForm({...productForm, in_stock: e.target.checked})} className="accent-cocoa" /><label htmlFor="p-stock" className="text-xs uppercase tracking-widest text-bark">In stock</label></div>
              <button type="submit" disabled={submitting} className="px-10 py-3 bg-cocoa text-cream text-xs uppercase tracking-widest hover:bg-terracotta transition-colors duration-500 disabled:opacity-50">{submitting ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}</button>
              {editingProduct && <button type="button" onClick={() => { setEditingProduct(null); setProductForm(emptyProductForm); }} className="text-xs uppercase tracking-widest text-bark underline">Cancel</button>}
            </div>
          </form>

          {/* Search & Filter for Products */}
          {!loading && products.length > 0 && (
            <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="relative w-full md:w-72">
                <Search size={14} strokeWidth={1.25} className="absolute left-0 top-1/2 -translate-y-1/2 text-bark" />
                <input type="text" placeholder="Search products..." value={productQuery} onChange={e => setProductQuery(e.target.value)} className="w-full bg-transparent border-b border-cocoa/20 pl-6 pr-2 py-2 text-sm text-cocoa placeholder-bark/60 focus:border-cocoa focus:outline-none" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {productCategories.map(cat => (
                  <button key={cat} onClick={() => setProductFilter(cat)} className={`px-3 py-1 text-[10px] uppercase tracking-widest border transition-colors ${productFilter === cat ? 'bg-cocoa text-cream border-cocoa' : 'border-cocoa/20 text-bark hover:border-cocoa'}`}>{cat}</button>
                ))}
              </div>
            </div>
          )}

          {loading ? <p className="text-bark italic-accent">Loading products...</p> : (
            <div className="border border-cocoa/15">
              <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 text-[10px] uppercase tracking-widest text-bark border-b border-cocoa/15 bg-cocoa/5">
                <div className="col-span-1">Img</div><div className="col-span-3">Name</div><div className="col-span-3">Category</div><div className="col-span-2">Price</div><div className="col-span-2">Stock</div><div className="col-span-1 text-right">—</div>
              </div>
              {filteredProducts.length === 0 ? <p className="p-4 text-sm text-bark italic-accent">No products match your search.</p> : filteredProducts.map((p) => (
                <div key={p.id} className="grid grid-cols-12 gap-4 items-center px-4 py-4 border-b border-cocoa/10 last:border-b-0">
                  <div className="col-span-2 md:col-span-1">{p.image ? <img src={p.image} alt={p.name} className="w-12 h-12 object-cover bg-cocoa/10" /> : <div className="w-12 h-12 bg-cocoa/10" />}</div>
                  <div className="col-span-10 md:col-span-3"><p className="font-heading text-lg text-cocoa leading-tight">{p.name}</p><p className="text-xs text-bark line-clamp-1">{p.description}</p></div>
                  <div className="col-span-4 md:col-span-3 text-sm text-bark">{p.category || '—'}</div>
                  <div className="col-span-3 md:col-span-2 text-cocoa font-heading">{Number(p.price).toFixed(0)} TND</div>
                  <div className="col-span-3 md:col-span-2"><span className={`text-[10px] uppercase tracking-widest ${p.in_stock ? 'text-olive' : 'text-bark/60'}`}>{p.in_stock ? 'In stock' : 'Out of stock'}</span></div>
                  <div className="col-span-2 md:col-span-1 text-right space-y-1">
                    <button onClick={() => editProduct(p)} className="block w-full text-[10px] uppercase tracking-widest text-cocoa hover:text-terracotta transition-colors">Edit</button>
                    <button onClick={() => handleDelete('products', p.id)} className="block w-full text-[10px] uppercase tracking-widest text-terracotta hover:text-cocoa transition-colors">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- MENU ITEMS SECTION --- */}
        <div id="menu-section" className="border border-cocoa/15 p-6 md:p-8 bg-white/40">
          <h2 className="font-heading text-3xl text-cocoa mb-6">
            {editingMenu ? 'Edit Menu Item' : 'Add Menu Item (Drinks & Desserts)'}
            {!loading && <span className="ml-3 text-sm font-normal text-bark">({menuItems.length} total)</span>}
          </h2>
          
          <form onSubmit={handleMenuSubmit} className="grid md:grid-cols-2 gap-6 mb-10">
            <div><label className="block text-xs uppercase tracking-widest text-bark mb-2">Name</label><input required value={menuForm.name} onChange={e => setMenuForm({...menuForm, name: e.target.value})} className="w-full bg-transparent border-b border-cocoa/30 py-2 text-cocoa focus:border-cocoa focus:outline-none" /></div>
            <div><label className="block text-xs uppercase tracking-widest text-bark mb-2">Price (TND)</label><input required type="number" step="0.01" value={menuForm.price} onChange={e => setMenuForm({...menuForm, price: e.target.value})} className="w-full bg-transparent border-b border-cocoa/30 py-2 text-cocoa focus:border-cocoa focus:outline-none" /></div>
            <div><label className="block text-xs uppercase tracking-widest text-bark mb-2">Image path</label><input value={menuForm.image} onChange={e => setMenuForm({...menuForm, image: e.target.value})} placeholder="/lattes.jpg" className="w-full bg-transparent border-b border-cocoa/30 py-2 text-cocoa focus:border-cocoa focus:outline-none" /></div>
            <div><label className="block text-xs uppercase tracking-widest text-bark mb-2">Category</label><input value={menuForm.category} onChange={e => setMenuForm({...menuForm, category: e.target.value})} placeholder="Coffee, Dessert..." className="w-full bg-transparent border-b border-cocoa/30 py-2 text-cocoa focus:border-cocoa focus:outline-none" /></div>
            <div className="md:col-span-2"><label className="block text-xs uppercase tracking-widest text-bark mb-2">Description</label><textarea rows={2} value={menuForm.description} onChange={e => setMenuForm({...menuForm, description: e.target.value})} className="w-full bg-transparent border-b border-cocoa/30 py-2 text-cocoa focus:border-cocoa focus:outline-none resize-none" /></div>
            <div className="md:col-span-2 flex items-center gap-6">
              <button type="submit" disabled={submitting} className="px-10 py-3 bg-cocoa text-cream text-xs uppercase tracking-widest hover:bg-terracotta transition-colors duration-500 disabled:opacity-50">{submitting ? 'Saving...' : editingMenu ? 'Update Menu Item' : 'Add Menu Item'}</button>
              {editingMenu && <button type="button" onClick={() => { setEditingMenu(null); setMenuForm(emptyMenuForm); }} className="text-xs uppercase tracking-widest text-bark underline">Cancel</button>}
            </div>
          </form>

          {/* Search & Filter for Menu */}
          {!loading && menuItems.length > 0 && (
            <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="relative w-full md:w-72">
                <Search size={14} strokeWidth={1.25} className="absolute left-0 top-1/2 -translate-y-1/2 text-bark" />
                <input type="text" placeholder="Search menu..." value={menuQuery} onChange={e => setMenuQuery(e.target.value)} className="w-full bg-transparent border-b border-cocoa/20 pl-6 pr-2 py-2 text-sm text-cocoa placeholder-bark/60 focus:border-cocoa focus:outline-none" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {menuCategories.map(cat => (
                  <button key={cat} onClick={() => setMenuFilter(cat)} className={`px-3 py-1 text-[10px] uppercase tracking-widest border transition-colors ${menuFilter === cat ? 'bg-cocoa text-cream border-cocoa' : 'border-cocoa/20 text-bark hover:border-cocoa'}`}>{cat}</button>
                ))}
              </div>
            </div>
          )}

          {loading ? <p className="text-bark italic-accent">Loading menu...</p> : (
            <div className="border border-cocoa/15">
              <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 text-[10px] uppercase tracking-widest text-bark border-b border-cocoa/15 bg-cocoa/5">
                <div className="col-span-1">Img</div><div className="col-span-4">Name</div><div className="col-span-2">Category</div><div className="col-span-2">Price</div><div className="col-span-2">Desc</div><div className="col-span-1 text-right">—</div>
              </div>
              {filteredMenu.length === 0 ? <p className="p-4 text-sm text-bark italic-accent">No menu items match your search.</p> : filteredMenu.map((m) => (
                <div key={m.id} className="grid grid-cols-12 gap-4 items-center px-4 py-4 border-b border-cocoa/10 last:border-b-0">
                  <div className="col-span-2 md:col-span-1">{m.image ? <img src={m.image} alt={m.name} className="w-12 h-12 object-cover bg-cocoa/10" /> : <div className="w-12 h-12 bg-cocoa/10" />}</div>
                  <div className="col-span-10 md:col-span-4 font-heading text-lg text-cocoa">{m.name}</div>
                  <div className="col-span-4 md:col-span-2 text-sm text-bark">{m.category || '—'}</div>
                  <div className="col-span-3 md:col-span-2 text-cocoa font-heading">{Number(m.price).toFixed(0)} TND</div>
                  <div className="col-span-3 md:col-span-2 text-xs text-bark line-clamp-1">{m.description || '—'}</div>
                  <div className="col-span-2 md:col-span-1 text-right space-y-1">
                    <button onClick={() => editMenu(m)} className="block w-full text-[10px] uppercase tracking-widest text-cocoa hover:text-terracotta transition-colors">Edit</button>
                    <button onClick={() => handleDelete('menu-items', m.id)} className="block w-full text-[10px] uppercase tracking-widest text-terracotta hover:text-cocoa transition-colors">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="mt-12 text-[10px] uppercase tracking-widest text-bark/60 text-center">Modern Circle · Admin · /admin/{params.slug}</p>
      </div>
    </section>
  );
}