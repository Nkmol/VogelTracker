package com.example.jamamwitwit.birdencylopedia.Fragments;

import android.app.ProgressDialog;
import android.databinding.DataBindingUtil;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.jamamwitwit.birdencylopedia.Entities.DataResponse;
import com.example.jamamwitwit.birdencylopedia.Entities.User;
import com.example.jamamwitwit.birdencylopedia.LoginActivity;
import com.example.jamamwitwit.birdencylopedia.R;
import com.example.jamamwitwit.birdencylopedia.Services.HerokuService;
import com.example.jamamwitwit.birdencylopedia.Services.ServiceGenerator;
import com.example.jamamwitwit.birdencylopedia.databinding.FragmentSignupBinding;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Created by jamamwitwit on 28/03/2017.
 */

public class SignUpFragment extends android.app.Fragment {

    User newUser;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        //return super.onCreateView(inflater, container, savedInstanceState);

        FragmentSignupBinding binding = DataBindingUtil.inflate(
                inflater, R.layout.fragment_signup, container, false);

        View view = binding.getRoot();
        newUser = new User();
        binding.setUser(newUser);

        return view;
    }

    /**
     * Returns the message to be displayed at the top of the login dialog box.
     */
    private CharSequence getMessage() {
        if (TextUtils.isEmpty(newUser.username)) {
            // If no username, then we ask the user to log in using an
            // appropriate service.
            return getText(R.string.login_no_username);
        }
        if (TextUtils.isEmpty(newUser.password)) {
            // We have an account but no password
            return getText(R.string.login_no_password);
        }
        if (TextUtils.isEmpty(newUser.email)) {
            // We have an account but no email
            return getText(R.string.login_no_email);
        }
        return null;
    }

    public void handleRegister() {
        if (TextUtils.isEmpty(newUser.username) || TextUtils.isEmpty(newUser.password) || TextUtils.isEmpty(newUser.email)) {
            Toast.makeText(getActivity(), getMessage(), Toast.LENGTH_SHORT).show();
        } else {
            // Show a progress dialog, and kick off a background task to perform
            // the user login attempt.
            register();
        }
    }

    public void register(){

        final HerokuService service = ServiceGenerator.createService(HerokuService.class);

        final ProgressDialog progressDialog = new ProgressDialog(getActivity(),
                R.style.Theme_AppCompat_DayNight_Dialog);
        progressDialog.setIndeterminate(true);
        progressDialog.setCanceledOnTouchOutside(false);
        progressDialog.setMessage("Account wordt aangemaakt. Een moment geduld alstublief...");
        progressDialog.show();

        Call<DataResponse> auth = service.createUser(newUser);
        auth.enqueue(new Callback<DataResponse>() {
            @Override
            public void onResponse(Call<DataResponse> call, Response<DataResponse> response) {
                if(response.isSuccessful()){
                    progressDialog.dismiss();
                    ((LoginActivity)getActivity()).loadResult();
                    //Toast.makeText(getActivity(), "Het registeren is gelukt!", Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<DataResponse> call, Throwable t) {

            }
        });

    }


}
