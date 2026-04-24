let isStalkMode = false;

// ACTION: Check if liked, then execute toggle
function handleLike(postId) {
    const post = VOID_STATE.posts.find(p => p.id === postId);
    const userIndex = post.likes.indexOf(VOID_STATE.currentUser);

    if (userIndex === -1) {
        post.likes.push(VOID_STATE.currentUser); // Execute Like
    } else {
        post.likes.splice(userIndex, 1); // Execute Unlike
    }
    render();
}

// ACTION: Post new thought
function executePost() {
    const text = document.getElementById('new-post-text').value;
    if (!text.trim()) return;

    const newPost = {
        id: Date.now(),
        author: VOID_STATE.currentUser,
        content: text,
        likes: [],
        comments: []
    };
    VOID_STATE.posts.unshift(newPost);
    document.getElementById('new-post-text').value = '';
    render();
}

// ACTION: Search profiles
function handleSearch() {
    const query = document.getElementById('profile-search').value.toLowerCase();
    const results = Object.values(VOID_STATE.personas).filter(u => 
        u.name.toLowerCase().includes(query)
    );
    // You can expand this to show a dropdown of results
    console.log("Search Results:", results);
}

function render() {
    const feed = document.getElementById('feed-root');
    const displayPosts = isStalkMode 
        ? VOID_STATE.posts.filter(p => p.author === VOID_STATE.currentUser)
        : VOID_STATE.posts;

    feed.innerHTML = displayPosts.map(post => `
        <article class="post">
            <strong>@${post.author}</strong>
            <p>${post.content}</p>
            <div class="interactions">
                <button onclick="handleLike(${post.id})">
                    ${post.likes.includes(VOID_STATE.currentUser) ? '●' : '○'} ${post.likes.length}
                </button>
            </div>
        </article>
    `).join('');
    
    document.getElementById('active-user-badge').innerText = VOID_STATE.personas[VOID_STATE.currentUser].name;
}

function toggleStalkMode() {
    isStalkMode = !isStalkMode;
    document.getElementById('stalk-btn').innerText = `Stalk Mode: ${isStalkMode ? 'ON' : 'OFF'}`;
    render();
}

render();
