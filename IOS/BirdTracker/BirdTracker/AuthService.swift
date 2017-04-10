//
//  AuthService.swift
//  BirdTracker
//
//  Created by Jamam Witwit on 09/04/2017.
//  Copyright © 2017 Witwit. All rights reserved.
//

import Foundation
import UIKit


public class AuthService : NSObject {
    
    private var tokenInfo:OAuthInfo!
    
    // We create a struct to hold users OAuth information
    struct OAuthInfo {
        let token : String
    
        init(token: String){
           self.token = token
           UserDefaults.standard.set(self.token, forKey: "token")
            
        }
    }
    
    
    func registerNewUser (newUser : Dictionary<String,String> ){
        
        let manager : ApiManager = ApiManager()
        
        manager.register(user: newUser) { (result: Dictionary<String, Any>?, error: Error?) in
            print(result)
        }
        
    }
    
    func login (_ : Dictionary<String, String>) {
        
        
        
    }
    
    

}
