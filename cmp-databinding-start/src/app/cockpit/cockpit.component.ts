import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>;
  @Output() blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>;
  newServerName = '';
  newServerContent = '';
  @ViewChild('serverContentInput', { static: true }) serverContentInput: ElementRef

  constructor() { }

  ngOnInit(): void {
  }
  onAddServer(serverName) {
    this.serverCreated.emit({
      serverName: serverName,
      serverContent: this.serverContentInput.nativeElement.value
    })
  }

  onAddBlueprint(serverName) {
    this.blueprintCreated.emit({
      serverName: serverName,
      serverContent: this.serverContentInput.nativeElement.value
    })
  }
}
