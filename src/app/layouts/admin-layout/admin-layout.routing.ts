import { Routes } from '@angular/router';
import { AuthGuard } from '../../services/auth.guard';


import { BankRegisterComponent } from '../../pages/bank-register/bank-register.component';
import { BankRegisterAddComponent } from '../../pages/bank-register/bank-register-add/bank-register-add.component';
import { BankRegisterEditComponent } from '../../pages/bank-register/bank-register-edit/bank-register-edit.component';
import { BankRegisterDetailComponent } from '../../pages/bank-register/bank-register-detail/bank-register-detail.component';

import { CustomerComponent } from '../../pages/customer/customer.component';
import { CustomerAddComponent } from '../../pages/customer/customer-add/customer-add.component';
import { CustomerEditComponent } from '../../pages/customer/customer-edit/customer-edit.component';
import { CustomerDetailComponent } from '../../pages/customer/customer-detail/customer-detail.component';

import { DriverComponent } from '../../pages/driver/driver.component';
import { DriverDetailComponent } from '../../pages/driver/driver-detail/driver-detail.component';

import { NotificationComponent } from '../../pages/notification/notification.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { StaffComponent } from '../../pages/staff/staff.component';
import { StaffDetailComponent } from '../../pages/staff/staff-detail/staff-detail.component';

import { CityComponent } from '../../pages/city/city.component';
import { CountyComponent } from '../../pages/county/county.component';
import { StateComponent } from '../../pages/state/state.component';

import { MessageComponent } from '../../pages/message/message.component';
import { MessageAddComponent } from '../../pages/message/message-add/message-add.component';
import { MessageDetailComponent } from '../../pages/message/message-detail/message-detail.component';

import { SettingComponent } from '../../pages/setting/setting.component';
import { SettingDetailComponent } from '../../pages/setting/setting-detail/setting-detail.component';

import { VehicleComponent } from '../../pages/vehicle/vehicle.component';
import { VehicleDetailComponent } from '../../pages/vehicle/vehicle-detail/vehicle-detail.component';

import { PmtBookingComponent } from '../../pages/pmt-booking/pmt-booking.component';
import { PmtBookingDetailComponent } from '../../pages/pmt-booking/pmt-booking-detail/pmt-booking-detail.component';

import { PmtRouteComponent } from '../../pages/pmt-route/pmt-route.component';
import { PmtRouteDetailComponent } from '../../pages/pmt-route/pmt-route-detail/pmt-route-detail.component';

import { PmtWaybillComponent } from '../../pages/pmt-waybill/pmt-waybill.component';
import { PmtWaybillDetailComponent } from '../../pages/pmt-waybill/pmt-waybill-detail/pmt-waybill-detail.component';

import { PmtScheduleComponent } from '../../pages/pmt-schedule/pmt-schedule.component';
import { PmtReservationComponent } from '../../pages/pmt-reservation/pmt-reservation.component';
import { PmtReservationDetailComponent } from '../../pages/pmt-reservation/pmt-reservation-detail/pmt-reservation-detail.component';

import { PmtBoardingComponent } from '../../pages/pmt-boarding/pmt-boarding.component';


export const AdminLayoutRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: '../../dashboard/dashboard.module#DashboardModule' },

    { path: 'bank-register',                component: BankRegisterComponent,           canActivate: [AuthGuard] },
    { path: 'bank-register/add',            component: BankRegisterAddComponent,        canActivate: [AuthGuard] },
    { path: 'bank-register/edit/:id',       component: BankRegisterEditComponent,       canActivate: [AuthGuard] },
    { path: 'bank-register/detail/:id',     component: BankRegisterDetailComponent,     canActivate: [AuthGuard] },

    { path: 'customer',                     component: CustomerComponent,               canActivate: [AuthGuard] },
    { path: 'customer/add',                 component: CustomerAddComponent,            canActivate: [AuthGuard] },
    { path: 'customer/edit/:id',            component: CustomerEditComponent,           canActivate: [AuthGuard] },
    { path: 'customer/detail/:id',          component: CustomerDetailComponent,         canActivate: [AuthGuard] },

    { path: 'city',                         component: CityComponent,                   canActivate: [AuthGuard] },
    { path: 'state',                        component: StateComponent,                  canActivate: [AuthGuard] },
    { path: 'county',                       component: CountyComponent,                 canActivate: [AuthGuard] },

    { path: 'driver',                       component: DriverComponent,                 canActivate: [AuthGuard] },
    { path: 'driver/detail/:id',            component: DriverDetailComponent,           canActivate: [AuthGuard] },
    { path: 'staff',                        component: StaffComponent,                  canActivate: [AuthGuard] },
    { path: 'staff/detail/:id',             component: StaffDetailComponent,            canActivate: [AuthGuard] },

    { path: 'user-profile',                 component: UserProfileComponent,            canActivate: [AuthGuard] },
    { path: 'notification',                 component: NotificationComponent,           canActivate: [AuthGuard] },
    { path: 'user-profile',                 component: UserProfileComponent,            canActivate: [AuthGuard] },
    { path: 'setting',                      component: SettingComponent,                canActivate: [AuthGuard] },
    { path: 'setting/detail/:id',           component: SettingDetailComponent,          canActivate: [AuthGuard] },
    { path: 'vehicle',                      component: VehicleComponent,                canActivate: [AuthGuard] },
    { path: 'vehicle/detail/:id',           component: VehicleDetailComponent,          canActivate: [AuthGuard] },

    { path: 'pmt-booking',                  component: PmtBookingComponent,             canActivate: [AuthGuard] },
    { path: 'pmt-booking/detail/:id',       component: PmtBookingDetailComponent,       canActivate: [AuthGuard] },

    { path: 'pmt-boarding',                 component: PmtBoardingComponent,            canActivate: [AuthGuard] },
    { path: 'pmt-reservation',              component: PmtReservationComponent,         canActivate: [AuthGuard] },
    { path: 'pmt-reservation/detail/:id',   component: PmtReservationDetailComponent,   canActivate: [AuthGuard] },
    { path: 'pmt-schedule',                 component: PmtScheduleComponent,            canActivate: [AuthGuard] },
    { path: 'pmt-waybill',                  component: PmtWaybillComponent,             canActivate: [AuthGuard] },
    { path: 'pmt-waybill/detail/:id',       component: PmtWaybillDetailComponent,       canActivate: [AuthGuard] },
    { path: 'pmt-route',                    component: PmtRouteComponent,               canActivate: [AuthGuard] },
    { path: 'pmt-route/detail/:id',         component: PmtRouteDetailComponent,         canActivate: [AuthGuard] },
    { path: 'message',                      component: MessageComponent,                canActivate: [AuthGuard] },
    { path: 'message/add',                  component: MessageAddComponent,             canActivate: [AuthGuard] },
    { path: 'message/detail/:id',           component: MessageDetailComponent,          canActivate: [AuthGuard] },

    { path: 'forms', loadChildren: '../../forms/forms.module#FormsModule' },
    { path: 'tables', loadChildren: '../../tables/tables.module#TablesModule' },
    { path: 'charts', loadChildren: '../../charts/charts.module#ChartsModule' },
    { path: 'utils', loadChildren: '../../utils/utils.module#UtilsModule' },
    { path: 'layouts', loadChildren: '../../layouts/layouts.module#LayoutsModule' },
];
