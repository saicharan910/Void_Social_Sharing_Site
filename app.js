let myProfile = { followers: 128, following: 250, likes: [] };

// ACTION: Profile View Execution
function openUserProfile(userId) {
    const user = VOID_STATE.personas[userId];
    const feed = document.getElementById('feed-root');
    document.getElementById('page-title').innerText = `${user.name}'s Signal`;
    
    // Filter feed for this specific user
    const userPosts = VOID_STATE.posts.filter(p => p.author === userId);
    renderPosts(userPosts);
}

function openMyProfile() {
    const feed = document.getElementById('feed-root');
    document.getElementById('page-title').innerText = "My Territory";
    
    feed.innerHTML = `
        <div class="profile-stats">
            <div><strong>${myProfile.followers}</strong> Followers</div>
            <div><strong>${myProfile.following}</strong> Following</div>
            <div><strong>${VOID_STATE.posts.filter(p => p.author === 'Charan').length}</strong> Thoughts</div>
        </div>
        <hr border="1" color="#222">
    `;
    const myPosts = VOID_STATE.posts.filter(p => p.author === 'Charan');
    renderPosts(myPosts);
}

// ACTION: Post with Image Handling
function executePost() {
    const text = document.getElementById('post-input').value;
    const imgFile = document.getElementById('image-upload').files[0];
    
    if (!text && !imgFile) return;

    const newPost = {
        id: Date.now(),
        author: 'Charan', // Static for now, would be currentUser.id
        content: text,
        image: imgFile ? URL.createObjectURL(imgFile) : null,
        likes: [],
        comments: []
    };

    VOID_STATE.posts.unshift(newPost);
    document.getElementById('post-input').value = '';
    renderPosts(VOID_STATE.posts);
}

function renderPosts(data) {
    const feed = document.getElementById('feed-root');
    feed.innerHTML = data.map(post => `
        <article class="post">
            <div class="post-meta" onclick="openUserProfile('${post.author}')" style="cursor:pointer">
                <strong>@${post.author}</strong>
            </div>
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}">` : ''}
            <div class="post-actions">
                <button onclick="handleLike(${post.id})">SIGNAL ${post.likes.length}</button>
            </div>
        </article>
    `).join('');
}

// Initial Load
renderPosts(VOID_STATE.posts);
