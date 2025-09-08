import ProjectCard from "../components/ProjectCard";
import SimpleFooter from "../components/SimpleFooter";
import { projectData } from "../data/projects";
import { motion } from "framer-motion";

const Projects: React.FC = () => {
  return (
    <>
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold font-Hilda text-cyan-500">
              پروژه‌های ما
            </h1>
            <p className="text-lg text-gray-600 mt-4 font-Pelak">
              مجموعه‌ای از بهترین کارهای ما
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {projectData.map((project) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.95 },
                  show: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <SimpleFooter />
    </>
  );
};

export default Projects;
