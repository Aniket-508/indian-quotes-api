export default function Stats() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-white p-8 rounded-xl border border-gray-100">
          <div className="text-4xl font-bold text-indigo-600 mb-2">2M+</div>
          <div className="text-gray-600">Daily API Requests</div>
        </div>
        <div className="bg-white p-8 rounded-xl border border-gray-100">
          <div className="text-4xl font-bold text-indigo-600 mb-2">10k+</div>
          <div className="text-gray-600">GitHub Stars</div>
        </div>
        <div className="bg-white p-8 rounded-xl border border-gray-100">
          <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
          <div className="text-gray-600">Contributors</div>
        </div>
      </div>
    </div>
  );
}
