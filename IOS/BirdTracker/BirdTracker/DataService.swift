//
//  DataService.swift
//  BirdTracker
//
//  Created by Jamam Witwit on 10/04/2017.
//  Copyright © 2017 Witwit. All rights reserved.
//

import Foundation
import SwiftyJSON


public class DataService : ParentService {
    
    
    func retreiveBirds(token : String, completion: @escaping (_ result: JSON) -> Void)  {

    // give the manager the token in order to fetch the data
        
        manager.getBirds(token: token) { (result: JSON, error: Error?) in
            if (error == nil){
                completion(result)
            }
        }
        
    }

}
