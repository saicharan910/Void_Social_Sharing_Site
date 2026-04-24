// This acts as your local database
const VOID_STATE = {
    currentUser: 'elena',
    personas: {
        elena: { name: "Elena Morse", signal: 94 },
        kai: { name: "Kai Nakamura", signal: 88 },
        sol: { name: "Sol Vega", signal: 99 }
    },
    posts: [
        { id: 1, author: 'kai', content: "Vanilla JS is all you need.", likes: [], comments: [] },
        { id: 2, author: 'sol', content: "Space is a character.", likes: [], comments: [] }
    ]
};
