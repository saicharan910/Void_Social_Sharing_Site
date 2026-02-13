const Auth = {
    login: function() {
        const handle = document.getElementById('loginHandle').value;
        if(handle) {
            document.getElementById('loginPage').classList.add('gone');
            document.getElementById('app').classList.add('on');
            App.init();
        }
    }
};

const App = {
    init: function() {
        this.renderFeed();
    },

    renderFeed: function() {
        const container = document.getElementById('feedContainer');
        container.innerHTML = '';
        posts.forEach(post => {
            const user = USERS[post.uid];
            const postEl = document.createElement('div');
            postEl.className = 'post';
            postEl.innerHTML = `
                <div class="av">${user.av}</div>
                <div class="post-body">
                    <div class="post-meta"><strong>${user.name}</strong> <span>${user.handle}</span> · ${post.time}</div>
                    <div class="p-text">${post.text}</div>
                    <div class="p-actions" style="margin-top:10px; display:flex; gap:20px;">
                        <span style="cursor:pointer" onclick="App.like(${post.id})">❤ ${post.likes}</span>
                        <span>💬 ${post.replies}</span>
                    </div>
                </div>
            `;
            container.appendChild(postEl);
        });
    },

    like: function(id) {
        const post = posts.find(p => p.id === id);
        if(post) {
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
            this.renderFeed();
        }
    }
};
