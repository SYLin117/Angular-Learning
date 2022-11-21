import { ViewEncapsulation } from '@angular/compiler';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ContentChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // encapsulation: ViewEncapsulation.Emulated // None, Native
})
export class ServerElementComponent implements OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {
  @Input() element: { type: string, name: string, content: string }
  @Input() name: string
  @ViewChild('heading', { static: true }) header: ElementRef
  @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef
  constructor() {
    console.log('constructor called')
  }

  ngOnInit(): void {
    console.log('ngOnInit called')
    console.log('Text content: '+this.header.nativeElement.textContent)
    console.log('Text Content of paragraph: '+this.paragraph.nativeElement.textContent)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    console.log('ngOnChanges called')
  }

  ngDoCheck(): void {
    console.log('ngDoCheck called')
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContetntInit called')
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentCheck called')
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called')
    console.log('Text content: '+this.header.nativeElement.textContent)
    console.log('Text Content of paragraph: '+this.paragraph.nativeElement.textContent)
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called')
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called')
  }

}
