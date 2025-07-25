import { Routes } from '@angular/router';
import { Access } from './access';
import { Login } from './login';
import { Error } from './error';
import { NoAuthGuard } from '../../core/guards/no-auth.guard';

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'login', canActivate: [NoAuthGuard], component: Login },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
] as Routes;