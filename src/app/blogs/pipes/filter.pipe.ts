import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propName:any): any {
    const result: any[] = []
    if(!value || filterString == "" || propName == ""){
      return value
    }else{
      value.forEach(blog=>{
        if(blog[propName].trim().toLowerCase().includes(filterString.trim().toLowerCase())){
          result.push(blog)
        }
      })
      return result
    }
  }
}
