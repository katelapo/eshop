interface Env {
    ASSETS: Fetcher;
}

export default {
    fetch(request, env) {
        const url = new URL(request.url);

        if (url.pathname.startsWith("/api/eshops")) {
            return Response.json([
                { 
                    id: 1, 
                    name: "Eshop 1",
                    place: "puwosari",
                    time: "2023-10-01T12:00:00Z", 
                },
                {
                    id: 2,
                    name: "Eshop 2",
                    place: "puwodadi",
                    time: "2023-10-01T13:00:00Z",
                },
                {
                    id: 3,
                    name: "Eshop 3",
                    place: "puworejo",
                    time: "2023-10-01T14:00:00Z",
                },
            ]);
        }
        
        return env.ASSETS.fetch(request);
    },
} satisfies ExportedHandler<Env>;
