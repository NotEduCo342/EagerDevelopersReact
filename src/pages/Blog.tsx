import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaSearch, 
  FaCalendarAlt, 
  FaClock, 
  FaArrowLeft 
} from "react-icons/fa";
import SimpleFooter from "../components/SimpleFooter";
const mockBlogPosts = [
  {
    id: "1",
    title: "راهنمای کامل طراحی رابط کاربری مدرن با React",
    slug: "modern-react-ui-guide",
    excerpt: "در این مقاله با جدیدترین تکنیک‌های طراحی رابط کاربری با React و Tailwind CSS آشنا می‌شوید.",
    featuredImage: "/images/slider/slider (1).webp",
    author: {
      name: "خانم بهبودی",
      avatar: "/EagerFav.png"
    },
    category: "آموزش React",
    tags: ["React", "UI/UX", "Tailwind"],
    publishedAt: "1403/06/15",
    readingTime: 8,
    isPublished: true
  },
  {
    id: "2", 
    title: "بهترین پرکتیس‌های TypeScript برای پروژه‌های بزرگ",
    slug: "typescript-best-practices",
    excerpt: "تکنیک‌های پیشرفته TypeScript که کیفیت کد شما را بهبود می‌دهد و خطاها را کاهش می‌دهد.",
    featuredImage: "/images/slider/slider (2).webp",
    author: {
      name: "خانم بهبودی",
      avatar: "/EagerFav.png"
    },
    category: "توسعه وب",
    tags: ["TypeScript", "Best Practices", "Development"],
    publishedAt: "1403/06/10",
    readingTime: 12,
    isPublished: true
  },
  {
    id: "3",
    title: "انیمیشن‌های وب با Framer Motion: از مبتدی تا پیشرفته",
    slug: "framer-motion-animations",
    excerpt: "یاد بگیرید چگونه انیمیشن‌های حرفه‌ای و جذاب برای وبسایت‌تان با Framer Motion بسازید.",
    featuredImage: "/images/slider/slider (3).webp",
    author: {
      name: "خانم بهبودی", 
      avatar: "/EagerFav.png"
    },
    category: "انیمیشن",
    tags: ["Framer Motion", "Animation", "React"],
    publishedAt: "1403/06/05",
    readingTime: 15,
    isPublished: true
  }
];

const categories = ["همه", "آموزش React", "توسعه وب", "انیمیشن", "طراحی UI"];

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");

  const filteredPosts = mockBlogPosts.filter(post => {
    const matchesSearch = post.title.includes(searchTerm) || post.excerpt.includes(searchTerm);
    const matchesCategory = selectedCategory === "همه" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
        <motion.div
          className="absolute -bottom-10 -left-10 w-96 h-96 bg-gradient-to-br from-teal-200/20 to-emerald-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center py-20 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6 font-Pelak"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            بلاگ EagerDevelopers
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto font-Yekan"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            آخرین مقالات و آموزش‌های طراحی وب، برنامه‌نویسی و تکنولوژی
          </motion.p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          className="max-w-6xl mx-auto px-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Search Bar */}
          <div className="relative mb-8 max-w-md mx-auto">
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
            <input
              type="text"
              placeholder="جستجو در مقالات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm font-Yekan"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 font-Yekan ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                    : "bg-white/70 backdrop-blur-sm text-gray-600 hover:bg-white hover:shadow-md"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && filteredPosts[0] && (
          <motion.div
            className="max-w-6xl mx-auto px-4 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center font-Pelak">مقاله ویژه</h2>
            <motion.div
              className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={filteredPosts[0].featuredImage} 
                    alt={filteredPosts[0].title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-Yekan">
                      {filteredPosts[0].category}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500 text-sm font-Yekan">
                      <FaClock />
                      <span>{filteredPosts[0].readingTime} دقیقه مطالعه</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 font-Pelak">
                    {filteredPosts[0].title}
                  </h3>
                  <p className="text-gray-600 mb-6 font-Yekan">
                    {filteredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={filteredPosts[0].author.avatar} 
                        alt={filteredPosts[0].author.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-800 font-Yekan">{filteredPosts[0].author.name}</p>
                        <p className="text-sm text-gray-500 font-Yekan">{filteredPosts[0].publishedAt}</p>
                      </div>
                    </div>
                    <Link
                      to={`/blog/${filteredPosts[0].slug}`}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2 font-Yekan"
                    >
                      ادامه مطالعه
                      <FaArrowLeft />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <motion.div
          className="max-w-6xl mx-auto px-4 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center font-Pelak">آخرین مقالات</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className="relative">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-Yekan">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 font-Pelak">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 font-Yekan">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4 font-Yekan">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt />
                      <span>{post.publishedAt}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock />
                      <span>{post.readingTime} دقیقه</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img 
                        src={post.author.avatar} 
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-700 font-Yekan">{post.author.name}</span>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 font-Yekan"
                    >
                      مطالعه
                      <FaArrowLeft />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xl text-gray-600 font-Yekan">هیچ مقاله‌ای یافت نشد</p>
          </motion.div>
        )}

        {/* Simple Footer */}
        <div dir="ltr">
          <SimpleFooter />
        </div>
      </div>
    </div>
  );
};

export default Blog;
