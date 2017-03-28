package com.example.jamamwitwit.birdencylopedia;

import android.accounts.Account;
import android.accounts.AccountManager;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.content.Intent;
import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;

import com.example.jamamwitwit.birdencylopedia.Authentication.AccountGeneral;
import com.example.jamamwitwit.birdencylopedia.Entities.Bird;
import com.example.jamamwitwit.birdencylopedia.Fragments.DetailFragment;
import com.example.jamamwitwit.birdencylopedia.Fragments.OverviewFragment;

import java.util.ArrayList;
import java.util.List;

public class OverviewActivity extends AppCompatActivity implements OverviewFragment.onDataCallListener {
    
    public AccountManager am;
    private List<Bird> mBirds = new ArrayList<>();


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_overview);

        final Intent intent = getIntent();
        Account mAccount = (Account) intent.getExtras().get("account");

        am = AccountManager.get(getBaseContext());
        String mAuthToken = am.peekAuthToken(mAccount, AccountGeneral.ACCOUNT_TYPE);


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

    }

    public void loadDetail(Bird bird){
        DetailFragment fragment = DetailFragment.newInstance(bird);

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
}
