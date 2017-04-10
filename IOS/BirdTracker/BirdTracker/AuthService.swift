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
    
    
    func registerNewUser (newUser : Dictionary<String,String>, completion: @escaping (_ message: String ) -> Void ) {
        
        let manager : ApiManager = ApiManager()
        var message : String = ""
        
        manager.register(user: newUser) { (result: Dictionary<String, Any>?, error: Error?) in
            //print("resultaat")
            //print(result!["message"])
            
            message = (result!["message"] as? String)!
            
            if(message == "ok") {
               completion("Registratie is voltooid")
            }
        }
        

    }
    
    func login (_ : Dictionary<String, String>) {
        
        
        
    }
    
    

}
