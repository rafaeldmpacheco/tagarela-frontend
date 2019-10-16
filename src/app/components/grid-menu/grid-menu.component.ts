import { Component, Input } from '@angular/core';

export interface GridMenuItem {
	title: string;
	action: any;
	icon: string;
	params?: any;
	roles: string[];
	isVisible: boolean;
}

@Component({
	selector: 'grid-menu',
	templateUrl: 'grid-menu.component.html'
})
export class GridMenuComponent {
	@Input()
	public pages: GridMenuItem[] = [];
}
