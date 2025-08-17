import ProjectCard from "../components/ProjectCard";

import { projectData } from "../data/projects";

const Projects = () => {
  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            پروژه‌های ما
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            مجموعه‌ای از بهترین کارهای ما.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
