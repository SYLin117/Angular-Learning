import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];
  constructor(private loggingService: LoggingService) { }

  addAcount(name: string, status: string) {
    this.loggingService.logStatusChange(status)
    this.accounts.push({ name: name, status: status })
  }

  updateStatus(id: number, status: string) {
    this.loggingService.logStatusChange(status)
    this.accounts[id].status = status
  }
}
