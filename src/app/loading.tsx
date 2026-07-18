export default function Loading() {
  return (
    <div className="container-site py-20">
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-[var(--color-bg-tertiary)] rounded w-1/3" />
        <div className="h-4 bg-[var(--color-bg-tertiary)] rounded w-2/3" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-video bg-[var(--color-bg-tertiary)] rounded-lg" />
              <div className="h-4 bg-[var(--color-bg-tertiary)] rounded w-3/4" />
              <div className="h-3 bg-[var(--color-bg-tertiary)] rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
