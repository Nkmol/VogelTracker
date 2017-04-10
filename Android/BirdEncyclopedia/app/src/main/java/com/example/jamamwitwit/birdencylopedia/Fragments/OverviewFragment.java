package com.example.jamamwitwit.birdencylopedia.Fragments;

import android.app.Fragment;
import android.content.Context;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.Toast;

import com.example.jamamwitwit.birdencylopedia.Adapters.BirdAdapter;
import com.example.jamamwitwit.birdencylopedia.Entities.Bird;
import com.example.jamamwitwit.birdencylopedia.OverviewActivity;
import com.example.jamamwitwit.birdencylopedia.R;
import com.example.jamamwitwit.birdencylopedia.Services.HerokuService;
import com.example.jamamwitwit.birdencylopedia.Services.ServiceGenerator;

import java.util.ArrayList;
import java.util.List;

import in.myinnos.alphabetsindexfastscrollrecycler.IndexFastScrollRecyclerView;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


/**
 * Created by jamamwitwit on 23/03/2017.
 */

public class OverviewFragment extends Fragment {

    public List<Bird> Birds;
    private RecyclerView.Adapter mAdapter;
    IndexFastScrollRecyclerView mRecyclerView;
    public EditText search;
    View view;
    SwipeRefreshLayout mSwipeRefreshLayout;
    onDataCallListener mOnDataCallListener;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_overview, container, false);
        search = (EditText) view.findViewById(R.id.search);
        ((AppCompatActivity) getActivity()).getSupportActionBar().setTitle("Zoeklijst");
        Bundle data = this.getArguments();
        final String token = data.getString("authToken");
        getBirds(token);
        mSwipeRefreshLayout = (SwipeRefreshLayout) view.findViewById(R.id.swipeRefreshLayout);
        mSwipeRefreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                getBirds(token);
            }
        });
        addTextListener();

        return view;
    }

    @Override
    public void onAttach(Context context){
        super.onAttach(context);
        if(context instanceof onDataCallListener)
            mOnDataCallListener=(onDataCallListener)context;
    }

    public void init(List<Bird> birds){
        RecyclerView.LayoutManager mLayoutManager = new LinearLayoutManager(this.getActivity());
        mRecyclerView = (IndexFastScrollRecyclerView) view.findViewById(R.id.bird_recycler_view);
        mRecyclerView.setLayoutManager(mLayoutManager);
        mRecyclerView.setIndexBarColor("#FFA000");

        mAdapter = new BirdAdapter(birds, getActivity());
        mRecyclerView.setAdapter(mAdapter);

        mRecyclerView.setVisibility(View.VISIBLE);
        //view.findViewById(R.id.progress_bar).setVisibility(View.GONE);
        setProgressBar(View.GONE);
    }

    private void getBirds(String authtoken) {

        List<Bird> parent_data = ((OverviewActivity)this.getActivity()).getBirds();

        if(parent_data != null && parent_data.size() > 0){
            Birds = parent_data;
            init(Birds);
            return;
        }


        final HerokuService service = ServiceGenerator.createService(HerokuService.class);

        Call<List<Bird>> req = service.fetchBirds("JWT " + authtoken);
        req.enqueue(new Callback<List<Bird>>() {
            @Override
            public void onResponse(Call<List<Bird>> call, Response<List<Bird>> response) {

                Birds = response.body();

                mOnDataCallListener.onDataReceived(response.body());
                mSwipeRefreshLayout.setRefreshing(false);
                init(Birds);
            }
            @Override
            public void onFailure(Call<List<Bird>> call, Throwable t) {

                setProgressBar(View.GONE);
                    Toast.makeText(getActivity(),
                            "Er heeft een timeout plaatsgevonden. Controleer uw internetverbinding of alles nog klopt.", Toast.LENGTH_LONG).show();
                mSwipeRefreshLayout.setRefreshing(false);
            }
        });

    }

    public void addTextListener(){

        search.addTextChangedListener(new TextWatcher() {

            public void afterTextChanged(Editable s) {}

            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}

            public void onTextChanged(CharSequence query, int start, int before, int count) {

                if(Birds != null){
                    query = query.toString().toLowerCase();

                    final List<Bird> filteredList = new ArrayList<>();

                    for (int i = 0; i < Birds.size(); i++) {

                        final String text = Birds.get(i).name.toLowerCase();
                        if (text.contains(query)) {

                            filteredList.add(Birds.get(i));
                        }
                    }

                    mRecyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
                    mAdapter = new BirdAdapter(filteredList, getActivity());
                    mRecyclerView.setAdapter(mAdapter);
                    mAdapter.notifyDataSetChanged();  // data set changed
                }

            }
        });
    }

    public void setProgressBar(int status){
        view.findViewById(R.id.progress_bar).setVisibility(status);
    }

    public interface onDataCallListener {
        public void onDataReceived(List<Bird> birds);
    }

}
