//
//  OverViewController.swift
//  BirdTracker
//
//  Created by Jamam Witwit on 10/04/2017.
//  Copyright © 2017 Witwit. All rights reserved.
//

import Foundation
import UIKit



class OverViewController : UITableViewController {
    
    @IBOutlet var tableView: UITableView!
   
    override func viewDidLoad() {
        super.viewDidLoad()
        
        if(!UserDefaults.standard.bool(forKey: "isLoggedIn")){
            self.performSegue(withIdentifier: "LoginView", sender: self)
        } else{
            let dataservice : DataService = DataService()
            dataservice.retreiveBirds(token: UserDefaults.standard.string(forKey: "token")!)
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
}
