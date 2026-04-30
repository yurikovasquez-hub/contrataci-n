import { createSupabaseServer } from '@/lib/supabase-server'

export default async function DashboardPage() {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('nombre, perfiles_este_mes, mes_actual')
    .eq('id', user!.id)
    .single()

  const mesActual = new Date().toISOString().slice(0, 7)
  const perfilesMes = profile?.mes_actual === mesActual ? (profile?.perfiles_este_mes ?? 0) : 0

  const { data: match } = await supabase
    .from('matches')
    .select('estado, salario_acordado, fee_monto, cuidadoras(nombre)')
    .eq('familia_id', user!.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  const { data: suscripcion } = await supabase
    .from('suscripciones')
    .select('estado, periodo_fin')
    .eq('user_id', user!.id)
    .eq('tipo', 'familia')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mi cuenta</h1>
        <p className="text-gray-500 mt-1">Bienvenida, {profile?.nombre}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <p className="text-sm text-gray-500">Suscripción</p>
          {suscripcion?.estado === 'activa' ? (
            <>
              <p className="text-xl font-bold text-indigo-600 mt-1">S/ 200/mes</p>
              <p className="text-xs text-emerald-600 mt-1 font-medium">● Activa</p>
            </>
          ) : (
            <>
              <p className="text-xl font-bold text-gray-400 mt-1">Sin suscripción</p>
              <p className="text-xs text-gray-400 mt-1">Activa tu plan para recibir perfiles</p>
            </>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <p className="text-sm text-gray-500">Perfiles recibidos este mes</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{perfilesMes} / 3</p>
          <p className="text-xs text-gray-400 mt-1">Se reinicia cada mes</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <p className="text-sm text-gray-500">Mi match</p>
          {match ? (
            <>
              <p className="text-xl font-bold text-gray-900 mt-1">
                {(match.cuidadoras as unknown as { nombre: string } | null)?.nombre ?? '—'}
              </p>
              <p className={`text-xs mt-1 font-medium ${match.estado === 'pagado' ? 'text-emerald-600' : 'text-amber-500'}`}>
                {match.estado === 'pagado' ? '● Confirmado' : '● Pago pendiente'}
              </p>
            </>
          ) : (
            <>
              <p className="text-xl font-bold text-gray-400 mt-1">—</p>
              <p className="text-xs text-gray-400 mt-1">Aún sin match confirmado</p>
            </>
          )}
        </div>
      </div>

      {match?.estado === 'pendiente_pago' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="font-semibold text-amber-900 mb-1">Pago pendiente</h2>
          <p className="text-sm text-amber-800">
            Tu match con{' '}
            <strong>{(match.cuidadoras as unknown as { nombre: string } | null)?.nombre}</strong> está confirmado.
            El fee de match es <strong>S/ {match.fee_monto}</strong> (50% del salario acordado S/ {match.salario_acordado}).
          </p>
          <p className="text-xs text-amber-600 mt-2">El equipo de NanaGo te contactará para coordinar el pago.</p>
        </div>
      )}

      {!suscripcion || suscripcion.estado !== 'activa' ? (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
          <h2 className="font-semibold text-indigo-900 mb-1">Activa tu suscripción</h2>
          <p className="text-sm text-indigo-700">
            Con S/ 200/mes recibes hasta 3 perfiles de cuidadoras verificadas en tu zona cada mes.
            El equipo de NanaGo te contactará para activar tu plan.
          </p>
        </div>
      ) : (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
          <h2 className="font-semibold text-indigo-900 mb-1">¿Qué sigue?</h2>
          <p className="text-sm text-indigo-700">
            Tu suscripción está activa. El equipo de NanaGo te enviará perfiles de cuidadoras
            que coincidan con tu zona y necesidades. Puedes recibir hasta 3 perfiles por mes.
          </p>
        </div>
      )}
    </div>
  )
}
