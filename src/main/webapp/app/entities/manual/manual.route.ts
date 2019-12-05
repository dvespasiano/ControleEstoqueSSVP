import { ManualComponent } from './manual.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Routes } from '@angular/router';

export const manualRoute: Routes = [
    {
      path: '',
      component: ManualComponent,
      data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Manual'
      },
      canActivate: [UserRouteAccessService]
    }
  ];