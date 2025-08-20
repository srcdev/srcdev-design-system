# GitHub OAuth App Setup Guide

## Step 1: Create a GitHub OAuth Application

1. Go to [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/applications/new)
2. Click "New OAuth App"
3. Fill in the application details:

### For Development

```text
Application name: SrcDev Design System (Dev)
Homepage URL: https://localhost:3000
Authorization callback URL: https://localhost:3000/api/auth/github
Application description: SrcDev Design System - Development
```

### For Production

```text
Application name: SrcDev Design System
Homepage URL: https://srcdev-design-system.vercel.app
Authorization callback URL: https://srcdev-design-system.vercel.app/api/auth/github
Application description: SrcDev Design System - Production
```

## Step 2: Configure Environment Variables

### Local Development (.env file)

```env
NUXT_OAUTH_GITHUB_CLIENT_ID="your-dev-github-client-id"
NUXT_OAUTH_GITHUB_CLIENT_SECRET="your-dev-github-client-secret"
NUXT_SESSION_PASSWORD="development-secret-key-32-chars-min-replace-in-production"
```

### Vercel Production Environment

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add the following variables:
   - `NUXT_OAUTH_GITHUB_CLIENT_ID`: Your production GitHub Client ID
   - `NUXT_OAUTH_GITHUB_CLIENT_SECRET`: Your production GitHub Client Secret
   - `NUXT_SESSION_PASSWORD`: A secure 32+ character string for session encryption

## Step 3: Generate Secure Session Password

For production, generate a secure session password:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32
```

## Step 4: Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to `/account/login`
3. Click "Sign in with GitHub"
4. Authorize the application
5. You should be redirected back and see your GitHub profile

## Step 5: Deploy to Vercel

1. Push your changes to the main branch
2. Vercel will automatically deploy
3. Test the production OAuth flow with your production GitHub OAuth app

## Security Notes

- Never commit your `.env` file to version control
- Use different OAuth apps for development and production
- Keep your session password secure and rotate it periodically
- Consider using GitHub's organization-level OAuth apps for team projects

## Troubleshooting

### Common Issues

1. **"Bad verification code"**: Check that your callback URL exactly matches what's configured in GitHub
2. **Session issues**: Ensure your session password is at least 32 characters
3. **CSP errors**: The nuxt.config.ts has been updated to allow GitHub domains
4. **Localhost issues**: Make sure you're using `http://localhost:3000` (not 127.0.0.1) in your GitHub OAuth app

### Debug Tips

- Check browser network tab for failed requests
- Verify environment variables are loaded correctly
- Test with a fresh incognito/private browser window
