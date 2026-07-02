// Cloudflare Pages Function: /callback
// GitHub redirects here after the user approves access.
// This function exchanges the temporary code for a real access token
// using the client secret (which never touches the browser).
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Missing authorization code.', { status: 400 });
  }

  // Exchange code for access token — done server-side so the secret stays secret.
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    return new Response(`GitHub auth error: ${tokenData.error_description}`, { status: 400 });
  }

  const token = tokenData.access_token;

  // Pass the token back to the Decap CMS window that opened this popup.
  const html = `<!doctype html>
<html>
<head><title>Authorizing...</title></head>
<body>
<p>Login successful — closing window...</p>
<script>
  (function() {
    function receiveMessage(e) {
      window.opener.postMessage(
        'authorization:github:success:' + JSON.stringify({ token: "${token}", provider: "github" }),
        e.origin
      );
      window.removeEventListener("message", receiveMessage, false);
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  })();
</script>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
