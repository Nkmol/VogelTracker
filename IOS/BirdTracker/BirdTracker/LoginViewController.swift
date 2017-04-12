//
//  LoginViewController.swift
//  BirdTracker
//
//  Created by Jamam Witwit on 09/04/2017.
//  Copyright © 2017 Witwit. All rights reserved.
//

import Foundation
import UIKit


class LoginViewController: UIViewController {
    
    @IBOutlet weak var usernameTextField: UITextField!

    @IBOutlet weak var passwordTextField: UITextField!

    @IBOutlet weak var loginButton: UIButton!

    var loginCompletion: (( ) -> Void )?
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBAction func login(_ sender: Any) {
        
        let username = usernameTextField.text
        let password = passwordTextField.text
        
        if((username?.isEmpty)! || (password?.isEmpty)!){
            displayAlertMessage(message: "Niet alle velden zijn gevuld")
            return
        }
        
        let user = [
            "username": username,
            "password": password,
        ]
        
        let service : AuthService = AuthService()
        service.login(existingUser: user as! Dictionary<String, String>) { (message : String) in
            if(message == "success") {
                self.loginCompletion?()
                self.dismiss(animated: true, completion: nil)
            }
        }
        
    }
    
    // Show alert dialog that takes input message
    func displayAlertMessage(message: String) {
        let registerAlert = UIAlertController(title: "Notificatie", message: message, preferredStyle: UIAlertControllerStyle.alert)
        
        let registerAction = UIAlertAction(title: "ok", style: UIAlertActionStyle.default, handler: nil)
        
        registerAlert.addAction(registerAction)
        
        present(registerAlert, animated: true, completion: nil)
    }
    
    
    
    
}
