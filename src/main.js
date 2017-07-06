import App from './js/App';
import Style from './stylesheets/style.sass';
import offersList from './data/parent.json';
import offer from './data/child.json';
import Store from "./js/store/store";
import parser from "./js/helpers/parser";

const store = new Store(parser(offersList, offer));

new App(store).render();
