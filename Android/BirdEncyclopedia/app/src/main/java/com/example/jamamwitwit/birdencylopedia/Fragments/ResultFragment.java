package com.example.jamamwitwit.birdencylopedia.Fragments;

import android.app.Fragment;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.jamamwitwit.birdencylopedia.R;

/**
 * Created by jamamwitwit on 29/03/2017.
 */

public class ResultFragment extends Fragment {

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        //return super.onCreateView(inflater, container, savedInstanceState);
        View view = inflater.inflate(R.layout.fragment_result, container, false);

        return view;
    }



}
