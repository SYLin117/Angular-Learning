import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // get data from resolve
    this.route.data
      .subscribe((data: Data) => {
        this.server = data['server']
      })
    // const id = +this.route.snapshot.params['id'];
    // console.log(`server id= ${id}`)
    // this.server = this.serversService.getServer(id);

    // this.route.params.subscribe(
    //   (params: Params) => {
    //     const server = this.serversService.getServer(+params['id']) // remember to cast string to number
    //     console.log(`server: ${JSON.stringify(server)}`)
    //     this.server = server
    //   }
    // )

  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' }) // preserve queryParams
  }

}
