import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Crud } from './app/pages/crud/crud';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { AuthGuard } from './app/core/guards/auth.guard';

export const appRoutes: Routes = [
    { path: '', component: Landing }, // Landing en la raíz
    {
        path: 'app',
        component: AppLayout,
        children: [
            { path: 'crud', component: Crud, canActivate: [AuthGuard] },
            { path: 'uikit', canActivate: [AuthGuard], loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation, canActivate: [AuthGuard] },
            { path: 'pages', canActivate: [AuthGuard], loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' }
];