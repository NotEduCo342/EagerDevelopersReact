motion;
import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";

const techData = [
  {
    id: 1,
    icon: (
      <div className="flex drop-shadow-lg">
        <FaHtml5 size={50} className="text-orange-500" />
        <FaCss3Alt size={50} className="text-blue-500" />
      </div>
    ),
    title: "HTML5 & CSS3",
    description:
      "زبان‌های بنیادی برای ایجاد و استایل‌دهی صفحات وب زیبا و ساختاریافته.",
    gradient: "from-orange-400 to-red-500",
  },
  {
    id: 2,
    icon: <FaJsSquare size={50} className="text-yellow-400 drop-shadow-lg" />,
    title: "JavaScript",
    description:
      "زبان وب که تعامل و قابلیت‌های پویا را به سایت‌های شما می‌آورد.",
    gradient: "from-yellow-300 to-orange-400",
  },
  {
    id: 3,
    icon: <FaReact size={50} className="text-cyan-400 drop-shadow-lg" />,
    title: "React",
    description:
      "یک کتابخانه قدرتمند جاوااسکریپت برای ساخت رابط‌های کاربری پیچیده، سریع و مقیاس‌پذیر.",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    id: 4,
    icon: <SiNextdotjs size={50} className="text-white drop-shadow-lg" />,
    title: "Next.js",
    description:
      "فریم‌وُرک ری‌اکت برای محیط پروداکشن که رندر سمت سرور و تولید سایت استاتیک را ممکن می‌سازد.",
    gradient: "from-gray-700 to-black",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const TechStack = () => {
  return (
    <section id="tech-stack" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-800">
            ابزارهای ضروری برای یادگیری و توسعه وب
          </h2>
          <div className="w-24 h-1 bg-sky-500 mx-auto mt-4 mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            این‌ها تکنولوژی‌های اصلی هستند که بین تخیل و واقعیت پل می‌زنند و
            ایده‌های شما را به وب‌سایت‌های کاربردی تبدیل می‌کنند.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {techData.map((tech) => (
            <motion.div
              key={tech.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:scale-105 transition-all duration-300"
              variants={cardVariants}
            >
              <div
                className={`relative h-40 bg-gradient-to-br ${tech.gradient} flex items-center justify-center`}
              >
                <div className="relative z-10">{tech.icon}</div>
                <svg
                  className="absolute bottom-[-1px] left-0 w-full"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1440 320"
                >
                  <path
                    fill="#ffffff"
                    fillOpacity="1"
                    d="M0,224L60,229.3C120,235,240,245,360,234.7C480,224,600,192,720,176C840,160,960,160,1080,170.7C1200,181,1320,203,1380,213.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                  ></path>
                </svg>
              </div>
              <div className="p-8 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {tech.title}
                </h3>
                <p className="text-gray-600 text-sm">{tech.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
