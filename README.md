# cors-proxy

A Minimalist CORS proxy server implementation.

The server accepts requests in the following form: serverUrl/targetUrl

The server sends a request to the targetUrl using the same http method that was used in the request. User-Agent header is added to this request as it is required by some websites. The server adds CORS headers to the response and sends it back to the creator of the original request.
