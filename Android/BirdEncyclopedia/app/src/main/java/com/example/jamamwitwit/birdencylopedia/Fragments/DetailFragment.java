package com.example.jamamwitwit.birdencylopedia.Fragments;

import android.app.Fragment;
import android.databinding.DataBindingUtil;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import com.example.jamamwitwit.birdencylopedia.Entities.Bird;
import com.example.jamamwitwit.birdencylopedia.R;
import com.example.jamamwitwit.birdencylopedia.databinding.FragmentDetailBinding;
import com.squareup.picasso.Picasso;

/**
 * Created by jamamwitwit on 23/03/2017.
 */

public class DetailFragment extends Fragment {

    Bird selectedBird;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        Bundle data = getArguments();
        selectedBird = (Bird) data.getSerializable("selectedBird");

        FragmentDetailBinding binding = DataBindingUtil.inflate(
                inflater, R.layout.fragment_detail, container, false);

        View view = binding.getRoot();
        binding.setBird(selectedBird);

        ImageView bird_image = (ImageView)view.findViewById(R.id.bird_img);
        Picasso.with(getActivity()).load(selectedBird.img).into(bird_image);

        ((AppCompatActivity) getActivity()).getSupportActionBar().setTitle(selectedBird.name);

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
