## Get started
1. Install dependencies
   ```bash
   npm install
   ```
   
2. Start the app
   ```bash
   npx expo start
   ```

## Steps to Integrate Google SSO in the Demo App
### Step 1 - Install Required Packages
   ```bash
   npx expo install expo-auth-session
   ```

### Step 2 - Create a Google OAuth Client ID
1. Create an Expo account (npx expo login -> npx expo whoami)
2. Go to the [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
3. Create a project.
4. Click Create Credentials -> OAuth client ID.
5. Click 'Configure consent screen' -> Get started
6. Select Web client (since we are using expo, otherwise it would be Android or iOS).
7. Copy the Client ID (you’ll need it for your app).
8. Edit OAuth Client -> Authorized redirect URIs -> Add https://auth.expo.io/@your-username/sso-demo

### Step 3 - Create a Google OAuth Client ID
Update `sign-in-button.tsx` to open Google's authentication flow:
```tsx
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

export default function SignInButton() {
   const [request, response, promptAsync] = Google.useAuthRequest({
      androidClientId: 'YOUR_ANDROID_CLIENT_ID',
      iosClientId: 'YOUR_IOS_CLIENT_ID',
      webClientId: 'YOUR_WEB_CLIENT_ID',
   });

   useEffect(() => {
      if (response?.type === 'success') {
         const { authentication } = response;
         console.log('Access token:', authentication?.accessToken);
         // Handle login success (e.g., navigate or call backend)
      }
   }, [response]);

   return (
           <TouchableOpacity
                   style={styles.button}
                   onPress={() => promptAsync()}
                   disabled={!request}
           >
              <Text style={styles.text}>Sign In with Google</Text>
           </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
   button: {
      backgroundColor: '#4285F4',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
   },
   text: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
   },
});
```

### Step 4 - Test the Integration
1. Download the Expo Go app on your phone.
2. Run `npm start` and scan the QR code form the Expo Go app.
2. Tap Sign In with Google.
3. You should see the Google sign-in screen.
4. On success, you’ll get user details in the console.

### Step 5 - (Optional) Handle Sign-Out
1. Add a simple sign-out button if needed:
   ```tsx
   await GoogleSignin.signOut();
   ```
