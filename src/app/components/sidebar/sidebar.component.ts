import { ChangeDetectionStrategy, Component } from '@angular/core';
import {IRoutes} from "../../../core/interfaces/routes-interface";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {

  collapsed: boolean = false

  buttonSymbol: string = this.collapsed ? '>' : '<'

  routes: IRoutes[] = [
    {
      name: 'Main',
      path: '/main',
      icon: 'home'
    },
    {
      name: 'FBI-wanted',
      path: '/fbi',
      icon: 'gavel'
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: 'settings'
    }
  ]

  changeCollapse(): void {
    this.collapsed = !this.collapsed
    this.changeSymbol()
  }

  changeSymbol() {
    this.buttonSymbol = this.collapsed ? '>' : '<'
  }

}
