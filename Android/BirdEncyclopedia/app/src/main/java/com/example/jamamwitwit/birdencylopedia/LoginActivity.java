package com.example.jamamwitwit.birdencylopedia;


import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import com.example.jamamwitwit.birdencylopedia.Fragments.LoginFragment;
import com.example.jamamwitwit.birdencylopedia.Fragments.SignUpFragment;


public class LoginActivity extends AppCompatActivity {

    LoginFragment mLoginFragment;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

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
        SignUpFragment fragment = new SignUpFragment();
        FragmentManager manager = getFragmentManager();
        FragmentTransaction transaction = manager.beginTransaction();
        transaction.replace(R.id.fragment_login_container, fragment).addToBackStack(null).commit();

    }

}
