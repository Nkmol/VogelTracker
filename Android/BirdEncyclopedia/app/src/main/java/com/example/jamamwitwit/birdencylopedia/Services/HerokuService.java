package com.example.jamamwitwit.birdencylopedia.Services;

/**
 * Created by jamamwitwit on 21/03/2017.
 */


import com.example.jamamwitwit.birdencylopedia.Entities.Bird;
import com.example.jamamwitwit.birdencylopedia.Entities.DataResponse;
import com.example.jamamwitwit.birdencylopedia.Entities.User;
import java.util.List;
import retrofit2.Call;
import retrofit2.http.Body;


import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;


public interface HerokuService {

      @POST("/login")
      Call<DataResponse> login(@Body User user);

      @GET("/birds")
      Call<List<Bird>> fetchBirds(@Header("authorization") String token);

      @POST("/register")
      Call<DataResponse> createUser(@Body User user);

}
