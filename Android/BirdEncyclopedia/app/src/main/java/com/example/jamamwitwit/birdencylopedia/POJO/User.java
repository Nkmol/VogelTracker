package com.example.jamamwitwit.birdencylopedia.POJO;

import android.content.Context;
import android.databinding.BaseObservable;
import android.databinding.Bindable;
import android.databinding.ObservableField;
import android.text.Editable;
import android.text.TextWatcher;
import android.widget.Toast;

import com.example.jamamwitwit.birdencylopedia.BR;

import java.util.Objects;

import static android.support.design.R.id.text;

/**
 * Created by jamamwitwit on 21/03/2017.
 */

public class User extends BaseObservable {

    public final ObservableField<String> email = new ObservableField<>();
    public final ObservableField<String> password = new ObservableField<>();



}
