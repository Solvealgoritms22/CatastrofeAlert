import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        Emergencias
        <a href="#" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">DO</a>
    </div>`
})
export class AppFooter {}
