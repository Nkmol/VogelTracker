//
//  RegisterViewController.swift
//  BirdTracker
//
//  Created by Jamam Witwit on 09/04/2017.
//  Copyright © 2017 Witwit. All rights reserved.
//

import UIKit
import SwiftyJSON

class RegisterViewController: UIViewController {
    
    @IBOutlet weak var usernameTextField: UITextField!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBAction func registerUser(_ sender: Any) {
        
        let username = usernameTextField.text
        let password = passwordTextField.text
        let email = emailTextField.text
        
        // check empty fields
        if ((username?.isEmpty)! || (password?.isEmpty)! || (email?.isEmpty)!) {
            
            // display alert message
            displayAlertMessage(message: "Niet alle velden zijn gevuld!")
            return;
        }
        
        //let newUser : User = User()
        //newUser.username = username!
        //newUser.email = email!
        //newUser.password = password!
        
        let user = [
            "username": username,
            "password": password,
            "email": email
        ]
        
        let service : AuthService = AuthService()
        service.registerNewUser(newUser: user as! Dictionary<String, String>)
        //service.registerNewUser(user: user)
        
        //AuthService.registerNewUser(newUser)
        // store data
        
        // Display confirmation
    }
    
    
    func displayAlertMessage(message: String) {
        let registerAlert = UIAlertController(title: "Waarschuwing", message: message, preferredStyle: UIAlertControllerStyle.alert)
        
        let registerAction = UIAlertAction(title: "ok", style: UIAlertActionStyle.default, handler: nil)
        
        registerAlert.addAction(registerAction)
        
        present(registerAlert, animated: true, completion: nil)
        
    }

}
