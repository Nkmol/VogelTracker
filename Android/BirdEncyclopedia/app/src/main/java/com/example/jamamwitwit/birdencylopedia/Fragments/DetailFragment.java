package com.example.jamamwitwit.birdencylopedia.Fragments;

import android.app.Dialog;
import android.app.Fragment;
import android.content.Intent;
import android.databinding.DataBindingUtil;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.ImageView;

import com.example.jamamwitwit.birdencylopedia.Entities.Bird;
import com.example.jamamwitwit.birdencylopedia.MapsActivity;
import com.example.jamamwitwit.birdencylopedia.R;
import com.example.jamamwitwit.birdencylopedia.databinding.FragmentDetailBinding;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.squareup.picasso.Picasso;

/**
 * Created by jamamwitwit on 23/03/2017.
 */

public class DetailFragment extends Fragment {

    Bird selectedBird;


    public static final String PARAM_BIRD = "bird";

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

        Button b = (Button)view.findViewById(R.id.show_map_button);
        // TODO: Can be improved with Java 8 lambda (Need gradle implementation)
        b.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                onSightningButtonClick(view);
            }
        });

        return view;
    }

    public static DetailFragment newInstance(Bird bird) {
        DetailFragment fragment = new DetailFragment();
        Bundle args = new Bundle();
        args.putSerializable("selectedBird", bird);
        fragment.setArguments(args);
        return fragment;
    }


    // TODO: Move to seperate class
    public static final int PLAY_SERVICES_RESOLUTION_REQUEST = 999;
    GoogleApiAvailability googleAPI;

    private boolean checkPlayServices() {
        googleAPI = GoogleApiAvailability.getInstance();
        int result = googleAPI.isGooglePlayServicesAvailable(getContext());
        if(result != ConnectionResult.SUCCESS) {
            if(googleAPI.isUserResolvableError(result)) {
                googleAPI.getErrorDialog(getActivity(), result, PLAY_SERVICES_RESOLUTION_REQUEST).show();
            }

            return false;
        }

        return true;
    }

    public void onSightningButtonClick(View v) {
        if(checkPlayServices()) {
            Intent mapIntent = new Intent(getActivity(), MapsActivity.class);
            mapIntent.putExtra(PARAM_BIRD, selectedBird.name);
            startActivity(mapIntent);
        }
    }
}
