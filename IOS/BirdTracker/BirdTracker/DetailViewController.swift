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

 
    @IBOutlet weak var imageViewWidth: NSLayoutConstraint!
    @IBOutlet weak var imageViewHeight: NSLayoutConstraint!
    @IBOutlet weak var titleLabel: UILabel!
    
    @IBOutlet weak var descriptionTextField: UITextView!
    @IBOutlet weak var birdImageView: UIImageView!

    @IBOutlet weak var showMapButton: UIButton!
    @IBOutlet weak var subtitleLabel: UILabel!
    
    var bird : JSON?

    override func viewDidLoad() {
        
        NotificationCenter.default.addObserver(self, selector: #selector(DetailViewController.rotated), name: NSNotification.Name.UIDeviceOrientationDidChange, object: nil)
        
        rotated()

        super.viewDidLoad()
    
    }
    
    func rotated()
    {
        if(UIDeviceOrientationIsLandscape(UIDevice.current.orientation))
        {
            print("landscape")
            descriptionTextField.isHidden = true
            let screenSize: CGRect = UIScreen.main.bounds
        
            birdImageView.frame = CGRect(x: 0, y: 0, width: screenSize.width, height: screenSize.height)
            birdImageView.translatesAutoresizingMaskIntoConstraints = true
            showMapButton.isHidden = true
            
        }
        
        if(UIDeviceOrientationIsPortrait(UIDevice.current.orientation))
        {
            print("Portrait")
            descriptionTextField.isHidden = false
            showMapButton.isHidden = false
            birdImageView.translatesAutoresizingMaskIntoConstraints = false
        }
        
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        
        if let bird = bird {
            
            //print(bird["name"])
            self.title = bird["name"].stringValue
            //titleLabel.text = bird["name"].stringValue
            descriptionTextField.text = bird["information"].stringValue
            subtitleLabel.text =
                bird["latin_name"].stringValue
            birdImageView.imageFromServerURL(urlString: bird["img"].stringValue)
            
        }
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let destinationVC = segue.destination as? MapViewController{
            destinationVC.bird = bird
        }
    }

}
