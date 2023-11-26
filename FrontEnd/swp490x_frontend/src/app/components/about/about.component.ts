import { Component, OnInit } from '@angular/core';
import { assetsPath } from 'src/app/enviroments/environment';
import { ItemMenuName } from 'src/app/interface/menu-item.interface';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  public assetsPath = assetsPath;
  
  constructor(private _menuService: MenuService) {}

  ngOnInit(): void {
    this._menuService.setActiveMenu(ItemMenuName.ABOUT);
  }
}
