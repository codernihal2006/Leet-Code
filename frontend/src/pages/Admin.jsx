import React from "react";
import { Plus, Edit, Trash2, Video } from "lucide-react";
import { NavLink } from "react-router";

function Admin() {
  const adminOptions = [
    {
      id: "create",
      title: "Create Problem",
      description: "Add a new coding problem to the platform",
      icon: Plus,
      color: "btn-success text-white",
      bgColor: "bg-emerald-100 text-emerald-800",
      route: "/admin/create"
    },
    {
      id: "update",
      title: "Update Problem",
      description: "Edit existing problems and their details",
      icon: Edit,
      color: "btn-warning text-slate-900",
      bgColor: "bg-amber-100 text-amber-800",
      route: "/admin/update"
    },
    {
      id: "delete",
      title: "Delete Problem",
      description: "Remove problems from the platform",
      icon: Trash2,
      color: "btn-error text-white",
      bgColor: "bg-rose-100 text-rose-800",
      route: "/admin/delete"
    },
    {
      id: "video",
      title: "Video Problem",
      description: "Upload And Delete Videos",
      icon: Video,
      color: "btn-info text-white",
      bgColor: "bg-sky-100 text-sky-800",
      route: "/admin/video"
    }
  ];

  return (
    <div className="app-shell min-h-screen px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="glass-panel mb-12 rounded-[2rem] p-8 text-center bg-white/95">
          <span className="section-kicker mb-5">Control Center</span>
          <h1 className="section-title text-slate-900 font-bold">
            Admin Panel
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 font-medium">
            Manage problem creation, deletion, and media from one polished workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {adminOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div
                key={option.id}
                className="glass-panel card rounded-[2rem] border border-slate-200/80 bg-white shadow-md hover:shadow-xl transition-shadow duration-200"
              >
                <div className="card-body items-center text-center p-8">
                  <div className={`${option.bgColor} mb-4 rounded-2xl p-4 shadow-sm`}>
                    <IconComponent size={32} />
                  </div>
                  <h2 className="card-title text-xl font-bold text-slate-900 mb-2">
                    {option.title}
                  </h2>
                  <p className="text-slate-600 text-base font-medium mb-6">
                    {option.description}
                  </p>
                  <div className="card-actions justify-center items-center w-full mt-2">
                    <NavLink 
                      to={option.route}
                      className={`btn ${option.color} btn-wide rounded-2xl font-bold text-center mx-auto`}
                    >
                      {option.title}
                    </NavLink>
                  </div>
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
