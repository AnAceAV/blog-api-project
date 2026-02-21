import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState('list');
  const [editingId, setEditingId] = useState(null);

  const API_URL = 'http://localhost:4000';

  // Fetch all posts
  useEffect(() => {
    if (currentPage === 'list') {
      fetchPosts();
    }
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/posts`);
      setPosts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPost = async (newPost) => {
    try {
      const response = await axios.post(`${API_URL}/posts`, newPost);
      setPosts([response.data, ...posts]);
      setCurrentPage('list');
      setError(null);
    } catch (err) {
      setError('Failed to create post');
      console.error(err);
    }
  };

  const handleUpdatePost = async (id, updatedPost) => {
    try {
      const response = await axios.patch(`${API_URL}/posts/${id}`, updatedPost);
      setPosts(posts.map(post => post.id === id ? response.data : post));
      setCurrentPage('list');
      setEditingId(null);
      setError(null);
    } catch (err) {
      setError('Failed to update post');
      console.error(err);
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`${API_URL}/posts/${id}`);
        setPosts(posts.filter(post => post.id !== id));
        setError(null);
      } catch (err) {
        setError('Failed to delete post');
        console.error(err);
      }
    }
  };

  const handleEditClick = (id) => {
    setEditingId(id);
    setCurrentPage('edit');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-indigo-600">Blogrr.</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentPage('list')}
                className={`px-4 py-2 rounded-lg transition ${
                  currentPage === 'list'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                All Posts
              </button>
              <button
                onClick={() => setCurrentPage('create')}
                className={`px-4 py-2 rounded-lg transition ${
                  currentPage === 'create'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-white hover:bg-gray-300'
                }`}
              >
                New Post
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {currentPage === 'list' && (
          <PostList
            posts={posts}
            loading={loading}
            onEdit={handleEditClick}
            onDelete={handleDeletePost}
          />
        )}

        {currentPage === 'create' && (
          <CreatePost onSubmit={handleAddPost} />
        )}

        {currentPage === 'edit' && editingId && (
          <EditPost
            postId={editingId}
            onSubmit={handleUpdatePost}
            onCancel={() => {
              setCurrentPage('list');
              setEditingId(null);
            }}
          />
        )}
      </main>
    </div>
  );
}

export default App;
