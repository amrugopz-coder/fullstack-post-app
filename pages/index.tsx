import { useEffect, useState } from 'react';
import Link from 'next/link';
import CreatePostModal from '@/components/CreatePostModal';

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then((res) => res.json())
      .then((data: Post[]) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const handleCreatePost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  if (loading) return <p className="p-4">Loading posts...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>

      <div className="flex justify-end mb-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => setShowModal(true)}
        >
          + Create Post
        </button>
      </div>

      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Title</th>
            <th className="py-2 px-4 border">View</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4 border">{post.id}</td>
              <td className="py-2 px-4 border">{post.title}</td>
              <td className="py-2 px-4 border">
                <Link href={`/post/${post.id}`}>
                  <span className="text-blue-600 hover:underline cursor-pointer">
                    View
                  </span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <CreatePostModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreatePost}
        />
      )}
    </div>
  );
}
