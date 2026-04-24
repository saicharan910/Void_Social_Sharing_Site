const DB = {
    elena: { name: "Elena Morse", signal: 94, posts: ["Form follows function.", "The grid is a guide, not a cage."] },
    kai: { name: "Kai Nakamura", signal: 88, posts: ["Vanilla JS is all you need.", "Complexity is a debt."] },
    sol: { name: "Sol Vega", signal: 99, posts: ["Write less, say more.", "Space is a character."] }
};

let currentPersona = 'elena';
let isStalkMode = false;

function switchUser(id) {
    currentPersona = id;
    render();
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
}

function toggleStalkMode() {
    isStalkMode = !isStalkMode;
    document.getElementById('stalk-btn').innerText = `Stalk Mode: ${isStalkMode ? 'ON' : 'OFF'}`;
    document.body.classList.toggle('stalk-active', isStalkMode);
}

function render() {
    const user = DB[currentPersona];
    document.getElementById('active-user-badge').innerHTML = `<b>${user.name}</b>`;
    document.getElementById('signal-meter').innerText = `${user.signal}%`;
    
    const feed = document.getElementById('feed-root');
    feed.innerHTML = user.posts.map(p => `
        <article class="post">
            <p>${p}</p>
            <div style="font-size:10px; color:gray;">280 / SIGNAL HIGH</div>
        </article>
    `).join('');
}

// Initial Launch
render();
