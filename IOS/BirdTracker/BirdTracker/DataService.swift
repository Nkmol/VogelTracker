//
//  DataService.swift
//  BirdTracker
//
//  Created by Jamam Witwit on 10/04/2017.
//  Copyright © 2017 Witwit. All rights reserved.
//

import Foundation


public class DataService : ParentService {
    
    
    func retreiveBirds(token : String) {

    // give the manager the token in order to fetch the data
        
        manager.getBirds(token: token);
    }

}
