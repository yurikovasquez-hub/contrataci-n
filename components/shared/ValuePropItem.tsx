export function ValuePropItem({ icon, title, description }: {
  icon: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xl">
        {icon}
      </span>
      <div>
        <p className="font-semibold text-gray-900">{title}</p>
        {description && <p className="mt-0.5 text-sm text-gray-500">{description}</p>}
      </div>
    </div>
  );
}
