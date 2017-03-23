package com.example.jamamwitwit.birdencylopedia.Services;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.support.annotation.Nullable;

import com.example.jamamwitwit.birdencylopedia.Authenticator;

/**
 * Created by jamamwitwit on 22/03/2017.
 */

public class AuthenticatorService extends Service {
    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        Authenticator auth = new Authenticator(this);
        return auth.getIBinder();
    }
}
