export default function Stats() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-8 text-center md:grid-cols-3">
        <div className="rounded-xl border border-gray-100 bg-white p-8">
          <div className="mb-2 text-4xl font-bold text-indigo-600">2M+</div>
          <div className="text-gray-600">Daily API Requests</div>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-8">
          <div className="mb-2 text-4xl font-bold text-indigo-600">10k+</div>
          <div className="text-gray-600">GitHub Stars</div>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-8">
          <div className="mb-2 text-4xl font-bold text-indigo-600">500+</div>
          <div className="text-gray-600">Contributors</div>
        </div>
      </div>
    </div>
  );
}
