// src/pages/ProjectDetail.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectData } from '../data/projects';
import { FaExternalLinkAlt } from 'react-icons/fa';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projectData.find(p => p.id === projectId);

  if (!project) {
    // ... (error message remains the same)
  }

  return (
    // Add pt-24 (padding-top) to this main div to push content below the navbar
    <div className="bg-white pt-24"> 
      {/* Banner Image */}
      <div className="w-full h-56 md:h-80 bg-gray-200">
        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover"/>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left Column: Long Description */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">{project.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span key={tag} className="bg-sky-100 text-sky-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            {/* I've removed the 'prose' class for now to keep things simple */}
            <div className="max-w-none text-gray-700 space-y-4 text-lg">
              <p>{project.longDescription}</p>
            </div>
            
            <div className="mt-12">
               <Link to="/projects" className="text-sky-600 hover:text-sky-800 font-semibold transition-colors">
                &larr; بازگشت به همه‌ی پروژه‌ها
              </Link>
            </div>
          </div>

          {/* Right Column: Details Box */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">اطلاعات پروژه</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-600">تکنولوژی‌ها</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="bg-sky-100 text-sky-800 text-sm font-semibold px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <a 
                href="#" // IMPORTANT: Replace with the actual project URL later
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-6 w-full flex items-center justify-center bg-sky-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-600 transition-colors duration-300"
              >
                مشاهده سایت
                <FaExternalLinkAlt className="mr-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;