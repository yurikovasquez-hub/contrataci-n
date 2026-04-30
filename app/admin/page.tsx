import { createSupabaseServer } from '@/lib/supabase-server'

export default async function AdminPage() {
  const supabase = await createSupabaseServer()

  const [
    { count: totalCuidadoras },
    { count: totalFamilias },
    { count: matchesMes },
    { count: suscripcionesActivas },
  ] = await Promise.all([
    supabase.from('cuidadoras').select('*', { count: 'exact', head: true }).eq('activa', true),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'familia'),
    supabase.from('matches').select('*', { count: 'exact', head: true })
      .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
    supabase.from('suscripciones').select('*', { count: 'exact', head: true }).eq('estado', 'activa'),
  ])

  const stats = [
    { label: 'Cuidadoras activas', value: totalCuidadoras ?? 0, color: 'text-emerald-400' },
    { label: 'Familias registradas', value: totalFamilias ?? 0, color: 'text-indigo-400' },
    { label: 'Matches este mes', value: matchesMes ?? 0, color: 'text-amber-400' },
    { label: 'Suscripciones activas', value: suscripcionesActivas ?? 0, color: 'text-purple-400' },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white">Panel de administración</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map(({ label, value, color }) => (
          <div key={label} className="bg-gray-800 rounded-xl p-5 border border-gray-700">
            <p className="text-sm text-gray-400">{label}</p>
            <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a href="/admin/cuidadoras" className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-emerald-500 transition group">
          <div className="text-2xl mb-2">👩‍⚕️</div>
          <h2 className="font-semibold text-white group-hover:text-emerald-400 transition">Gestionar cuidadoras</h2>
          <p className="text-sm text-gray-400 mt-1">Agregar, editar y activar perfiles de cuidadoras</p>
        </a>
        <a href="/admin/matches" className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-amber-500 transition group">
          <div className="text-2xl mb-2">🤝</div>
          <h2 className="font-semibold text-white group-hover:text-amber-400 transition">Registrar matches</h2>
          <p className="text-sm text-gray-400 mt-1">Confirmar match entre familia y cuidadora, ingresar salario acordado</p>
        </a>
        <a href="/admin/suscripciones" className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-indigo-500 transition group">
          <div className="text-2xl mb-2">💳</div>
          <h2 className="font-semibold text-white group-hover:text-indigo-400 transition">Suscripciones</h2>
          <p className="text-sm text-gray-400 mt-1">Ver y gestionar suscripciones activas de familias</p>
        </a>
        <a href="/admin/leads" className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition group">
          <div className="text-2xl mb-2">📋</div>
          <h2 className="font-semibold text-white group-hover:text-purple-400 transition">Leads de validación</h2>
          <p className="text-sm text-gray-400 mt-1">Ver leads capturados en /familias y /cuidadoras</p>
        </a>
      </div>
    </div>
  )
}
