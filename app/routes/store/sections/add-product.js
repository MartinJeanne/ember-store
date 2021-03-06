import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import RSVP from 'rsvp';

export default class StoreSectionsAddProductRoute extends Route {
    @tracked sectionId;

    model(params) {
        this.sectionId = params.section_id;
        return RSVP.hash({
            section: this.store.findRecord('section', params.section_id),
        });
    }

    @action add(model) {
        let section = this.store.peekRecord('section', this.sectionId);
        let product = this.store.createRecord('product', {
            name: model.name,
            comments: model.comments,
            stock: model.stock,
            image: model.image,
            price: model.price,
            promotion: model.promotion,
            section: section
        });
        
        product.save().then(() => {
            this.transitionTo('store.sections');
        });
    }
}
