import { action, set } from '@ember/object';
import RSVP from 'rsvp';
import AbstractRouteRoute from "./abstract-route";

export default class DashboardRoute extends AbstractRouteRoute {
    model() {
        if (this.userAuth.user) {
            let employeeLogged = this.userAuth.user;
            return RSVP.hash({
                connected: employeeLogged,
                orders: this.store.query('order', { filter: { idEmployee: employeeLogged.id, status: 'created' }, include: 'orderdetails' }),
            });
        }
    }

    @action prepareTransition(oderId) {
        this.transitionTo('dashboard.prepare', oderId);
    }
}