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
    var filteredBirds : [JSON] = []
    var imageCache = [String:UIImage]()
    let searchController = UISearchController(searchResultsController: nil)
    
    
    func filterContentForSearchText(searchText: String, scope: String = "All") {
        
        filteredBirds = []
        
        if let items = birds.array {
            for item in items {
                if (item["name"].string?.contains(searchText))! {
                    filteredBirds.append(item)
                }
            }
        }
        
        tableView.reloadData()
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.title = "Overzicht"
        
        if(!UserDefaults.standard.bool(forKey: "isLoggedIn")){
            self.performSegue(withIdentifier: "LoginView", sender: self)
        } else{
            fetchData()
        }
        
        searchController.searchResultsUpdater = self
        searchController.dimsBackgroundDuringPresentation = false
        definesPresentationContext = true
        tableView.tableHeaderView = searchController.searchBar
        
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
        
        if searchController.isActive && searchController.searchBar.text != "" {
            return filteredBirds.count
        }
        
        return birds.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {

        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        
        if searchController.isActive && searchController.searchBar.text != "" {
            cell.textLabel?.text = filteredBirds[indexPath.row]["name"].string
        } else {
            cell.textLabel?.text = birds[indexPath.row]["name"].string
        }
        
        return cell
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        performSegue(withIdentifier: "showDetail", sender: indexPath)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        if let rowSelected = (sender as? IndexPath)?.row {
            if let destinationVC = segue.destination as? DetailViewController{
               
                if searchController.isActive && searchController.searchBar.text != "" {
                    destinationVC.bird = filteredBirds[rowSelected]
                } else {
                    destinationVC.bird = birds[rowSelected]
                }
  
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


extension OverViewController : UISearchResultsUpdating {
    func updateSearchResults(for searchController: UISearchController) {
        filterContentForSearchText(searchText: searchController.searchBar.text!)
    }
}
