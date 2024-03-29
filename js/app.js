import Home from './views/pages/Home.js';
import Items from './views/pages/Items.js';
import DetailItem from './views/pages/DetailItem.js';
import PokePage from './views/pages/pokePage.js';
import Moves from './views/pages/Moves.js';
import DetailMove from './views/pages/DetailMove.js';
import Error404 from './views/pages/Error404.js';
import Equipe from './views/pages/Equipe.js';

import Utils from './services/Utils.js';

const routes = {
    '/'                 : Home
    , '/items'          : Items
    , '/item/:id'       : DetailItem
    , '/pokemon/:id'    : PokePage
    , '/moves'          : Moves
    , '/move/:id'       : DetailMove
    , '/404'            : Error404
    , '/equipe'         : Equipe

};

const router = async () => {

    const content = null || document.querySelector('#content');

    let request = Utils.parseRequestURL()

    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    let page = routes[parsedURL] ? new routes[parsedURL] : Error404

    if (request.id) {
        page.id = request.id;
    }
    
    console.log(page)
    content.innerHTML = await page.render();
    await page.after_render();
  
    if (page instanceof Items || page instanceof Moves) {
        await page.bindEvents();
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);