import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value:any,filteredString:Object) {
    console.log(filteredString)
    if(value.length===0 || (! filteredString["category"]) && (!filteredString["searchitem"])){
      return  value;
    }
    const users=[];
    if(filteredString["category"] && (!filteredString["searchitem"])){
      for(const user of value){
        if(user["category"].toLowerCase()===filteredString["category"].toLowerCase()){
          users.push(user)
        }
      }
      return users;
    }
    if(!filteredString["category"] && (filteredString["searchitem"])){
      for(const user of value){
        if(user["productname"].toLowerCase()===filteredString["searchitem"].toLowerCase()){
          users.push(user)
        }
      }
      return users;
    }
    
    for(const user of value){
      if(user["productname"].toLowerCase()===filteredString["searchitem"].toLowerCase() && user["category"].toLowerCase()===filteredString["category"].toLowerCase()){
        users.push(user)
      }
    }
    return users;
  }
  
}
