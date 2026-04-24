// State stored in Browser Memory (LocalStorage) so it stays even if refreshed
let state = JSON.parse(localStorage.getItem('void_data')) || {
    posts: [
        { id: 1, author: 'Elena', content: 'Form follows function.', likes: [], comments: [] },
        { id: 2, author: 'Kai', content: 'Vanilla JS is high-signal.', likes: [], comments: [] }
    ]
};

function save() { localStorage.setItem('void_data', JSON.stringify(state)); }

function render() {
    const feed = document.getElementById('feed-root');
    feed.innerHTML = state.posts.map(post => `
        <article class="post">
            <div class="post-header" style="margin-bottom:15px; cursor:pointer" onclick="viewProfile('${post.author}')">
                <strong>@${post.author}</strong>
            </div>
            <p>${post.content}</p>
            <div class="actions" style="margin-top:20px; display:flex; gap:20px;">
                <button onclick="handleLike(${post.id})" style="background:none; border:none; color:white; cursor:pointer;">
                    ${post.likes.includes('Charan') ? '❤️' : '🤍'} ${post.likes.length}
                </button>
                <button onclick="viewComments(${post.id})" style="background:none; border:none; color:white; cursor:pointer;">💬 ${post.comments.length}</button>
            </div>
        </article>
    `).join('');
}

function submitPost() {
    const txt = document.getElementById('post-text').value;
    if(!txt.trim()) return;

    state.posts.unshift({
        id: Date.now(),
        author: 'Charan',
        content: txt,
        likes: [],
        comments: []
    });
    
    document.getElementById('post-text').value = '';
    save();
    render();
}

function handleLike(id) {
    const post = state.posts.find(p => p.id === id);
    const idx = post.likes.indexOf('Charan');
    if(idx === -1) post.likes.push('Charan');
    else post.likes.splice(idx, 1);
    save();
    render();
}

function openMyProfile() {
    document.getElementById('feed-root').innerHTML = `
        <div style="text-align:center; padding:50px 0;">
            <img src="https://api.dicebear.com/7.x/initials/svg?seed=Charan" style="width:100px; border-radius:50%; border:3px solid #fff;">
            <h1>Charan</h1>
            <p style="color:var(--dim)">${state.posts.filter(p => p.author === 'Charan').length} Thoughts Shared</p>
        </div>
    `;
}

render();
