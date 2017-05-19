package com.example.jamamwitwit.birdencylopedia;

import android.accounts.Account;
import android.accounts.AccountManager;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;

import com.example.jamamwitwit.birdencylopedia.Authentication.AccountGeneral;
import com.example.jamamwitwit.birdencylopedia.Entities.Bird;
import com.example.jamamwitwit.birdencylopedia.Fragments.DetailFragment;
import com.example.jamamwitwit.birdencylopedia.Fragments.OverviewFragment;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class OverviewActivity extends AppCompatActivity implements OverviewFragment.onDataCallListener {
    
    public AccountManager am;
    private List<Bird> mBirds = new ArrayList<>();
    String mAuthToken;

    SharedPreferences settings;
    SharedPreferences.Editor editor;
    static final String PREFS_NAME = "CACHE_DAH_BIRDZ";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_overview);

        final Intent intent = getIntent();
        Account mAccount = (Account) intent.getExtras().get("account");

        am = AccountManager.get(getBaseContext());
        mAuthToken = am.peekAuthToken(mAccount, AccountGeneral.ACCOUNT_TYPE);


        if (findViewById(R.id.fragment_container) != null) {

            // However, if we're being restored from a previous state,
            // then we don't need to do anything and should return or else
            // we could end up with overlapping fragments.
            if (savedInstanceState != null) {
                return;
            }

            // Create a new Fragment to be placed in the activity layout
            OverviewFragment overView = new OverviewFragment();
            Bundle data = new Bundle();
            data.putString("authToken", mAuthToken);
            overView.setArguments(data);
            // Add the fragment to the 'fragment_container' FrameLayout
            getFragmentManager().beginTransaction()
                    .add(R.id.fragment_container, overView).commit();
        }

        Toolbar myToolbar = (Toolbar) findViewById(R.id.my_toolbar);
        myToolbar.setTitle("Zoeklijst");
        myToolbar.setBackgroundColor(Color.parseColor("#FFA000"));
        setSupportActionBar(myToolbar);

        settings = getSharedPreferences(PREFS_NAME, 0);
        editor = settings.edit();
    }

    public void loadDetail(Bird bird){

        DetailFragment fragment = DetailFragment.newInstance(bird);
        Bundle bundle = fragment.getArguments();
        bundle.putString("authToken", mAuthToken);
        fragment.setArguments(bundle);

        FragmentManager manager = getFragmentManager();
        FragmentTransaction transaction = manager.beginTransaction();
        transaction.replace(R.id.fragment_container, fragment).addToBackStack(null).commit();
    }

    public List<Bird> getBirds(){
        return mBirds;
    }

    @Override
    public void onDataReceived(List<Bird> birds) {
        this.mBirds = birds;
    }

    public void setCacheBirds(List<Bird> data) {
        editor.clear();
        String stringifiedData = new Gson().toJson(data).toString();
        editor.putString(PREFS_NAME, stringifiedData);
        editor.commit();
    }

    public List<Bird> getCacheBirds() {
        String cacheData = settings.getString(PREFS_NAME, "[]");

        JsonArray jsonArray = new JsonParser().parse(cacheData).getAsJsonArray();
        Type listType = new TypeToken<List<Bird>>(){}.getType();
        List<Bird> data = new Gson().fromJson(jsonArray, listType);
        return data;
    }
}
