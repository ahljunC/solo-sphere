# Future Authentication Implementation Tasks

This document outlines the remaining tasks required to make the SoloSphere login functionality fully operational in a production environment.

## 1. Configure Supabase Environment Variables

### Description
The application currently has placeholder references to Supabase environment variables in `src/lib/supabase.ts`, but these need to be properly configured for the authentication system to work.

### Implementation Steps

1. **Create a .env.local file** at the project root with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

2. **Obtain Supabase credentials**:
   - Sign up/login to [Supabase](https://supabase.com/)
   - Create a new project or select an existing one
   - Navigate to Project Settings > API
   - Copy the "Project URL" as `NEXT_PUBLIC_SUPABASE_URL`
   - Copy the "anon" public API key as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Update production deployment**:
   - For Vercel deployment, add these environment variables in the Vercel project settings
   - For other hosting platforms, follow their specific environment variable configuration process

4. **For local development**:
   - Add .env.local to .gitignore to prevent committing secrets
   - Share a redacted .env.example with the team as a template

### Technical Considerations

- **Security**: The anon key is designed for client-side use, but still represents limited access to your Supabase project
- **Environment Isolation**: Consider having separate Supabase projects for development, staging, and production
- **Secret Rotation**: Implement a process for periodically rotating these keys

## 2. Set Up OAuth Provider Configurations

### Description
The application includes social login capabilities via Google, Facebook, and LinkedIn, but these require proper configuration in the Supabase dashboard as well as developer accounts with each provider.

### Implementation Steps

1. **Google OAuth Setup**:
   - Create a project in [Google Cloud Console](https://console.cloud.google.com/)
   - Go to "APIs & Services" > "Credentials"
   - Create an OAuth 2.0 Client ID
   - Add authorized JavaScript origins (your app's domains)
   - Add authorized redirect URIs: `https://your-project-id.supabase.co/auth/v1/callback`
   - Copy Client ID and Client Secret

2. **Facebook OAuth Setup**:
   - Create an app in [Facebook Developers](https://developers.facebook.com/)
   - Set up Facebook Login product
   - Add your domains under App Settings > Basic
   - Configure redirect URI: `https://your-project-id.supabase.co/auth/v1/callback`
   - Copy App ID and App Secret

3. **LinkedIn OAuth Setup**:
   - Create an app in [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
   - Request the Sign In With LinkedIn product
   - Configure redirect URLs: `https://your-project-id.supabase.co/auth/v1/callback`
   - Copy Client ID and Client Secret

4. **Supabase Configuration**:
   - In Supabase Dashboard, go to Authentication > Providers
   - Enable each provider (Google, Facebook, LinkedIn)
   - Input the corresponding Client ID/Secret for each
   - Ensure the "Redirect URL" shown in Supabase matches what you configured in each provider

5. **Testing**:
   - Test each social login flow in development environment
   - Verify proper user creation and login in Supabase Auth dashboard
   - Check for any redirect issues or CORS problems

### Technical Considerations

- **Scopes**: Configure minimum necessary permission scopes for each provider
- **Production vs Development**: Providers may require verification or review processes before production use
- **User Data**: Be clear in your privacy policy about what data you're collecting from these social providers
- **Error Handling**: Implement robust error handling for OAuth failures (already included in our implementation)

## 3. Implement User-Customizable Login Background

### Description
Allow users to personalize their organization's login page by uploading and configuring a custom background image, enhancing brand identity for freelancers and small businesses.

### Implementation Steps

1. **Database Schema Update**:
   ```sql
   CREATE TABLE public.user_settings (
     id UUID REFERENCES auth.users(id) PRIMARY KEY,
     login_background_url TEXT,
     login_background_name TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- RLS Policy
   ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Users can view only their own settings" ON public.user_settings 
     FOR SELECT USING (auth.uid() = id);
   CREATE POLICY "Users can update only their own settings" ON public.user_settings 
     FOR UPDATE USING (auth.uid() = id);
   ```

2. **Storage Configuration**:
   - Create a protected bucket in Supabase Storage called `background-images`
   - Configure storage permissions to allow authenticated users to upload
   - Set up appropriate file type restrictions (jpg, png, etc.) and size limits

3. **User Settings Interface**:
   - Create a settings page at `/dashboard/settings`
   - Implement file upload component with preview capability
   - Add image cropping/resizing functionality
   - Include option to revert to default background

4. **Image Processing**:
   - Implement client-side image optimization (resolution, compression)
   - Consider server-side processing for consistent quality
   - Generate and store appropriate metadata

5. **Background Image Integration**:
   - Modify LoginBackground component to check for customization
   - Add server-side logic to fetch appropriate background for login page
   - Implement fallback to default background when custom one is not available

6. **Multi-Tenant Considerations**:
   - If organization has multiple users, implement organization-level settings
   - Add admin controls for who can change the background
   - Consider organization ID in URL path for branded login pages

### Technical Considerations

- **Performance**: Optimize image loading and rendering with appropriate caching
- **Responsive Design**: Ensure uploaded backgrounds work across device sizes
- **Accessibility**: Maintain proper contrast for text overlaid on custom backgrounds
- **Storage Costs**: Consider implementing quotas or limits on file sizes
- **Privacy & Copyright**: Add terms regarding appropriate content for uploaded backgrounds

### Code Example: Modified LoginBackground Component

```typescript
// Future implementation - this would replace the current LoginBackground component
export async function LoginBackground({ className = '', orgId = null }) {
  // Server component that fetches the correct background
  let backgroundUrl = '/images/default-background.jpg'; // Default fallback
  
  if (orgId) {
    // Fetch organization settings from database
    const { data, error } = await supabase
      .from('organization_settings')
      .select('login_background_url')
      .eq('id', orgId)
      .single();
      
    if (data?.login_background_url) {
      backgroundUrl = data.login_background_url;
    }
  }
  
  return (
    <div className={`w-full h-full ${className}`}>
      <div className="absolute inset-0">
        <Image 
          src={backgroundUrl}
          alt="Login background"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80" />
    </div>
  );
}