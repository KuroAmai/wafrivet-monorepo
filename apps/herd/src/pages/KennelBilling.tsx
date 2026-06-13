import { Link } from "react-router-dom";

export default function KennelBillingPage() {
  return (
    <div className="max-w-lg mx-auto py-8 space-y-6">
      <Link to="/kennel" className="text-sm text-[#2D4D31] font-bold">
        ← Back to kennel
      </Link>
      <h1 className="text-2xl font-black">Subscription & billing</h1>
      <div className="bg-white rounded-3xl border p-6 space-y-3 text-sm">
        <p>
          <span className="text-gray-400">Status:</span> Trial
        </p>
        <p>
          <span className="text-gray-400">Dogs billed:</span> —
        </p>
        <p>
          <span className="text-gray-400">Monthly total:</span> —
        </p>
        <button type="button" className="w-full mt-4 py-3 bg-[#2D4D31] text-white rounded-xl font-bold">
          Update payment card
        </button>
      </div>
    </div>
  );
}
