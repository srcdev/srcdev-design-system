export default defineEventHandler(async event => {
  // Only handle GET requests for HTML pages
  if (getMethod(event) !== 'GET') {
    return;
  }

  // Skip API routes and static files
  if (event.node.req.url?.startsWith('/api/') || event.node.req.url?.includes('.') || event.node.req.url?.startsWith('/_nuxt/')) {
    return;
  }

  const host = getHeader(event, 'host');
  const protocol = getHeader(event, 'x-forwarded-proto') || 'https';

  // If the host starts with 'www.', redirect to non-www version
  if (host && host.startsWith('www.')) {
    const canonicalHost = host.substring(4); // Remove 'www.'
    const canonicalUrl = `${protocol}://${canonicalHost}${event.node.req.url}`;

    // Send 301 permanent redirect
    await sendRedirect(event, canonicalUrl, 301);
    return;
  }
});
