import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/projects/${project.id}`} className="block">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 h-full">
        <img
          className="w-full h-48 object-cover"
          src={project.imageUrl}
          alt={project.title}
        />
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {project.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-sky-100 text-sky-800 text-xs font-semibold px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
