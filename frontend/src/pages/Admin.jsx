import React from "react";
import { Plus, Edit, Trash2, Video, ArrowRight } from "lucide-react";
import { NavLink } from "react-router";

function Admin() {
  const adminOptions = [
    {
      id: "create",
      title: "Create Problem",
      description: "Add a new coding problem with test cases and starter code to the platform.",
      icon: Plus,
      badgeColor: "bg-emerald-100 text-emerald-800",
      btnClass: "btn-success text-white",
      route: "/admin/create"
    },
    {
      id: "update",
      title: "Update Problem",
      description: "Edit existing problems, test cases, and reference solutions.",
      icon: Edit,
      badgeColor: "bg-amber-100 text-amber-800",
      btnClass: "btn-warning text-slate-900",
      route: "/admin/update"
    },
    {
      id: "delete",
      title: "Delete Problem",
      description: "Remove deprecated or duplicate coding problems from the database.",
      icon: Trash2,
      badgeColor: "bg-rose-100 text-rose-800",
      btnClass: "btn-error text-white",
      route: "/admin/delete"
    },
    {
      id: "video",
      title: "Video Solutions",
      description: "Upload and manage video editorials and solution walk-throughs.",
      icon: Video,
      badgeColor: "bg-sky-100 text-sky-800",
      btnClass: "btn-info text-white",
      route: "/admin/video"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header Banner */}
        <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-orange-700">
            Control Center
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Admin Management Panel
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base font-medium text-slate-600 sm:text-lg">
            Manage problem creation, test case validation, updates, deletions, and video solutions from one central dashboard.
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {adminOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div
                key={option.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:border-slate-300 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${option.badgeColor}`}>
                      <IconComponent size={24} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Action</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    {option.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-600 mb-6">
                    {option.description}
                  </p>
                </div>

                <div>
                  <NavLink
                    to={option.route}
                    className={`btn w-full rounded-xl ${option.btnClass} flex items-center justify-center gap-2 font-semibold`}
                  >
                    <span>Manage {option.title}</span>
                    <ArrowRight size={16} />
                  </NavLink>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Admin;
