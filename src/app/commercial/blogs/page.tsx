"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getAllBlogsThunk } from "@/redux/thunks/Blog";
import { IBlog } from "@/typings/blog";
import BlogCard from "@/components/common/blogCard";

const SkincareBlog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, status, error } = useSelector(
    (state: RootState) => state.blog
  );

  useEffect(() => {
    dispatch(getAllBlogsThunk());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Đang tải...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500 min-h-[50vh] flex items-center justify-center">
          <div>
            <p className="text-xl mb-2">Đã xảy ra lỗi</p>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
        Blog Chăm Sóc Da
      </h1>
      <p className="text-center text-gray-600 mb-6 sm:mb-8 px-4 sm:px-8 max-w-3xl mx-auto">
        Cung cấp thông tin hữu ích về chăm sóc da từ các nguồn uy tín như WebMD
        và Healthline.
      </p>

      {Array.isArray(blogs) && blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {blogs.map((blog: IBlog) => (
            <div key={blog._id} className="h-full">
              <BlogCard
                image={blog.image}
                title={blog.title}
                description={blog.description}
                link={blog.link}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Không có bài viết nào.</p>
        </div>
      )}
    </div>
  );
};

export default SkincareBlog;
