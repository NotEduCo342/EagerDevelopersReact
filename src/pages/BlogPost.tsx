import React from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { 
  FaCalendarAlt, 
  FaClock, 
  FaTag,
  FaArrowRight,
  FaTwitter,
  FaTelegramPlane
} from "react-icons/fa";
import SimpleFooter from "../components/SimpleFooter";

// Mock data for a single blog post
const mockBlogPost = {
  id: "1",
  title: "راهنمای کامل طراحی رابط کاربری مدرن با React",
  slug: "modern-react-ui-guide",
  content: `
    <div class="prose prose-lg max-w-none font-Yekan">
      <p>در دنیای امروز، طراحی رابط کاربری یکی از مهم‌ترین جنبه‌های توسعه وب محسوب می‌شود. React به عنوان یکی از محبوب‌ترین کتابخانه‌های JavaScript، ابزارهای قدرتمندی برای ساخت رابط‌های کاربری مدرن و تعاملی ارائه می‌دهد.</p>
      
      <h2>چرا React برای طراحی UI مدرن؟</h2>
      <p>React با ارائه Component-Based Architecture، امکان ساخت رابط‌های کاربری قابل استفاده مجدد و قابل نگهداری را فراهم می‌کند. این ویژگی‌ها باعث می‌شود تا توسعه‌دهندگان بتوانند:</p>
      
      <ul>
        <li>کامپوننت‌های قابل استفاده مجدد بسازند</li>
        <li>کد تمیزتر و منظم‌تری بنویسند</li>
        <li>عملکرد بهتری داشته باشند</li>
        <li>تست‌نویسی آسان‌تری انجام دهند</li>
      </ul>

      <h2>بهترین Practice های طراحی با React</h2>
      <p>برای طراحی رابط کاربری مؤثر با React، رعایت اصول زیر ضروری است:</p>

      <h3>1. استفاده از Hooks مدرن</h3>
      <p>Hooks مانند useState، useEffect و useContext امکانات قدرتمندی برای مدیریت state و side effects ارائه می‌دهند.</p>

      <pre><code>const [count, setCount] = useState(0);

useEffect(() => {
  document.title = \`شما \${count} بار کلیک کردید\`;
}, [count]);</code></pre>

      <h3>2. Component Composition</h3>
      <p>به جای استفاده از inheritance، از composition استفاده کنید تا کامپوننت‌های انعطاف‌پذیرتری بسازید.</p>

      <h3>3. Performance Optimization</h3>
      <p>از تکنیک‌هایی مانند React.memo، useMemo و useCallback برای بهینه‌سازی عملکرد استفاده کنید.</p>

      <h2>ابزارهای مفید برای طراحی UI</h2>
      <p>برای طراحی رابط کاربری مدرن با React، ابزارهای زیر بسیار مفید هستند:</p>

      <ul>
        <li><strong>Tailwind CSS:</strong> برای styling سریع و responsive</li>
        <li><strong>Framer Motion:</strong> برای انیمیشن‌های حرفه‌ای</li>
        <li><strong>React Hook Form:</strong> برای مدیریت فرم‌ها</li>
        <li><strong>React Router:</strong> برای navigation</li>
      </ul>

      <h2>نتیجه‌گیری</h2>
      <p>طراحی رابط کاربری مدرن با React نیازمند درک عمیق از اصول طراحی، architecture های مدرن و ابزارهای مناسب است. با رعایت best practice ها و استفاده از ابزارهای مناسب، می‌توانید رابط‌های کاربری زیبا و کارآمدی بسازید.</p>
    </div>
  `,
  featuredImage: "/images/slider/slider (1).webp",
  author: {
    name: "خانم بهبودی",
    avatar: "/EagerFav.png",
    bio: "مدرس و توسعه‌دهنده وب با بیش از 5 سال تجربه در طراحی و توسعه وبسایت‌های مدرن"
  },
  category: "آموزش React",
  tags: ["React", "UI/UX", "Tailwind", "Modern Web"],
  publishedAt: "1403/06/15",
  readingTime: 8,
  isPublished: true
};

const relatedPosts = [
  {
    id: "2",
    title: "بهترین پرکتیس‌های TypeScript برای پروژه‌های بزرگ",
    slug: "typescript-best-practices",
    featuredImage: "/images/slider/slider (2).webp"
  },
  {
    id: "3", 
    title: "انیمیشن‌های وب با Framer Motion: از مبتدی تا پیشرفته",
    slug: "framer-motion-animations",
    featuredImage: "/images/slider/slider (3).webp"
  }
];

const BlogPost: React.FC = () => {
  // For demonstration purposes, show the mock post regardless of slug
  // In production, you would fetch the post based on the slug parameter
  const currentPost = mockBlogPost;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden" dir="rtl">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br from-emerald-200/30 to-teal-300/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Back to Blog Button */}
        <motion.div
          className="max-w-4xl mx-auto px-4 pt-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium mb-8 font-Yekan"
          >
            <FaArrowRight />
            بازگشت به بلاگ
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          className="max-w-4xl mx-auto px-4 mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden">
            <img 
              src={currentPost.featuredImage} 
              alt={currentPost.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="p-8">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-Yekan">
                  {currentPost.category}
                </span>
                <div className="flex items-center gap-2 text-gray-500 text-sm font-Yekan">
                  <FaCalendarAlt />
                  <span>{currentPost.publishedAt}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm font-Yekan">
                  <FaClock />
                  <span>{currentPost.readingTime} دقیقه مطالعه</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 font-Pelak">
                {currentPost.title}
              </h1>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img 
                    src={currentPost.author.avatar} 
                    alt={currentPost.author.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-800 font-Yekan">{currentPost.author.name}</p>
                    <p className="text-sm text-gray-500 font-Yekan">نویسنده</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500 font-Yekan">اشتراک‌گذاری:</span>
                  <button className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors">
                    <FaTwitter />
                  </button>
                  <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                    <FaTelegramPlane />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="max-w-4xl mx-auto px-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: currentPost.content }}
            />
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div
          className="max-w-4xl mx-auto px-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaTag className="text-emerald-600" />
              <span className="font-medium text-gray-800 font-Yekan">برچسب‌ها:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentPost.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-Yekan"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Author Bio */}
        <motion.div
          className="max-w-4xl mx-auto px-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 font-Pelak">درباره نویسنده</h3>
            <div className="flex items-start gap-4">
              <img 
                src={currentPost.author.avatar} 
                alt={currentPost.author.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h4 className="font-medium text-gray-800 mb-2 font-Yekan">{currentPost.author.name}</h4>
                <p className="text-gray-600 font-Yekan">{currentPost.author.bio}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        <motion.div
          className="max-w-6xl mx-auto px-4 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center font-Pelak">مقالات مرتبط</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <img 
                  src={post.featuredImage} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-3 font-Pelak">
                    {post.title}
                  </h4>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 font-Yekan"
                  >
                    مطالعه مقاله
                    <FaArrowRight />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Simple Footer */}
        <div dir="ltr">
          <SimpleFooter />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
