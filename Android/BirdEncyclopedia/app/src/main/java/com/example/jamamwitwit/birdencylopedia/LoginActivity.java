package com.example.jamamwitwit.birdencylopedia;

import android.accounts.Account;
import android.accounts.AccountManager;
import android.app.ProgressDialog;
import android.databinding.DataBindingUtil;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;


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


public class LoginActivity extends AppCompatActivity {

    public User user;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        user = new User();
        ActivityLoginBinding binding = DataBindingUtil.setContentView(this, R.layout.activity_login);
        binding.setUser(user);

        setTitle("Inloggen");

    }


    public void login (View v) {

        final ProgressDialog progressDialog = new ProgressDialog(LoginActivity.this,
                R.style.Theme_AppCompat_DayNight_Dialog);
        progressDialog.setIndeterminate(true);
        progressDialog.setMessage("Authenticating...");
        progressDialog.show();

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
                Toast.makeText(getApplicationContext(), response.body().token, Toast.LENGTH_SHORT).show();
                //Log.d("login", response.body().token );
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                progressDialog.dismiss();
                Toast.makeText(getApplicationContext(), "Could not manage to connect", Toast.LENGTH_SHORT).show();
            }
        });

    }

}
