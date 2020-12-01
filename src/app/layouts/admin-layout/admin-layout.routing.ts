import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';


import { ApiInformationComponent } from '../../pages/api-information/api-information.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';

export const AdminLayoutRoutes: Routes = [
    {
        path: 'dashboard',
        data: {
            reuse: true
        },
        component: DashboardComponent
    },
    {
        path: 'api-information',
        component: ApiInformationComponent
    },
    {
        path: 'user-profile',
        component: UserProfileComponent
    },
    {
        path: 'tables',
        component: TablesComponent
    },
];
