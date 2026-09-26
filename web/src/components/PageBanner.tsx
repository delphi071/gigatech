export default function PageBanner({
  title,
  breadcrumb,
  description,
}: {
  title: string;
  breadcrumb?: string;
  description?: string;
}) {
  return (
    <div className="bg-brand-light">
      <div className="container-x py-12 sm:py-16">
        {breadcrumb && (
          <p className="mb-2 text-sm font-medium text-brand">{breadcrumb}</p>
        )}
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl text-slate-600">{description}</p>
        )}
      </div>
    </div>
  );
}
