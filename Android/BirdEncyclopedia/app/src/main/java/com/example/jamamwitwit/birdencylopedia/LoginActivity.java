package com.example.jamamwitwit.birdencylopedia;

import android.databinding.DataBindingUtil;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.example.jamamwitwit.birdencylopedia.POJO.User;
import com.example.jamamwitwit.birdencylopedia.databinding.ActivityLoginBinding;


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

}
