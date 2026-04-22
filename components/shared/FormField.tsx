interface FormFieldProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  error?: string;
  disabled?: boolean;
}

export function FormField({
  id, label, type, value, onChange, required, placeholder, options, error, disabled,
}: FormFieldProps) {
  const base =
    'w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 transition focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm';
  const normal = 'border-gray-200 bg-white focus:border-indigo-500 focus:ring-indigo-200';
  const errored = 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-200';
  const cls = `${base} ${error ? errored : normal}`;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {type === 'select' ? (
        <select id={id} value={value} onChange={e => onChange(e.target.value)}
          required={required} disabled={disabled} className={`${cls} cursor-pointer`}>
          <option value="">{placeholder ?? 'Selecciona una opción'}</option>
          {options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea id={id} value={value} onChange={e => onChange(e.target.value)}
          required={required} disabled={disabled} placeholder={placeholder}
          rows={3} className={`${cls} resize-none`} />
      ) : (
        <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)}
          required={required} disabled={disabled} placeholder={placeholder} className={cls} />
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
