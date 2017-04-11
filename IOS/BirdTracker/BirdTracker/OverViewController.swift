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
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        if(!UserDefaults.standard.bool(forKey: "isLoggedIn")){
            self.performSegue(withIdentifier: "LoginView", sender: self)
        } else{
            fetchData()
        }
    }
    
    @IBAction func unwindFromLogin(seque: UIStoryboardSegue){
        fetchData()
    }
    
    func fetchData(){
        let dataservice : DataService = DataService()
        dataservice.retreiveBirds(token: UserDefaults.standard.string(forKey: "token")!) {(result: JSON) in
            self.birds = result
            DispatchQueue.main.async(execute: {self.refresh()})
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
        
        let rowSelected = (sender as! IndexPath).row
        
        if let destinationVC = segue.destination as? DetailViewController{
            destinationVC.bird = birds[rowSelected]
        }
    }
    
    func refresh()
    {
        self.tableView.reloadData()
    }
    
}
