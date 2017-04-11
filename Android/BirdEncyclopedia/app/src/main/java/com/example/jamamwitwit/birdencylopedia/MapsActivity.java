package com.example.jamamwitwit.birdencylopedia;

import android.support.v4.app.FragmentActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import com.example.jamamwitwit.birdencylopedia.Entities.Bird;
import com.example.jamamwitwit.birdencylopedia.Entities.Report;
import com.example.jamamwitwit.birdencylopedia.Fragments.DetailFragment;
import com.example.jamamwitwit.birdencylopedia.Services.HerokuService;
import com.example.jamamwitwit.birdencylopedia.Services.ServiceGenerator;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;
    String token;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        token = getIntent().getStringExtra(DetailFragment.PARAM_TOKEN);

        setContentView(R.layout.activity_maps);
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
    }


    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */
    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;

        final HerokuService service = ServiceGenerator.createService(HerokuService.class);

        Call<List<Report>> fetch = service.fetchReports("JWT " + token);
        fetch.enqueue(new Callback<List<Report>>() {
            @Override
            public void onResponse(Call<List<Report>> call, Response<List<Report>> response) {

                List<Report> Reports = response.body();

                createMarkers(Reports);
            }
            @Override
            public void onFailure(Call<List<Report>> call, Throwable t) {

                Toast.makeText(MapsActivity.this,
                        "Er heeft een timeout plaatsgevonden. Controleer uw internetverbinding of alles nog klopt.", Toast.LENGTH_LONG).show();
            }
        });
    }

    private void createMarkers(List<Report> data) {
        for(Report report : data) {
            // create the marker
            LatLng loc = new LatLng(report.lat, report.lng);
            mMap.addMarker(new MarkerOptions().position(loc).title(report.description));
        }

        mMap.moveCamera(CameraUpdateFactory.newLatLng(new LatLng(52, 4)));
    }
}
