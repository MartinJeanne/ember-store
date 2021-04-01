import Route from '@ember/routing/route';
import { action, set } from '@ember/object';
import RSVP from 'rsvp';
import AbstractRouteRoute from "./abstract-route";

export default class DashboardRoute extends AbstractRouteRoute {
    model() {
        if (this.userAuth.user) {
            let employeeLogged = this.userAuth.user;
            return RSVP.hash({
                connected: employeeLogged,
                ordersCreated: this.store.query('order', { filter: { idEmployee: employeeLogged.id, status: 'created' }, include: 'orderdetails' }),
                ordersPrepared: this.store.query('order', { filter: { idEmployee: employeeLogged.id, status: 'prepared' }, include: 'orderdetails' }),
                ordersDelivered: this.store.query('order', { filter: { idEmployee: employeeLogged.id, status: 'delivered' }, include: 'orderdetails' }),
            });
        }
    }
}