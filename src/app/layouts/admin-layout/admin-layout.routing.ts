import { Routes } from '@angular/router';
import { AuthGuard } from '../../services/auth.guard';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
    { path: 'forms', loadChildren: './forms/forms.module#FormsModule' },
    { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
    { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
    { path: 'utils', loadChildren: './utils/utils.module#UtilsModule' },
    { path: 'layouts', loadChildren: './layouts/layouts.module#LayoutsModule' },
];
