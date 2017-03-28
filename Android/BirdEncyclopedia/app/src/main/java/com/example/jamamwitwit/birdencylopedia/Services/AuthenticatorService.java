package com.example.jamamwitwit.birdencylopedia.Services;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.support.annotation.Nullable;

import com.example.jamamwitwit.birdencylopedia.Authentication.Authenticator;

/**
 * Created by jamamwitwit on 22/03/2017.
 */

public class AuthenticatorService extends Service {

    // Instance field that stores the authenticator object
    private Authenticator mAuthenticator;

    @Override
    public void onCreate() {
        // Create a new authenticator object
        mAuthenticator = new Authenticator(this);
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return mAuthenticator.getIBinder();
    }
}
