import { Pipe, PipeTransform } from "@angular/core";
import { pipe } from "rxjs";

// create a custom pipe to shorten string
// IMPORTANT!! Pipe need to implements PipeTransform
@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements
  PipeTransform {
  transform(value: any, limit: number) {
    if ( value.length > limit){
      return value.substr(0, limit) + '...'
    }else{
      return value
    }

  }
}
