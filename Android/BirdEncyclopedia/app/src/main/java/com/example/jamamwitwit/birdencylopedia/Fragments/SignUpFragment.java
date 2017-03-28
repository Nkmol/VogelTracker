package com.example.jamamwitwit.birdencylopedia.Fragments;

import android.databinding.DataBindingUtil;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.jamamwitwit.birdencylopedia.Entities.User;
import com.example.jamamwitwit.birdencylopedia.R;
import com.example.jamamwitwit.birdencylopedia.databinding.FragmentSignupBinding;

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
        binding.setUser(newUser);

        return view;
    }
}
