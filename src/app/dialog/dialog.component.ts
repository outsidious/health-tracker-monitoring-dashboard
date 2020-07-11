import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  DoCheck,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-example-dialog',
  templateUrl: 'dialog.component.html'
})
export class DialogComponent implements OnInit, AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  DoCheck,
  OnChanges,
  OnDestroy{

  constructor(private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit() {
    console.log(`OnInit`);
  }

  ngOnChanges(){
    console.log(`OnChanges`);
  }

  public close(){
    this.dialogRef.close();
  }

  ngDoCheck() { console.log(`DoCheck`); }

  ngAfterContentInit() { console.log(`AfterContentInit`);  }

  // Beware! Called frequently!
  // Called in every change detection cycle anywhere on the page
  ngAfterContentChecked() { console.log(`AfterContentChecked`); }

  ngAfterViewInit() { console.log(`AfterViewInit`); }

  // Beware! Called frequently!
  // Called in every change detection cycle anywhere on the page
  ngAfterViewChecked() { console.log(`AfterViewChecked`); }

  ngOnDestroy() { console.log(`OnDestroy`); }

}