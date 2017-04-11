package com.example.jamamwitwit.birdencylopedia.Entities;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

/**
 * Created by srm on 11-4-2017.
 */

public class Report implements Serializable {
    public Bird bird_id;
    public User user_id;
    public String date;
    public String description;
    public Double lat;

    @SerializedName("long")
    public Double lng;

    public String[] img;
}
