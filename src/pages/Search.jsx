import { useSearchParams, Link } from "react-router-dom";
import { Search, ArrowLeft } from "lucide-react";

export default function SearchPage() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  return (
    <div className="min-h-screen bg-gray-50 py-10 sm:py-16 px-4">

      <div className="max-w-5xl mx-auto">

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-orange-500 font-semibold mb-8 hover:text-orange-600"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm">

          <div className="flex items-center gap-3 mb-6">
            <Search className="text-orange-500" size={28} />

            <h1 className="text-2xl sm:text-3xl font-bold">
              Search Results
            </h1>
          </div>

          <p className="text-gray-500">
            Showing results for:
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mt-2 text-orange-500">
            "{query}"
          </h2>

          <div className="mt-8 bg-orange-50 rounded-xl p-5">
            <p className="text-gray-700">
              Search functionality is ready. You searched for{" "}
              <strong>{query}</strong>.
            </p>

            <p className="text-gray-500 text-sm mt-2">
              We can connect this page to your dishes and
              restaurants next.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}