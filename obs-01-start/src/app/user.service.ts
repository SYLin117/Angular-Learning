import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {
  // use Subject replace EventEmitter
  // Subject can't use with @Output
  activatedEmitter = new Subject<boolean>()

}
