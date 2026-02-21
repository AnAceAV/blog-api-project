import React from 'react';

function PostList({ posts, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">No posts yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {post.title}
            </h2>
            <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
              <span>By: {post.author}</span>
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-700 mb-4 line-clamp-3">
              {post.content}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => onEdit(post.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(post.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default PostList;
