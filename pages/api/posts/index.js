import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(posts);
  }

  else if (req.method === 'POST') {
    const { title, body, wordCount } = req.body;

    if (!title || !body || typeof wordCount !== 'number') {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        body,
        wordCount
      }
    });

    res.status(201).json(newPost);
  }

  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
