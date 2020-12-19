import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createBordContainer} from "./view/bordContainer.js";
import {createBoardSortList} from "./view/bordSortList";
import {createEditCard} from "./view/editCard.js";
import {createCard} from "./view/card.js";
import {createLoadMoreButton} from "./view/loadMoreButton.js";

const TASK_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate());
render(siteMainElement, createBordContainer());

const board = siteMainElement.querySelector(`.board`);
const taskContainer = board.querySelector(`.board__tasks`);

render(board, createBoardSortList(), `afterbegin`);
render(taskContainer, createEditCard());

for (let i = 0; i < TASK_COUNT; i++) {
  render(taskContainer, createCard());
}

render(board, createLoadMoreButton());
