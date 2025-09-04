import React, { useState, useRef } from "react";
import type { ProjectCardProps } from '@/types';

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  let hoverTimeout: NodeJS.Timeout;

  const handleMouseEnter = (): void => {
    hoverTimeout = setTimeout(() => {
      setHovered(true);
      videoRef.current?.play();
    }, 1000);
  };

  const handleMouseLeave = (): void => {
    clearTimeout(hoverTimeout);
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
       // <Link to={`/projects/${project.id}`} className="block">
    <a href={project.addres} target="_blank" rel="noopener noreferrer">
      <div
        className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 h-full font-Pelak relative"
        dir="rtl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
   
        {!hovered && (
          <img
            className="w-full h-57 object-cover"
            src={project.imageUrl}
            alt={project.title}
          />
        )}

     
<video
  ref={videoRef}
  className={`w-full  rounded-t-lg  ${
    hovered ? "block" : "hidden"
  }`}
  src={project.video}
  muted
  loop
  playsInline
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
                className="bg-sky-100 text-sky-800 text-xs px-2.5 py-0.5 rounded-full"
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
