//
//  OverViewController.swift
//  BirdTracker
//
//  Created by Jamam Witwit on 10/04/2017.
//  Copyright © 2017 Witwit. All rights reserved.
//

import Foundation
import UIKit
import SwiftyJSON


class OverViewController : UITableViewController {
    
    @IBOutlet var birdsTableView: UITableView!
    var birds : JSON = []
    var imageCache = [String:UIImage]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.title = "Overzicht"
        
        if(!UserDefaults.standard.bool(forKey: "isLoggedIn")){
            self.performSegue(withIdentifier: "LoginView", sender: self)
        } else{
            fetchData()
        }
    }
    
    func fetchData(){
        let dataservice : DataService = DataService()
        dataservice.retreiveBirds(token: UserDefaults.standard.string(forKey: "token")!) {(result: JSON) in
            if(result != JSON.null){
                self.birds = result
                
                if let birdsToCache = result.rawString() {
                    UserDefaults.standard.set(birdsToCache, forKey: "birdscollection")
                }
                
                DispatchQueue.main.async(execute: {self.refresh()})
            } else{
                var collection = UserDefaults.standard.string(forKey: "birdscollection") as! String

                if (!collection.isEmpty){
                    self.birds = JSON.parse(collection)
                    DispatchQueue.main.async(execute: {self.refresh()})
                    
                } else {
                    let overviewAlert = UIAlertController(title: "Notificatie", message: "Lijst kon niet worden gedownload, heeft u internet?", preferredStyle: UIAlertControllerStyle.alert)
                    
                    let overviewAction = UIAlertAction(title: "ok", style: UIAlertActionStyle.default, handler: nil)
                    
                    overviewAlert.addAction(overviewAction)
                    
                    self.present(overviewAlert, animated: true, completion: nil)
                }
                

            }
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return birds.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath) 
        cell.textLabel?.text = birds[indexPath.row]["name"].string        
        return cell
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        performSegue(withIdentifier: "showDetail", sender: indexPath)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        if let rowSelected = (sender as? IndexPath)?.row {
            if let destinationVC = segue.destination as? DetailViewController{
                destinationVC.bird = birds[rowSelected]
            }
        }
        
        if let loginVC = segue.destination as? LoginViewController {
            loginVC.loginCompletion = {
                self.fetchData()
            }
        }

    }
    
    func refresh()
    {
        self.tableView.reloadData()
    }
    
}
