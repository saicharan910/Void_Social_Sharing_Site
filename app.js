// 1. Extended State Management
const DB = {
    elena: { id: 'elena', name: "Elena Morse", signal: 94, posts: [] },
    kai: { id: 'kai', name: "Kai Nakamura", signal: 88, posts: [] },
    sol: { id: 'sol', name: "Sol Vega", signal: 99, posts: [] }
};

// Global Feed (Simulating a database)
let feedData = [
    { id: 1, author: 'kai', content: "Vanilla JS is all you need.", likes: [], comments: [] },
    { id: 2, author: 'elena', content: "The grid is a guide, not a cage.", likes: [], comments: [] }
];

let currentPersona = 'elena';
let isStalkMode = false;

// 2. Core Actions: Check and Execute
function handleLike(postId) {
    const post = feedData.find(p => p.id === postId);
    const likeIndex = post.likes.indexOf(currentPersona);

    if (likeIndex === -1) {
        // EXECUTE: Add Like
        post.likes.push(currentPersona);
    } else {
        // EXECUTE: Remove Like (Toggle)
        post.likes.splice(likeIndex, 1);
    }
    render();
}

function handleComment(postId) {
    const input = document.getElementById(`comment-in-${postId}`);
    const text = input.value.trim();
    
    if (text) {
        const post = feedData.find(p => p.id === postId);
        post.comments.push({
            user: currentPersona,
            text: text,
            time: 'Just now'
        });
        render();
    }
}

function createNewPost() {
    const input = document.getElementById('new-post-content');
    const content = input.value.trim();

    if (content) {
        const newPost = {
            id: Date.now(),
            author: currentPersona,
            content: content,
            likes: [],
            comments: []
        };
        feedData.unshift(newPost); // Add to top of feed
        input.value = '';
        render();
    }
}

// 3. Navigation & Search
function searchProfiles() {
    const query = document.getElementById('search-query').value.toLowerCase();
    const results = Object.values(DB).filter(u => 
        u.name.toLowerCase().includes(query)
    );
    // Display logic for search results...
    console.log("Found:", results);
}

function switchUser(id) {
    currentPersona = id;
    render();
}

// 4. The Render Engine
function render() {
    const user = DB[currentPersona];
    document.getElementById('active-user-badge').innerHTML = `<b>${user.name}</b>`;
    document.getElementById('signal-meter').innerText = `${user.signal}%`;
    
    const feed = document.getElementById('feed-root');
    
    // Logic: If Stalk Mode is ON, only show posts from currentPersona
    const displayPosts = isStalkMode 
        ? feedData.filter(p => p.author === currentPersona) 
        : feedData;

    feed.innerHTML = displayPosts.map(post => `
        <article class="post">
            <div class="post-header">
                <strong>@${post.author}</strong>
            </div>
            <p>${post.content}</p>
            
            <div class="actions">
                <button onclick="handleLike(${post.id})">
                    ${post.likes.includes(currentPersona) ? '❤️' : '🤍'} ${post.likes.length}
                </button>
            </div>

            <div class="comments-section">
                ${post.comments.map(c => `<div class="comment"><b>${c.user}:</b> ${c.text}</div>`).join('')}
                <div class="comment-input-wrapper">
                    <input type="text" id="comment-in-${post.id}" placeholder="Add a comment...">
                    <button onclick="handleComment(${post.id})">➜</button>
                </div>
            </div>
        </article>
    `).join('');
}

// UI Toggles
function toggleStalkMode() {
    isStalkMode = !isStalkMode;
    document.getElementById('stalk-btn').innerText = `Stalk Mode: ${isStalkMode ? 'ON' : 'OFF'}`;
    document.body.classList.toggle('stalk-active', isStalkMode);
    render(); // Re-render to filter feed
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
}

// Initial Launch
render();
