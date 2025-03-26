"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getAllBlogsThunk } from "@/redux/thunks/Blog";
import { IBlog } from "@/typings/blog";
import BlogCard from "@/components/common/blogCard";

const SkincareBlog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, status, error } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    dispatch(getAllBlogsThunk());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Blog Chăm Sóc Da</h1>
      <p className="text-center text-gray-600 mb-8">
        Cung cấp thông tin hữu ích về chăm sóc da từ các nguồn uy tín như WebMD và Healthline.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {Array.isArray(blogs) && blogs.map((blog: IBlog) => (
          <div key={blog._id}>
            <BlogCard
              image={blog.image}
              title={blog.title}
              description={blog.description}
              link={blog.link}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkincareBlog;
