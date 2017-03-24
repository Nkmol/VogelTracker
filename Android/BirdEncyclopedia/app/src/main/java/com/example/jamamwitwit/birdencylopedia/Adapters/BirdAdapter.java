package com.example.jamamwitwit.birdencylopedia.Adapters;

import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.jamamwitwit.birdencylopedia.Entities.Bird;
import com.example.jamamwitwit.birdencylopedia.R;

import org.w3c.dom.Text;

import java.util.List;

/**
 * Created by jamamwitwit on 23/03/2017.
 */

public class BirdAdapter extends RecyclerView.Adapter<BirdAdapter.ViewHolder>  {

    private List<Bird> mDataset;

    // Provide a reference to the views for each data item
    // Complex data items may need more than one view per item, and
    // you provide access to all the views for a data item in a view holder
    public static class ViewHolder extends RecyclerView.ViewHolder {
        // each data item is just a string in this case

        TextView bird_name;
        CardView cv;

        public ViewHolder(View v) {
            super(v);
            cv = (CardView) v.findViewById(R.id.cv);
            bird_name = (TextView)v.findViewById(R.id.bird_name);
        }
    }

    public BirdAdapter(List<Bird> birdDataSet){
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
    }

    @Override
    public int getItemCount() {
        return mDataset.size();
    }
}
