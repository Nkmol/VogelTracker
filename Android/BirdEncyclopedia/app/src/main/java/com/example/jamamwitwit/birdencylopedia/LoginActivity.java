package com.example.jamamwitwit.birdencylopedia;


import android.Manifest;
import android.accounts.Account;
import android.accounts.AccountManager;
import android.app.AlertDialog;
import android.app.Fragment;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

import com.example.jamamwitwit.birdencylopedia.Authentication.AccountGeneral;
import com.example.jamamwitwit.birdencylopedia.Fragments.LoginFragment;
import com.example.jamamwitwit.birdencylopedia.Fragments.ResultFragment;
import com.example.jamamwitwit.birdencylopedia.Fragments.SignUpFragment;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;

import static android.Manifest.permission.GET_ACCOUNTS;



public class LoginActivity extends AppCompatActivity {

    LoginFragment mLoginFragment;
    SignUpFragment mSignUpFragment;
    ResultFragment mResultFragment;
    private int REQUEST_ACCOUNT_PERMISSION = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        if (ContextCompat.checkSelfPermission(getBaseContext(), GET_ACCOUNTS) == PackageManager.PERMISSION_GRANTED) {
            Account[] accounts = AccountManager
                    .get(getBaseContext())
                    .getAccountsByType(AccountGeneral.ACCOUNT_TYPE);

            if (accounts.length >= 1) {
                Intent newIntent = new Intent(getBaseContext(), OverviewActivity.class);
                newIntent.putExtra("account", accounts[0]);
                startActivity(newIntent);
            }
        } else if(ActivityCompat.shouldShowRequestPermissionRationale(LoginActivity.this, GET_ACCOUNTS)){
                //The user denied before. Explain again why we need the permission, then ask for permission again. 
                AlertDialog.Builder alertBuilder = new AlertDialog.Builder(LoginActivity.this);
                alertBuilder.setMessage(getString(R.string.why_account_permission));
                alertBuilder.setOnDismissListener(new DialogInterface.OnDismissListener() {
                    @Override
                    public void onDismiss(DialogInterface dialog) {
                        requestPermissions(new String[]{GET_ACCOUNTS}, REQUEST_ACCOUNT_PERMISSION);
                    }
                });
                alertBuilder.show();
        }
        else {
            //We've never asked. Just do it. 
            requestPermissions(new String[]{GET_ACCOUNTS}, REQUEST_ACCOUNT_PERMISSION);
        }

        if (findViewById(R.id.fragment_login_container) != null){
            if (savedInstanceState != null) {
                return;
            }

            mLoginFragment = new LoginFragment();

            getFragmentManager().beginTransaction()
                    .add(R.id.fragment_login_container, mLoginFragment).commit();

        }
    }

    public void onLoginClick(View v) {
        mLoginFragment.handleLogin(v);
    }


    public void loadSignUp(View v){
        mSignUpFragment = new SignUpFragment();
        load(mSignUpFragment);
    }

    public void loadLogin(View v){
        mLoginFragment = new LoginFragment();
        load(mLoginFragment);
    }

    public void loadResult() {
        mResultFragment = new ResultFragment();
        load(mResultFragment);
    }

    public void load(Fragment fragment){
        getFragmentManager()
                .beginTransaction()
                .replace(R.id.fragment_login_container, fragment)
                .addToBackStack(null)
                .commit();
    }

    public void register(View v){
        mSignUpFragment.handleRegister();
    }

}
