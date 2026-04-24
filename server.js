const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// In-memory Database (Replace with MongoDB for permanent storage)
let posts = [
    { id: 1, author: 'Kai', content: 'Minimalism is key.', likes: [], comments: [] }
];
let messages = [];

// ACTION: Post Opinion
app.post('/api/posts', (req, res) => {
    const newPost = { id: Date.now(), ...req.body, likes: [], comments: [] };
    posts.unshift(newPost);
    res.json(newPost);
});

// ACTION: Like/Unlike Check & Execute
app.post('/api/posts/:id/like', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    const { userId } = req.body;
    if (!post) return res.status(404).send();

    const index = post.likes.indexOf(userId);
    if (index === -1) {
        post.likes.push(userId); // Like
    } else {
        post.likes.splice(index, 1); // Unlike
    }
    res.json(post);
});

// ACTION: Comment
app.post('/api/posts/:id/comment', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    post.comments.push(req.body); // { user, text }
    res.json(post);
});

// ACTION: Direct Messaging
app.post('/api/messages', (req, res) => {
    const msg = { ...req.body, timestamp: new Date() };
    messages.push(msg);
    res.json(msg);
});

app.listen(5000, () => console.log('Void Server running on port 5000'));
