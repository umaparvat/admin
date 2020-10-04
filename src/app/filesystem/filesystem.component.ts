import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-filesystem',
  templateUrl: './filesystem.component.html',
  styleUrls: ['./filesystem.component.css']
})
export class FilesystemComponent implements OnInit {
  name = "fs";
  constructor(private routes: ActivatedRoute) { 
    console.log("filesystem component created");
  }

  ngOnInit(): void {
    console.log("filesystem component init");
  }

}
