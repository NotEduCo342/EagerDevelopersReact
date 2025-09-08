import type { ProjectCardProps } from "@/types";

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <a href={project.addres} target="_blank" rel="noopener noreferrer">
      <div
        className="group relative bg-white rounded-2xl shadow-md overflow-hidden transform hover:-translate-y-3 hover:shadow-xl transition-all duration-500 h-full font-Pelak border border-gray-100"
        dir="rtl"
      >

        <div className="relative w-full aspect-video overflow-hidden">
          <img
            className="w-full h-full object-cover rounded-t-2xl transition-transform duration-700 group-hover:scale-105"
            src={project.imageUrl}
            alt={project.title}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent rounded-t-2xl pointer-events-none" />
        </div>

        <div className="p-6 relative z-10">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-sky-50 text-sky-700 text-xs font-medium px-3 py-1 rounded-full shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;
