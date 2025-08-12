import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { AuthGuard } from './app/core/guards/auth.guard';

export const appRoutes: Routes = [
    { 
        path: '', 
        loadComponent: () => import('./app/pages/landing/landing').then(m => m.Landing) 
    },
    {
        path: 'app',
        loadComponent: () => import('./app/layout/component/app.layout').then(m => m.AppLayout),
        children: [
            { 
                path: 'crud', 
                loadComponent: () => import('./app/pages/crud/crud').then(m => m.Crud),
                canActivate: [AuthGuard] 
            },
            { 
                path: 'uikit', 
                loadChildren: () => import('./app/pages/uikit/uikit.routes'),
                canActivate: [AuthGuard] 
            },
            { 
                path: 'documentation', 
                loadComponent: () => import('./app/pages/documentation/documentation').then(m => m.Documentation),
                canActivate: [AuthGuard] 
            },
            { 
                path: 'pages', 
                loadChildren: () => import('./app/pages/pages.routes'),
                canActivate: [AuthGuard] 
            }
        ]
    },
    { 
        path: 'auth', 
        loadChildren: () => import('./app/pages/auth/auth.routes') 
    },
    { 
        path: 'notfound', 
        loadComponent: () => import('./app/pages/notfound/notfound').then(m => m.Notfound) 
    },
    { path: '**', redirectTo: '/notfound' }
];