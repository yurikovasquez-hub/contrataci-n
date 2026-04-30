import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase-server'
import Link from 'next/link'
import Image from 'next/image'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, nombre')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/dashboard')

  async function signOut() {
    'use server'
    const supabase = await createSupabaseServer()
    await supabase.auth.signOut()
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <Image src="/logo-nanago.png" alt="NanaGo" width={36} height={36} className="rounded-full" />
            <span className="font-semibold text-white">Admin</span>
          </div>
          <div className="flex items-center gap-5 text-sm">
            <Link href="/admin" className="text-gray-300 hover:text-white transition">Dashboard</Link>
            <Link href="/admin/cuidadoras" className="text-gray-300 hover:text-white transition">Cuidadoras</Link>
            <Link href="/admin/matches" className="text-gray-300 hover:text-white transition">Matches</Link>
            <Link href="/admin/suscripciones" className="text-gray-300 hover:text-white transition">Suscripciones</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">{profile?.nombre ?? user.email}</span>
          <form action={signOut}>
            <button type="submit" className="text-sm text-gray-400 hover:text-white transition">
              Salir
            </button>
          </form>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}
