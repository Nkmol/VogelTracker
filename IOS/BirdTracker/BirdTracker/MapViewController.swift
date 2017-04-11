//
//  MapViewController.swift
//  BirdTracker
//
//  Created by Jamam Witwit on 11/04/2017.
//  Copyright © 2017 Witwit. All rights reserved.
//

import Foundation
import UIKit
import GoogleMaps
import SwiftyJSON

class MapViewController : UIViewController {
    
    var bird : JSON?
    var reports : JSON?
    
    override func loadView() {
        
        // Create a GMSCameraPosition that tells the map to display the
        // coordinate -33.86,151.20 at zoom level 6.
        let camera = GMSCameraPosition.camera(withLatitude: 51.6979, longitude: 5.317, zoom: 6.0)
        let mapView = GMSMapView.map(withFrame: CGRect.zero, camera: camera)
        view = mapView
        
        if let bird = bird {
            //print(bird)
            
            // Fetch reports
            let dataservice : DataService = DataService()
            dataservice.retreiveReports(){ (result: JSON) in
                //print(result)
                self.reports = result
            
                if let rps = self.reports?.array! {
                    for report in rps {
                        
                        print(report)
                        if let bird_id = report["bird_id"]["_id"].string {
                            
                            if bird_id == bird["_id"].stringValue {
                                
                                var lat = report["lat"].stringValue
                                var long = report["long"].stringValue
                                
                                // Creates a marker in the center of the map.
                                let marker = GMSMarker()
                                marker.position = CLLocationCoordinate2D(latitude: Double(lat)!, longitude: Double(long)!)
                                marker.title = bird["name"].stringValue
                                //marker.snippet = "Australia"
                                marker.map = mapView
                                
                            }
                        }
                    }
                }
            
            }
            
        }
    }
}

