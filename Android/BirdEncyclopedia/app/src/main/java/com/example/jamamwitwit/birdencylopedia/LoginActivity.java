package com.example.jamamwitwit.birdencylopedia;

import android.accounts.Account;
import android.accounts.AccountAuthenticatorActivity;
import android.accounts.AccountManager;
import android.app.ProgressDialog;
import android.content.Intent;
import android.databinding.DataBindingUtil;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;


import com.example.jamamwitwit.birdencylopedia.Authentication.AccountGeneral;
import com.example.jamamwitwit.birdencylopedia.Entities.LoginResponse;
import com.example.jamamwitwit.birdencylopedia.Entities.User;
import com.example.jamamwitwit.birdencylopedia.Services.HerokuService;
import com.example.jamamwitwit.birdencylopedia.databinding.ActivityLoginBinding;

import org.json.JSONObject;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class LoginActivity extends AccountAuthenticatorActivity {

    public User user;


    public final static String ARG_ACCOUNT_TYPE = "ACCOUNT_TYPE";
    public final static String ARG_AUTH_TYPE = "AUTH_TYPE";
    public final static String ARG_ACCOUNT_NAME = "ACCOUNT_NAME";
    public final static String ARG_IS_ADDING_NEW_ACCOUNT = "IS_ADDING_ACCOUNT";

    private final String TAG = this.getClass().getSimpleName();

    private AccountManager mAccountManager;
    private String mAuthTokenType;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        user = new User();

        // Set the binding
        ActivityLoginBinding binding = DataBindingUtil.setContentView(this, R.layout.activity_login);
        binding.setUser(user);

        // Change title of the bar
        setTitle("Inloggen");

        mAccountManager = AccountManager.get(getBaseContext());

        mAuthTokenType = getIntent().getStringExtra(ARG_AUTH_TYPE);
        if (mAuthTokenType == null)
            mAuthTokenType = AccountGeneral.ACCOUNT_TYPE;

    }


    public void login (View v) {

        // Show a dialog that indicates that the authentication process is happening
        final ProgressDialog progressDialog = new ProgressDialog(LoginActivity.this,
                R.style.Theme_AppCompat_DayNight_Dialog);
        progressDialog.setIndeterminate(true);
        progressDialog.setMessage("Authenticating...");
        progressDialog.show();

        // Retrofit in order to handle our requests to the server
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://vogeltracker.herokuapp.com")
                .addConverterFactory(GsonConverterFactory.create())
                .build();


        final HerokuService service = retrofit.create(HerokuService.class);
        Call<LoginResponse> auth = service.login(user);
        auth.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {

                progressDialog.dismiss();

                if(response.isSuccessful()) {
                    final Bundle data = new Bundle();

                    data.putString(AccountManager.KEY_ACCOUNT_NAME, user.username);
                    data.putString(AccountManager.KEY_ACCOUNT_TYPE, mAuthTokenType);
                    data.putString(AccountManager.KEY_AUTHTOKEN, response.body().token);
                    data.putString(AccountManager.KEY_PASSWORD, user.password);

                    //Make it an intent to be passed back to the Android Authenticator
                    final Intent res = new Intent();
                    res.putExtras(data);

                    Account account = new Account(user.username, mAuthTokenType);

                    if(mAccountManager.addAccountExplicitly(account, mAuthTokenType, null)){
                        Log.d(TAG, "Account added");
                        mAccountManager.setAuthToken(account, mAuthTokenType, response.body().token);
                        setAccountAuthenticatorResult(data);
                        setResult(RESULT_OK, res);
                        finish();
                    } else {
                        // guess not
                        Log.d(TAG, "Account NOT added");
                    }

                    Intent intent = new Intent(getBaseContext(), OverviewActivity.class);
                    startActivity(intent);
                } else {
                    Toast.makeText(getBaseContext(), "Unauthorized", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                progressDialog.dismiss();
                Toast.makeText(getApplicationContext(), "Could not manage to connect", Toast.LENGTH_SHORT).show();
            }
        });

    }

}
