import React from "react";
import { useAuth } from "../../context/auth";

const Profile = () => {
  const [auth] = useAuth();
  const user = auth?.user;

  const roleLabel = user?.role === 1 ? "Admin" : "User";
  const roleColor =
    user?.role === 1
      ? "bg-purple-100 text-purple-700 ring-purple-200"
      : "bg-teal-100 text-teal-700 ring-teal-200";

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
      {/* Header */}
      <div className="mb-8 bg-gradient-to-r from-sky-200 via-teal-200 to-sky-100 rounded-2xl p-6 flex items-center gap-6">
        {/* Avatar */}
        <div className="h-20 w-20 rounded-full bg-teal-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
          {user?.name
            ? user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)
            : "?"}
        </div>

        {/* Welcome Text */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {user?.name || "User"}!
          </h1>
          <span
            className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ring-1 ${roleColor}`}
          >
            {roleLabel}
          </span>
        </div>
      </div>

      {/* User Information */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Your Information
        </h2>
        <dl className="divide-y divide-gray-200">
          <InfoRow label="Name" value={user?.name} />
          <InfoRow label="Email" value={user?.email} />
          <InfoRow label="Phone" value={user?.phone} />
          <InfoRow label="Address" value={user?.address} />
          <InfoRow label="Role" value={roleLabel} />
        </dl>
      </section>
    </div>
  );
};

function InfoRow({ label, value }) {
  return (
    <div className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="text-sm text-gray-900 font-semibold">{value || "—"}</dd>
    </div>
  );
}

export default Profile;
