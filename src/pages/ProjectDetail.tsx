import React from "react";
import { useParams, Link } from "react-router-dom";
import { projectData } from "../data/projects";
import { FaExternalLinkAlt } from "react-icons/fa";
import SimpleFooter from "../components/SimpleFooter";
import type { Project } from '@/types';

interface ProjectDetailParams extends Record<string, string | undefined> {
  projectId: string;
}

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<ProjectDetailParams>();
  const project: Project | undefined = projectData.find((p: Project) => p.id === projectId);

  if (!project) {
    return (
      <>
        <div className="bg-white pt-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">پروژه یافت نشد</h1>
            <Link
              to="/projects"
              className="text-sky-600 hover:text-sky-800 font-semibold transition-colors"
            >
              بازگشت به همه‌ی پروژه‌ها
            </Link>
          </div>
        </div>
        <SimpleFooter />
      </>
    );
  }

  return (
    <div className="bg-white pt-24">
      <div className="w-full h-56 md:h-80 bg-gray-200">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-sky-100 text-sky-800 text-sm font-semibold px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="max-w-none text-gray-700 space-y-4 text-lg">
              <p>{project.description}</p>
            </div>

            <div className="mt-12">
              <Link
                to="/projects"
                className="text-sky-600 hover:text-sky-800 font-semibold transition-colors"
              >
                &larr; بازگشت به همه‌ی پروژه‌ها
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                اطلاعات پروژه
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-600">تکنولوژی‌ها</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-sky-100 text-sky-800 text-sm font-semibold px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <a
                href="#"
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
      <SimpleFooter />
    </div>
  );
};

export default ProjectDetail;
