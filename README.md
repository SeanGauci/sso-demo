## Get started
1. Clone our [GitHub repository](https://github.com/SeanGauci/sso-demo).
2. Open a terminal and make sure you're in the project's root directory.
3. Install dependencies
   ```bash
   npm install
   ```

## Steps to Integrate Google SSO in the Demo App
### Step 1 - Install Required Packages
   ```bash
   npx expo install expo-auth-session
   ```

### Step 2 - Create a Google OAuth Client ID
1. Go to the [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a project.
3. Make sure you select the project you just created in the project picker (top left of the screen).
4. Click Create Credentials -> OAuth client ID.
5. Click 'Configure consent screen' -> Get started
   * Enter an app name of your liking and select a 'User support email'.
   * Under 'Audience', pick 'External'
   * Enter your email under 'Contact Information'.
   * Click agree, and create.
6. In the left side menu, click 'Clients'.
7. Click 'Create client'.
8. *Select 'Web Application' and enter a name.
9. Click 'Create' at the bottom.
10. Copy the Client ID and save it somewhere (you’ll need it for your app).

*We will be testing on web since to test it on your phone a development build is rqeuired which takes too much time for our time slot.

### Step 3 - Create a Google OAuth Client ID
Update `components/sign-in-button.tsx` to open Google's authentication flow as follows;
IMPORTANT: Make sure you replace 'YOUR_ANDROID_CLIENT_ID', 'YOUR_IOS_CLIENT_ID', and 'YOUR_WEB_CLIENT_ID' with the Client ID you saved earlier.
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
1. Run `npm start`
2. Go to the [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
3. Edit the OAuth 2.0 Client IDs you created
4. Add the domain that the app is running on (you can get this from the console, e.g. http://localhost:8081) to 'Authorized redirect URIs'
5. Open the app on your browser.
6. Tap Sign In with Google.
7. You should see the Google sign-in screen.
8. On success, you’ll get user details in the console (fn + f12).
