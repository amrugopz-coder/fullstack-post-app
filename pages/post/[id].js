import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  // Fetch post data
  useEffect(() => {
    if (id) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPost(data);
          setEditedTitle(data.title);
        });
    }
  }, [id]);

  // Send post body to C++ API for analysis
  useEffect(() => {
    if (post?.body) {
      fetch('http://localhost:8080/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: post.body })
      })
        .then(res => res.json())
        .then(data => setAnalysis(data))
        .catch(err => console.error('C++ API error:', err));
    }
  }, [post?.body]);

  const handleTitleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      // Optimistic update
      setPost({ ...post, title: editedTitle });
      setIsSaving(false);
      alert('Title updated (not persisted)');
    }, 1000);
  };

  if (!post) return <p className="p-4">Loading post...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Post Detail</h1>
      <p><strong>ID:</strong> {post.id}</p>

      <div className="my-4">
        <label className="block font-semibold mb-1">Title:</label>
        <input
          className="border px-2 py-1 w-full"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <button
          className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleTitleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Title'}
        </button>
      </div>

      <div>
        <h2 className="font-semibold mt-4 mb-2">Body:</h2>
        <p className="bg-gray-100 p-2 rounded">{post.body}</p>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold mb-2">C++ Analysis (Live)</h2>
        {analysis ? (
          <>
            <p><strong>Word Count:</strong> {analysis.wordCount}</p>
            <p><strong>Keyword:</strong> {analysis.sampleKeyword || 'N/A'}</p>
          </>
        ) : (
          <p>Analyzing...</p>
        )}
      </div>
    </div>
  );
}
