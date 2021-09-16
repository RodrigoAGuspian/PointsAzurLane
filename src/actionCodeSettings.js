var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'pure-archive-211414.firebaseapp.com',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.azurlanepoints.ios'
    },
    android: {
      packageName: 'com.azurlanepoints.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'azurlanepoints.page.link'
  };