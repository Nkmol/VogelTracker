package com.example.jamamwitwit.birdencylopedia;

import android.accounts.Account;
import android.accounts.AccountManager;
import android.accounts.AccountManagerCallback;
import android.accounts.AccountManagerFuture;
import android.accounts.AuthenticatorException;
import android.accounts.OperationCanceledException;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.content.Intent;
import android.graphics.Color;
import android.support.v4.app.FragmentActivity;
import android.support.v4.view.MenuItemCompat;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.SearchView;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;

import com.example.jamamwitwit.birdencylopedia.Authentication.AccountGeneral;
import com.example.jamamwitwit.birdencylopedia.Fragments.DetailFragment;
import com.example.jamamwitwit.birdencylopedia.Fragments.OverviewFragment;

import java.io.IOException;

public class OverviewActivity extends AppCompatActivity implements OverviewFragment.OnItemSelectedListener{

    private Account mAccount;
    public AccountManager am;
    private String mAuthToken;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_overview);

        final Intent intent = getIntent();
        mAccount = (Account) intent.getExtras().get("account");

        am = AccountManager.get(getBaseContext());
        Bundle authTokenBundle = null;
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

    }

    @Override
    public void onItemSelected(String item) {
        DetailFragment fragment = DetailFragment.newInstance(item);

        FragmentManager manager = getFragmentManager();
        FragmentTransaction transaction = manager.beginTransaction();
        transaction.replace(R.id.fragment_container, fragment).addToBackStack(null).commit();
    }
}
