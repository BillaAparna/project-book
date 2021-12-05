import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value:any,filteredString:Object) {
    if(value.length===0 || (filteredString["category"]==='' && filteredString["productname"]==='')){
      return  value;
    }
    if(filteredString["category"]===''){
      return value;
    }
    const users=[];
    if(filteredString["searchitem"]===''){
      for(const user of value){
        if(user["category"]===filteredString["category"]){
          users.push(user)
        }
      }
      return users;
    }
    
    for(const user of value){
      if(user["productname"]===filteredString["searchitem"] && user["category"]===filteredString["category"]){
        users.push(user)
      }
    }
    return users;
  }
  
}
