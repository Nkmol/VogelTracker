package com.example.jamamwitwit.birdencylopedia.Adapters;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.SectionIndexer;
import android.widget.TextView;

import com.example.jamamwitwit.birdencylopedia.Entities.Bird;
import com.example.jamamwitwit.birdencylopedia.R;
import com.squareup.picasso.Picasso;

import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

/**
 * Created by jamamwitwit on 23/03/2017.
 */

public class BirdAdapter extends RecyclerView.Adapter<BirdAdapter.ViewHolder> implements /*FastScrollRecyclerView.SectionedAdapter*/ SectionIndexer {


    private List<Bird> mDataset;
    private Context mContext;
    private ArrayList<Integer> mSectionPositions;

    @Override
    public Object[] getSections() {
        List<String> sections = new ArrayList<>(26);
        mSectionPositions = new ArrayList<>(26);
        for (int i = 0, size = mDataset.size(); i < size; i++) {
            String section = String.valueOf(mDataset.get(i).name.charAt(0)).toUpperCase();
            if (!sections.contains(section)) {
                sections.add(section);
                mSectionPositions.add(i);
            }
        }
        return sections.toArray(new String[0]);
    }

    @Override
    public int getPositionForSection(int sectionIndex) {
        return mSectionPositions.get(sectionIndex);
    }

    @Override
    public int getSectionForPosition(int position) {
        return 0;
    }

//    @NonNull
//    @Override
//    public String getSectionName(int position) {
//        return mDataset.get(position).name.substring(0, 1).toUpperCase(Locale.ENGLISH);
//    }


    // Provide a reference to the views for each data item
    // Complex data items may need more than one view per item, and
    // you provide access to all the views for a data item in a view holder
    public static class ViewHolder extends RecyclerView.ViewHolder {
        // each data item is just a string in this case

        TextView bird_name;
        ImageView bird_image;
        CardView cv;

        public ViewHolder(View v) {
            super(v);
            cv = (CardView) v.findViewById(R.id.cv);
            bird_name = (TextView)v.findViewById(R.id.bird_name);
            bird_image = (ImageView)v.findViewById(R.id.person_photo);
        }
    }

    public BirdAdapter(List<Bird> birdDataSet, Context context){
        mContext = context;
        mDataset = birdDataSet;
    }

    @Override
    public BirdAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        // create a new view
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.item, parent, false);

        ViewHolder vh = new ViewHolder(v);
        return vh;
    }

    @Override
    public void onBindViewHolder(BirdAdapter.ViewHolder holder, int position) {
        holder.bird_name.setText(mDataset.get(position).name);

        Picasso.with(mContext).load(mDataset.get(position).img).into(holder.bird_image);
    }

    @Override
    public int getItemCount() {
        return mDataset.size();
    }
}
