"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { name: "Overview", path: "/dashboard/moderator/overview" },
    { name: "Reports", path: "/dashboard/moderator/reports" },
    { name: "Users", path: "/dashboard/moderator/users" },
  ];
  

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 shadow-lg flex flex-col">
      <h2 className="text-2xl font-semibold mb-6">Moderator Panel</h2>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              href={link.path}
              className={`block p-3 rounded-md transition-all ${
                pathname === link.path ? "bg-gray-700 font-semibold" : "hover:bg-gray-800"
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
