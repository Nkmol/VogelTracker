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
    let manager : ApiManager = ApiManager()
    var message : String = ""
    
    // We create a struct to hold users OAuth information
    struct OAuthInfo {
        let token : String
    
        init(token: String){
           self.token = token
           UserDefaults.standard.set(self.token, forKey: "token")
           UserDefaults.standard.set(true, forKey: "isLoggedIn")
        }
    }
    
    
    func registerNewUser (newUser : Dictionary<String,String>, completion: @escaping (_ message: String ) -> Void ) {

        
        manager.register(user: newUser) { (result: Dictionary<String, Any>?, error: Error?) in
            //print("resultaat")
            //print(result!["message"])
            
            self.message = (result!["message"] as? String)!
            
            if(self.message == "ok") {
               completion("Registratie is voltooid")
            }
        }
        

    }
    
    func login (existingUser : Dictionary<String, String>) {
        
        manager.login(user: existingUser){ (result: Dictionary<String, Any>?, error: Error?) in
            print(result)
            
            self.message = (result!["message"] as? String)!
            
            if(self.message == "ok") {
                
                var token : String = (result!["token"] as? String)!
                
                OAuthInfo.init(token: token)
            }
            

        }
        
    }
    
    

}
