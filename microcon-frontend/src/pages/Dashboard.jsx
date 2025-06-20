import { useEffect, useState } from "react";

const ADMIN_PASSWORD = "microcon2026"; // 🔐 Change this to your secure password

export default function Dashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState("");

  const handleLogin = () => {
    if (inputPassword === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  useEffect(() => {
    if (view === "registrations") {
      setLoading(true);
      async function fetchRegistrations() {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/test`
          );

          const json = await res.json();

          if (!res.ok) throw new Error(json.error || "Failed to fetch");

          setData(json);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }

      fetchRegistrations();
    }
  }, [view]);

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setView("registrations")}
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            View Registrations
          </button>
        </div>

        {view === "registrations" && (
          <>
            {loading ? (
              <p className="text-center text-gray-600">
                Loading registrations...
              </p>
            ) : error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : data.length === 0 ? (
              <p className="text-center text-gray-500">No registrations yet.</p>
            ) : (
              <div className="overflow-x-auto rounded shadow bg-white">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Phone</th>
                      <th className="py-3 px-4">Registered On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((entry, index) => (
                      <tr key={entry.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4">{entry.full_name}</td>
                        <td className="py-2 px-4">{entry.email}</td>
                        <td className="py-2 px-4">{entry.phone || "—"}</td>
                        <td className="py-2 px-4">
                          {new Date(entry.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
