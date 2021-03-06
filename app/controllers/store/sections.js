import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class StoreSectionsController extends Controller {
    @tracked modalId = 0;
    @tracked modalTitle;
    @tracked modalDesc;
    @tracked modalRoute;

    listProducts = [];
    @tracked addStockVisible = false;

    @action deleteModal(section) {
        this.modalId = section.id;
        this.modalTitle = "Remove " + section.name + " section's ?";
        this.modalDesc = "If you delete this section, you alors delete the " + section.products.length + " products in it !";
        this.modalRoute = "store.sections.delete";
        //section.products.forEach(element => console.log(element.packs));
        $('.ui.tiny.modal').modal('show');
    }

    @action deleteProductModal(product) {
        this.modalId = product.id;
        this.modalTitle = "Remove a product ?";
        this.modalDesc = "Are you sure you want to delete " + product.name + " ?";
        this.modalRoute = "store.sections.deleteProduct";
        $('.ui.tiny.modal').modal('show');
    }

    @action showAddStock() {
        this.addStockVisible = !this.addStockVisible;
        console.log(this.addStockVisible);
    }

    @action productCheck(product) {
        debugger;
        if (this.listProducts.includes(product)) {
            let pIndex = this.listProducts.indexOf(product);
            this.listProducts.slice(pIndex, 1);
        }
        else {
        this.listProducts.push(product);
        }
        console.log(this.listProducts);
    }
}