import React from 'react';
import { Plus, Edit, Trash2, Video } from 'lucide-react';
import { NavLink } from 'react-router';

function Admin() {
  const adminOptions = [
    {
      id: 'create',
      title: 'Create Problem',
      description: 'Add a new coding problem to the platform',
      icon: Plus,
      color: 'btn-success',
      bgColor: 'bg-success/10',
      route: '/admin/create'
    },
    {
      id: 'update',
      title: 'Update Problem',
      description: 'Edit existing problems and their details',
      icon: Edit,
      color: 'btn-warning',
      bgColor: 'bg-warning/10',
      route: '/admin/update'
    },
    {
      id: 'delete',
      title: 'Delete Problem',
      description: 'Remove problems from the platform',
      icon: Trash2,
      color: 'btn-error',
      bgColor: 'bg-error/10',
      route: '/admin/delete'
    },
    {
      id: 'video',
      title: 'Video Problem',
      description: 'Upload And Delete Videos',
      icon: Video,
      color: 'btn-success',
      bgColor: 'bg-success/10',
      route: '/admin/video'
    }
  ];

  return (
    <div className="app-shell min-h-screen px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="glass-panel mb-12 rounded-[2rem] p-8 text-center">
          <span className="section-kicker mb-5">Control Center</span>
          <h1 className="section-title text-base-content">
            Admin Panel
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-base-content/70">
            Manage problem creation, deletion, and media from one polished workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {adminOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div
                key={option.id}
                className="glass-panel card rounded-[2rem] border-0 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
              >
                <div className="card-body items-center text-center p-8">
                  <div className={`${option.bgColor} mb-4 rounded-full p-4 ring-1 ring-slate-200`}>
                    <IconComponent size={32} className="text-slate-800" />
                  </div>
                  <h2 className="card-title text-xl mb-2">
                    {option.title}
                  </h2>
                  <p className="text-base-content/70 mb-6">
                    {option.description}
                  </p>
                  <div className="card-actions">
                    <NavLink 
                    to={option.route}
                   className={`btn ${option.color} btn-wide rounded-2xl`}
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
