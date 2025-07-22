// src/pages/Blog.jsx
import React from "react";
import "./Blog.css";

const Blog = () => {
  return (
    <div className="blog-container">
      <h1>Our Blog</h1>

      <div className="blog-post">
        <h2>🛵 How to Choose a Used Bike That Lasts</h2>
        <p>
          Buying a used bike? Make sure to check the engine condition, mileage, and previous ownership history. Learn more tips in our full guide.
        </p>
      </div>

      <div className="blog-post">
        <h2>🚗 Top 5 Cars Under ₹3 Lakhs in 2025</h2>
        <p>
          Affordable and reliable – we list the best used cars that balance mileage, price, and style. This year’s picks are surprisingly good!
        </p>
      </div>

      <div className="blog-post">
        <h2>💡 Why Verify Your Seller Before Payment?</h2>
        <p>
          In this article, we explore the importance of contacting sellers directly and how to avoid fraud when buying a vehicle online.
        </p>
      </div>
    </div>
  );
};

export default Blog;
