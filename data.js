/**
 * VOID - Mock Database Layer
 * Purpose: Centralized state for personas, posts, and messaging.
 */

const VOID_DATA = {
    personas: {
        elena: {
            id: "elena",
            name: "Elena Morse",
            handle: "@emorse",
            role: "Product Designer",
            bio: "Minimalism isn't the absence of things; it's the presence of the right things.",
            signal: 94,
            avatar: "grayscale-01.jpg", // Grayscale preview logic
            stats: { thoughts: 12, snippets: 4, drift: 0.02 }
        },
        kai: {
            id: "kai",
            name: "Kai Nakamura",
            handle: "@kai_v",
            role: "Software Engineer",
            bio: "Vanilla JS > Everything. Every pixel costs attention.",
            signal: 88,
            avatar: "grayscale-02.jpg",
            stats: { thoughts: 45, snippets: 128, drift: 0.05 }
        },
        sol: {
            id: "sol",
            name: "Sol Vega",
            handle: "@sve_words",
            role: "Writer",
            bio: "Economy of words. Economy of thought.",
            signal: 99,
            avatar: "grayscale-03.jpg",
            stats: { thoughts: 8, snippets: 0, drift: 0.01 }
        }
    },

    // Combined Feed for "Timeline" view
    feed: [
        {
            id: 101,
            author: "kai",
            type: "text",
            content: "Modularizing the data layer today. Clean state management is high-signal.",
            timestamp: "2h ago"
        },
        {
            id: 102,
            author: "elena",
            type: "media",
            mediaType: "image",
            content: "Refining the monochrome theme engine. Light/Dark mode transitions should feel like breathing.",
            mediaUrl: "preview-ui.jpg", 
            timestamp: "5h ago"
        },
        {
            id: 103,
            author: "sol",
            type: "text",
            content: "Space is a character.",
            timestamp: "10h ago"
        }
    ],

    // Mock Messaging for Elena
    conversations: {
        elena: [
            { from: "kai", message: "Did you check the new CSS variables?", status: "unread" },
            { from: "sol", message: "The draft is ready.", status: "read" }
        ]
    }
};

// Exporting for use in app.js
if (typeof module !== 'undefined') {
    module.exports = VOID_DATA;
}
