package com.example.jamamwitwit.birdencylopedia.Services;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Created by jamamwitwit on 26/03/2017.
 */


public class ServiceGenerator {

    public static final String API_BASE_URL = "https://vogeltracker.herokuapp.com";

    public static Retrofit builder = new Retrofit.Builder()
            .baseUrl(API_BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build();

    public static <S> S createService(Class<S> serviceClass) {
        return builder.create(serviceClass);
    }
}