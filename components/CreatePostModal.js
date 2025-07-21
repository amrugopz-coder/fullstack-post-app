import { useState } from 'react';

export default function CreatePostModal({ onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = () => {
    const newPost = {
      id: Date.now(), // temporary ID
      title,
      body
    };
    onCreate(newPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Post</h2>
        <label className="block mb-2">
          Title:
          <input
            className="w-full border px-2 py-1 mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="block mb-2">
          Body:
          <textarea
            className="w-full border px-2 py-1 mt-1"
            rows="4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </label>
        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={onClose} className="px-4 py-1 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-1 bg-blue-600 text-white rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
