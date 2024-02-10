import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { User, UserSubs } from "../interfaces/user";
import { API } from "src/assets/api/api.connection";

@Injectable({
    providedIn: 'root'
  })
  export class UserService extends ApiService {
    async edit(subUserId:UserSubs):Promise<boolean>{
        if(!subUserId.subscriptionId) return false;
        const res = await fetch(API+"User/SubscriptionId",{
          method:'PUT',
          headers:{
            "Content-type":"application/json",
            Authorization: "Bearer "+this.auth.token()
          },
          body: JSON.stringify(subUserId)
        })
        return res.ok
      };
}