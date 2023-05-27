addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const response = new Response(JSON.stringify({ message: 'Hello from Cloudflare Worker!' }), {
        headers: { 'Content-Type': 'application/json' },
    });

    return response;
}