package com.example.jamamwitwit.birdencylopedia.Fragments;

import android.app.Fragment;
import android.app.ProgressDialog;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.jamamwitwit.birdencylopedia.Adapters.BirdAdapter;
import com.example.jamamwitwit.birdencylopedia.Entities.Bird;
import com.example.jamamwitwit.birdencylopedia.LoginActivity;
import com.example.jamamwitwit.birdencylopedia.R;
import com.example.jamamwitwit.birdencylopedia.Services.HerokuService;
import com.simplecityapps.recyclerview_fastscroll.views.FastScrollRecyclerView;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;



/**
 * Created by jamamwitwit on 23/03/2017.
 */

public class OverviewFragment extends Fragment {

    public List<Bird> Birds;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    private HashMap<String, Integer> mapIndex;
    //RecyclerView mRecyclerView;
    FastScrollRecyclerView mRecyclerView;
    View view;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
         view = inflater.inflate(R.layout.fragment_overview, container, false);

        Bundle data = this.getArguments();
        String token = data.getString("authToken");
        getBirds(token);

        return view;
    }

    public void init(List<Bird> birds){

        // use a linear layout manager
        mLayoutManager = new LinearLayoutManager(this.getActivity());
        mRecyclerView = (FastScrollRecyclerView) view.findViewById(R.id.bird_recycler_view);
        mRecyclerView.setLayoutManager(mLayoutManager);

        mAdapter = new BirdAdapter(birds, getActivity().getBaseContext());
        mRecyclerView.setAdapter(mAdapter);
    }

    private void getBirds(String authtoken) {

        final ProgressDialog progressDialog = new ProgressDialog(getActivity(),
                R.style.Theme_AppCompat_DayNight_Dialog);
        progressDialog.setIndeterminate(true);
        progressDialog.setMessage("Loading...");
        progressDialog.show();

        // Retrofit in order to handle our requests to the server
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://vogeltracker.herokuapp.com")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        final HerokuService service = retrofit.create(HerokuService.class);


        Call<List<Bird>> req = service.fetchBirds("JWT " + authtoken);
        req.enqueue(new Callback<List<Bird>>() {
            @Override
            public void onResponse(Call<List<Bird>> call, Response<List<Bird>> response) {
                progressDialog.dismiss();
                Birds = response.body();
                init(Birds);
            }

            @Override
            public void onFailure(Call<List<Bird>> call, Throwable t) {

            }
        });

    }

    

    public interface OnItemSelectedListener
    {
        public void onItemSelected(String item);
    }
}
