package com.example.jamamwitwit.birdencylopedia.Fragments;

import android.app.Fragment;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.jamamwitwit.birdencylopedia.Entities.Bird;
import com.example.jamamwitwit.birdencylopedia.R;

/**
 * Created by jamamwitwit on 23/03/2017.
 */

public class DetailFragment extends Fragment {

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_detail, container, false);

        return view;
    }

    public static DetailFragment newInstance(Bird bird) {
        DetailFragment fragment = new DetailFragment();
        Bundle args = new Bundle();
        args.putSerializable("selectedBird", bird);
        fragment.setArguments(args);
        return fragment;
    }
}
