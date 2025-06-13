import React from "react";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

const blogPosts = [
  {
    id: 1,
    title: "10 Essential Travel Photography Tips for Beginners",
    excerpt:
      "Capture stunning memories with these professional photography techniques that will transform your travel photos.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Photography",
  },
  {
    id: 2,
    title: "Budget Travel: How to See the World for Less",
    excerpt:
      "Discover proven strategies to travel more while spending less, from finding cheap flights to budget accommodations.",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=250&fit=crop",
    author: "Mike Chen",
    date: "2024-01-12",
    readTime: "8 min read",
    category: "Budget Travel",
  },
  {
    id: 3,
    title: "Solo Female Travel: Safety Tips and Destinations",
    excerpt:
      "Empowering guide for women traveling alone, featuring the safest destinations and essential safety tips.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop",
    author: "Emma Rodriguez",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Solo Travel",
  },
];

const BlogPreview = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-soft-sand">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-gentle-olive/20 text-gentle-olive-dark rounded-full text-sm font-medium mb-4">
            {t("blog.sectionTag")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-deep-charcoal mb-6">
            {t("blog.title")}
          </h2>
          <p className="text-xl text-cool-gray max-w-2xl mx-auto">
            {t("blog.subtitle")}
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-blue transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-deep-charcoal text-sm font-medium rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-cool-gray mb-3">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-deep-charcoal mb-3 group-hover:text-natural-blue transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-cool-gray mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-cool-gray">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>

                  <button className="flex items-center gap-2 text-natural-blue hover:text-natural-blue-dark transition-colors group/btn">
                    <span className="text-sm font-medium">
                      {t("blog.readMore")}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="inline-flex items-center px-8 py-4 bg-gentle-olive text-white font-semibold rounded-xl hover:bg-gentle-olive-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            <span>{t("blog.viewAll")}</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
