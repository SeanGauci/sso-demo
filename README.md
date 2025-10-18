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
1. Go to the [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a project.
3. Click Create Credentials -> OAuth client ID.
4. Click 'Configure consent screen' -> Get started
5. Select Web client (since we are using expo).
6. Copy the Client ID (you’ll need it for your app).
7. Go to [Expo's website](https://expo.dev/) and create an account
8. In your app's terminal run `npx expo login` and log in with the account you created
9. Then run `npx expo whoami` and take note of the username
10. Now go back to the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and edit the Web Client ID you created earlier, under 'Authorised redirect URIs' click add and enter the following: 'https://auth.expo.io/@<YOUR_EXPO_USERNAME>/sso-demo' and save.

### Step 3 - Update the code
Update `sign-in-button.tsx` to open Google's authentication flow:
```tsx
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

export default function SignInButton() {
   const [request, response, promptAsync] = Google.useAuthRequest({
      androidClientId: 'YOUR_WEB_CLIENT_ID',
      iosClientId: 'YOUR_WEB_CLIENT_ID',
      webClientId: 'YOUR_WEB_CLIENT_ID',
      redirectUri: 'https://auth.expo.io/@<YOUR_EXPO_USERNAME>/sso-demo'
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
1. Run `npm start`
2. Go to the [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
3. Edit the OAuth 2.0 Client IDs you created
4. Add the domain that the app is running on (you can get this from the console, e.g. http://localhost:8081) to 'Authorized redirect URIs'
5. Open the app on your browser.
6. Tap Sign In with Google.
7. You should see the Google sign-in screen.
8. On success, you’ll see the authentication token in the console (fn + f12).

This token represents the user’s verified Google identity.
In a real application, this token would typically be sent to your backend server to:
- Verify the user’s identity with Google’s public keys, and
- Establish a secure session for the signed-in user.
However, for this demo, simply seeing the token appear in the browser console confirms that the integration is working correctly.

### Step 5 - (Optional) Handle Sign-Out
1. Add a simple sign-out button if needed:
   ```tsx
   await GoogleSignin.signOut();
   ```
