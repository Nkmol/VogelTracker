//
//  ApiManager.swift
//  BirdTracker
//
//  Created by Jamam Witwit on 10/04/2017.
//  Copyright © 2017 Witwit. All rights reserved.
//

import Foundation
import SwiftyJSON
import Alamofire


class ApiManager : NSObject {
    
    static let sharedInstance = ApiManager()
    
    let baseUrl = "https://vogeltracker.herokuapp.com/"
    
    func register (user : Dictionary<String, String>, completion: @escaping (_ result: Dictionary<String, Any>?, _ error: Error?) -> Void) {
        
        guard let endpoint = URL(string: baseUrl + "register") else {
                    print("Not a valid url")
                    return
        }
        
        Alamofire.request(endpoint, method: .post, parameters: user).responseJSON { response in
            
            switch response.result {
            case .success(let value):
                completion(value as? Dictionary, response.error)
            case .failure(let error):
                completion(nil, error)
            }
        }
    }
    
    func login (user: Dictionary<String, String>, completion: @escaping (_ result: Dictionary<String, Any>?, _ error: Error?) -> Void) {
        
        guard let endpoint = URL(string: baseUrl + "login") else {
            print("not a valid url")
            return
        }
        
        Alamofire.request(endpoint, method: .post, parameters: user).responseJSON { response in
            switch response.result {
                case .success(let value) :
                    completion(value as? Dictionary, response.error)
                case .failure(let error):
                    completion (nil, error)
            }
        }
    }
    
    func getBirds(token : String, completion: @escaping (_ result: JSON, _ error: Error?) -> Void)  {
       
        guard let endpoint = URL(string: baseUrl + "birds") else {
            print("not a valid url")
            return
        }
        
        let headers : HTTPHeaders = [
            "Authorization" : "JWT " + token,
            "Accept": "application/json"
        ]
        
        Alamofire.request(endpoint, headers: headers)
            .validate(statusCode: 200..<300)
            .validate(contentType: ["application/json"])
            .responseJSON { response in
                switch response.result {
                case .success:
                    print("Validation Successful")
                    let json = JSON(response.value)
                    completion (json, response.error)
                case .failure(let error):
                    print(error)
                    completion(JSON.null, error)
                }
        }
    }
    
    func getReports( completion: @escaping (_ result: JSON, _ error: Error?) -> Void) {
        
        let token = UserDefaults.standard.string(forKey: "token")!
        
        guard let endpoint = URL(string: baseUrl + "reports") else {
            print("not a valid url")
            return
        }
        
        let headers : HTTPHeaders = [
            "Authorization" : "JWT " + token,
            "Accept": "application/json"
        ]

        Alamofire.request(endpoint, headers: headers)
            .validate(statusCode: 200..<300)
            .validate(contentType: ["application/json"])
            .responseJSON { response in
                switch response.result {
                case .success:
                    print("Validation Successful")
                    let json = JSON(response.value)
                    completion (json, response.error)
                    //print(json)
                    case .failure(let error):
                        print(error)
                    }
        }
    }
}
