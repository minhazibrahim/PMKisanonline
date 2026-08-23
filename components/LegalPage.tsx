export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-darkgray mb-2">{title}</h1>
      <p className="text-xs text-gray-400 mb-8">Last updated: {updated}</p>
      <div className="prose prose-sm max-w-none text-gray-700 space-y-4 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-darkgray [&_h2]:mt-6 [&_h2]:mb-2">
        {children}
      </div>
    </div>
  );
}
