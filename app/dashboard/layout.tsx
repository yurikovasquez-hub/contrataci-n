import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase-server'
import Link from 'next/link'
import Image from 'next/image'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('nombre, role')
    .eq('id', user.id)
    .single()

  if (profile?.role === 'admin') redirect('/admin')

  async function signOut() {
    'use server'
    const supabase = await createSupabaseServer()
    await supabase.auth.signOut()
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo-nanago.png" alt="NanaGo" width={40} height={40} className="rounded-full" />
          <span className="font-semibold text-gray-900">NanaGo</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">Mi cuenta</Link>
          <Link href="/buscar" className="text-sm text-gray-600 hover:text-gray-900">Buscar cuidadoras</Link>
          <span className="text-sm text-gray-400">|</span>
          <span className="text-sm text-gray-600">{profile?.nombre ?? user.email}</span>
          <form action={signOut}>
            <button type="submit" className="text-sm text-gray-400 hover:text-gray-700">
              Salir
            </button>
          </form>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}
