// src/pages/Projects.jsx

import React from 'react';
import ProjectCard from '../components/ProjectCard'; // Import our new component

// Sample data for our projects. We can change this later.
const projectData = [
  {
    id: 1,
    title: 'EagerDevelopers Website',
    description: 'A complete rebuild of the company website using a modern stack including React and Tailwind CSS.',
    imageUrl: '/images/slider/slider (1).webp', // Using an image from your public folder
    tags: ['React', 'Tailwind CSS', 'Vite'],
  },
  {
    id: 2,
    title: 'Personal Portfolio',
    description: 'A responsive personal portfolio to showcase skills and projects to potential employers.',
    imageUrl: '/images/slider/slider (2).webp',
    tags: ['Next.js', 'Framer Motion'],
  },
  {
    id: 3,
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce site with a shopping cart, payment integration, and admin dashboard.',
    imageUrl: '/images/slider/slider (3).webp',
    tags: ['React', 'Node.js', 'Stripe'],
  },
];

const Projects = () => {
  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Our Projects</h1>
          <p className="text-lg text-gray-600 mt-4">A selection of our favorite work.</p>
        </div>

        {/* Responsive Grid for Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              tags={project.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;