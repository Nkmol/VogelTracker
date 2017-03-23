package com.example.jamamwitwit.birdencylopedia;

import android.accounts.Account;
import android.accounts.AccountManager;
import android.accounts.AccountManagerCallback;
import android.accounts.AccountManagerFuture;
import android.accounts.AuthenticatorException;
import android.accounts.OperationCanceledException;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Toast;

import com.example.jamamwitwit.birdencylopedia.Authentication.AccountGeneral;

import java.io.IOException;

public class OverviewActivity extends AppCompatActivity {

    private Account mAccount;
    public AccountManager am;
    private String mAuthToken;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_overview);

        final Intent intent = getIntent();
        mAccount = (Account) intent.getExtras().get("account");

        am = AccountManager.get(getBaseContext());
        Bundle authTokenBundle = null;
        try {
             authTokenBundle =
                    am.getAuthToken(mAccount, AccountGeneral.ACCOUNT_TYPE, null, this, null, null)
                            .getResult();
            mAuthToken = authTokenBundle.get(AccountManager.KEY_AUTHTOKEN).toString();
            //Toast.makeText(getBaseContext(), authToken, Toast.LENGTH_SHORT).show();
        } catch (Exception e){}
    }


}
