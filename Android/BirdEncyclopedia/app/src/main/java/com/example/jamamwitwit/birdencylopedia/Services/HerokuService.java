package com.example.jamamwitwit.birdencylopedia.Services;

/**
 * Created by jamamwitwit on 21/03/2017.
 */

import com.example.jamamwitwit.birdencylopedia.Entities.LoginResponse;
import com.example.jamamwitwit.birdencylopedia.Entities.User;

import org.json.JSONObject;

import java.util.Objects;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.POST;


public interface HerokuService {
      
      @POST("/login")
      Call<LoginResponse> login(@Body User user);

}
