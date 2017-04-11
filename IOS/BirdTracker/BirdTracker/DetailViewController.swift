//
//  DetailViewController.swift
//  BirdTracker
//
//  Created by Jamam Witwit on 11/04/2017.
//  Copyright © 2017 Witwit. All rights reserved.
//

import Foundation
import UIKit
import SwiftyJSON

class DetailViewController: UIViewController {

 
    @IBOutlet weak var titleLabel: UILabel!
    
    @IBOutlet weak var descriptionTextField: UITextView!

    
    var bird : JSON?

    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        if let bird = bird {
            
            //print(bird["name"])
            titleLabel.text = bird["name"].stringValue
            descriptionTextField.text = bird["information"].stringValue
        }
    }

}
