// Ensure VOID_STATE exists in data.js or initialize here
if (typeof VOID_STATE === 'undefined') {
    var VOID_STATE = {
        posts: [
            { id: 1, author: 'Kai', content: 'Design is not what it looks like, it is how it works.', likes: [], comments: [] },
            { id: 2, author: 'Sol', content: 'Minimalism is the ultimate sophistication.', likes: [], comments: [] }
        ]
    };
}

function render() {
    const feed = document.getElementById('feed-root');
    feed.innerHTML = VOID_STATE.posts.map(post => `
        <article class="post">
            <div class="post-header" style="display:flex; justify-content:space-between; margin-bottom:15px;">
                <strong onclick="openUserProfile('${post.author}')" style="cursor:pointer">@${post.author}</strong>
                <span style="color:var(--dim); font-size:12px;">Active Signal</span>
            </div>
            <div class="post-body">
                <p style="font-size: 1.05rem; margin:0;">${post.content}</p>
            </div>
            <div class="post-footer" style="margin-top:20px; display:flex; gap:20px;">
                <button onclick="handleLike(${post.id})" class="action-btn">
                    ${post.likes.includes('Charan') ? '❤️' : '🤍'} ${post.likes.length}
                </button>
                <button onclick="handleComment(${post.id})" class="action-btn">💬 ${post.comments.length}</button>
            </div>
        </article>
    `).join('');
}

function executePost() {
    const input = document.getElementById('opinion-input');
    if (!input.value.trim()) return;

    const newPost = {
        id: Date.now(),
        author: 'Charan',
        content: input.value,
        likes: [],
        comments: []
    };
    
    VOID_STATE.posts.unshift(newPost);
    input.value = '';
    render();
}

function openMyProfile() {
    document.getElementById('feed-root').innerHTML = `
        <div class="profile-hero" style="text-align:center; padding:40px 0;">
            <img src="https://api.dicebear.com/7.x/initials/svg?seed=Charan" style="width:80px; border-radius:50%; border:2px solid #fff;">
            <h2>Charan</h2>
            <p style="color:var(--dim)">Total Perspective Shares: ${VOID_STATE.posts.filter(p => p.author === 'Charan').length}</p>
        </div>
    `;
    const myPosts = VOID_STATE.posts.filter(p => p.author === 'Charan');
    if(myPosts.length > 0) render(); // Re-render feed with filtered posts
}

// Global initialization
render();
