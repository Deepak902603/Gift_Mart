import React from "react";
import { Link } from "react-router-dom"; // ✅ Import added
import blogimg1 from "../../assets/blog-1.jpg";
import blogimg2 from "../../assets/blog-2.jpg";
import blogimg3 from "../../assets/blog-3.jpg";
import blogimg4 from "../../assets/blog-4.jpg";
import blogimg5 from "../../assets/blog-5.jpg";

const blogpost = [
  {
    id: 1,
    image: blogimg1,
    title: "Robot Wars - Post with Gallery",
    meta: "Design , Tech • Mar 4, 2016",
    excerpt:
      "Virtual reality isn’t an escape from life, but a new way to experience it.",
  },
  {
    id: 2,
    image: blogimg2,
    title: "AI in Everyday Life",
    meta: "AI , Innovation • Jan 10, 2017",
    excerpt:
      "Artificial Intelligence is not just about robots; it's about making life smarter and simpler.",
  },
  {
    id: 3,
    image: blogimg3,
    title: "The Future of Design",
    meta: "Design , Creativity • Aug 22, 2018",
    excerpt:
      "Good design is not just what it looks like, but how it works and makes people feel.",
  },
  {
    id: 4,
    image: blogimg4,
    title: "Rise of Smart Cities",
    meta: "Tech , Urban • Nov 12, 2019",
    excerpt:
      "Smart cities are built not just with technology, but with sustainable ideas that shape society.",
  },
  {
    id: 5,
    image: blogimg5,
    title: "Coding for Tomorrow",
    meta: "Programming , Education • Feb 5, 2020",
    excerpt: "Learning to code is learning to create the future.",
  },
];

const Blog = () => {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="w-full bg-yellow-100 py-4 px-[8%] lg:px-[12%]">
        <div className="text-lg text-gray-600 flex justify-center items-center space-x-2">
          <Link to="/" className="hover:underline text-gray-700 font-medium">
            Home
          </Link>
          <span className="text-gray-500">&nbsp; / &nbsp;</span>
          <span className="text-yellow-700 font-semibold">Blog</span>
        </div>
      </div>

      {/* Header */}
      <div
        className="relative flex items-center justify-center h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${blogimg1})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 text-center text-white px-[8%] lg:px-[12%]">
          <p className="uppercase tracking-widest text-xs sm:text-sm text-gray-300 mb-2">
            Latest Stories
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 font-bricolage">
            Our Blog
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">
            Stay updated with insights, ideas, and stories from the digital
            world.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="px-[8%] lg:px-[12%] py-16 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogpost.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            >
              <div className="overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5 text-left">
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">
                  {post.meta}
                </p>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-yellow-500 transition">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.id}`}
                  className="mt-4 inline-block text-sm text-yellow-600 font-semibold hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
