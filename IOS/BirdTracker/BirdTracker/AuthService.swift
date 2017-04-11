//
//  AuthService.swift
//  BirdTracker
//
//  Created by Jamam Witwit on 09/04/2017.
//  Copyright © 2017 Witwit. All rights reserved.
//

import Foundation
import UIKit


public class AuthService : ParentService {
    
    private var tokenInfo:Credentials!
    
    // We create a struct to hold users OAuth information
    struct Credentials {
        let token : String
    
        @discardableResult init(token: String){
           self.token = token
           UserDefaults.standard.set(self.token, forKey: "token")
           UserDefaults.standard.set(true, forKey: "isLoggedIn")
        }
    }
    
    
    func registerNewUser (newUser : Dictionary<String,String>, completion: @escaping (_ message: String ) -> Void ) {

        manager.register(user: newUser) { (result: Dictionary<String, Any>?, error: Error?) in

            self.message = (result!["message"] as? String)!
            
            if(self.message == "ok") {
               completion("Registratie is voltooid")
            }
        }
    }
    
    func login (existingUser : Dictionary<String, String>,  completion: @escaping (_ message: String ) -> Void ) {
        
        manager.login(user: existingUser){ (result: Dictionary<String, Any>?, error: Error?) in
            
            self.message = (result!["message"] as? String)!
            
            if(self.message == "ok") {
                
                let token : String = (result!["token"] as? String)!
                Credentials(token: token)
                completion("success")
            }
            
        }
        
    }
    
    

}
