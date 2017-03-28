package com.example.jamamwitwit.birdencylopedia.Fragments;

import android.accounts.Account;
import android.accounts.AccountManager;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.databinding.DataBindingUtil;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.Toast;

import com.example.jamamwitwit.birdencylopedia.Authentication.AccountGeneral;
import com.example.jamamwitwit.birdencylopedia.Entities.LoginResponse;
import com.example.jamamwitwit.birdencylopedia.Entities.User;
import com.example.jamamwitwit.birdencylopedia.LoginActivity;
import com.example.jamamwitwit.birdencylopedia.OverviewActivity;
import com.example.jamamwitwit.birdencylopedia.R;
import com.example.jamamwitwit.birdencylopedia.Services.HerokuService;
import com.example.jamamwitwit.birdencylopedia.Services.ServiceGenerator;
import com.example.jamamwitwit.birdencylopedia.databinding.FragmentDetailBinding;
import com.example.jamamwitwit.birdencylopedia.databinding.FragmentLoginBinding;


import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static android.app.Activity.RESULT_OK;

/**
 * Created by jamamwitwit on 28/03/2017.
 */

public class LoginFragment extends android.app.Fragment {

    /** The binded object **/
    public User user;

    /** The Intent flag to confirm credentials. */
    public static final String PARAM_CONFIRM_CREDENTIALS = "confirmCredentials";
    /** The Intent extra to store username. */
    public static final String PARAM_USERNAME = "username";
    /** The Intent extra to store account type. */
    public static final String PARAM_ACCOUNT_TYPE = "account_type";
    /** The Intent extra to store account type. */
    public static final String PARAM_IS_ADDING_ACCOUNT = "is_adding_account";
    /** The Intent extra to store the tokentype. */
    public static final String PARAM_AUTHTOKEN_TYPE = "authtokenType";
    /** The tag used to log to adb console. */
    private final String TAG = this.getClass().getSimpleName();


    /**
     * If set we are just checking that the user knows their credentials; this
     * doesn't cause the user's password or authToken to be changed on the
     * device.
     */
    private Boolean mConfirmCredentials = false;

    /** Was the original caller asking for an entirely new account? */
    protected boolean mRequestNewAccount = false;


    private AccountManager mAccountManager;
    private String mAuthTokenType;


    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        user = new User();

        FragmentLoginBinding binding = DataBindingUtil.inflate(
                inflater, R.layout.fragment_login, container, false);

        View view = binding.getRoot();
        binding.setUser(user);

        mAccountManager = AccountManager.get(getActivity());

        final Intent intent = getActivity().getIntent();
        user.username = intent.getStringExtra(PARAM_USERNAME);

        mAuthTokenType = getActivity().getIntent().getStringExtra(PARAM_AUTHTOKEN_TYPE);
        if (mAuthTokenType == null)
            mAuthTokenType = AccountGeneral.ACCOUNT_TYPE;

        mRequestNewAccount = user.username == null;
        mConfirmCredentials = intent.getBooleanExtra(PARAM_CONFIRM_CREDENTIALS, false);

        Account[] accounts = mAccountManager.getAccountsByType(mAuthTokenType);

        if(accounts.length >= 1){
            Intent newIntent = new Intent(getActivity(), OverviewActivity.class);
            newIntent.putExtra("account", accounts[0]);
            startActivity(newIntent);
        }

        return view;
    }

    /**
     * Returns the message to be displayed at the top of the login dialog box.
     */
    private CharSequence getMessage() {
        if (TextUtils.isEmpty(user.username)) {
            // If no username, then we ask the user to log in using an
            // appropriate service.
            return getText(R.string.login_no_username);
        }
        if (TextUtils.isEmpty(user.password)) {
            // We have an account but no password
            return getText(R.string.login_no_password);
        }
        return null;
    }

    /**
     * Handles onClick event on the Submit button. Sends username/password to
     * the server for authentication. The button is configured to call
     * handleLogin() in the layout XML.
     *
     * @param view The Submit button for which this method is invoked
     */
    public void handleLogin(View view) {
        if (TextUtils.isEmpty(user.username) || TextUtils.isEmpty(user.password)) {
            Toast.makeText(getActivity(), getMessage(), Toast.LENGTH_SHORT).show();
        } else {
            // Show a progress dialog, and kick off a background task to perform
            // the user login attempt.
            login(view);
        }
    }

    /**
     * Makes the request to server to obtain an token and store the account through the account manager
     *
     * @param v
     */
    public void login (View v) {
        // Show a dialog that indicates that the authentication process is happening
        final ProgressDialog progressDialog = new ProgressDialog(getActivity(),
                R.style.Theme_AppCompat_DayNight_Dialog);
        progressDialog.setIndeterminate(true);
        progressDialog.setMessage("Authenticating...");
        progressDialog.show();


        final HerokuService service = ServiceGenerator.createService(HerokuService.class);

        Call<LoginResponse> auth = service.login(user);
        auth.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {

                progressDialog.dismiss();

                if(response.isSuccessful()) {
                    final Bundle data = new Bundle();

                    data.putString(AccountManager.KEY_ACCOUNT_NAME, user.username);
                    data.putString(AccountManager.KEY_ACCOUNT_TYPE, mAuthTokenType);
                    data.putString(AccountManager.KEY_AUTHTOKEN, response.body().token);
                    data.putString(AccountManager.KEY_PASSWORD, user.password);

                    //Make it an intent to be passed back to the Android Authenticator
                    final Intent res = new Intent();
                    res.putExtras(data);

                    Account account = new Account(user.username, mAuthTokenType);

                    if(mAccountManager.addAccountExplicitly(account, mAuthTokenType, null)){
                        Log.d(TAG, "Account added");
                        mAccountManager.setAuthToken(account, mAuthTokenType, response.body().token);
                        //setAccountAuthenticatorResult(data);
                        getActivity().setResult(RESULT_OK, res);
                        getActivity().finish();
                    } else {
                        // guess not
                        Log.d(TAG, "Account NOT added");
                    }

                    Intent intent = new Intent(getActivity(), OverviewActivity.class);
                    intent.putExtra("account", account);
                    startActivity(intent);
                } else {
                    Toast.makeText(getActivity(), "Unauthorized", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                progressDialog.dismiss();
                Toast.makeText(getActivity(), "Could not manage to connect", Toast.LENGTH_SHORT).show();
            }
        });

    }


}
