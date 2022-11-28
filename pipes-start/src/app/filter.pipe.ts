import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false // make pipe run when data changed, THIS MIGHT LEED TO PERFORMANCE ISSUES (default is true)
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    console.log(filterString)
    if (filterString == undefined ||  filterString === '' || filterString.length === 0) {
      // console.log(`filterString.length= ${filterString.length}`)
      return value;
    }
    let resultArray = []
    for (const item of value) {

      if (item[propName] === filterString) {
        resultArray.push(item)
      }

    }
    return resultArray
  }

}
