import {createSiteMenuTemplate} from "./view/site-menu";
import {createFilterTemplate} from "./view/filter";
import {createBordContainer} from "./view/bordContainer";
import {createBoardSortList} from "./view/bordSortList";
import {createTaskEditTemplate} from "./view/task-edit";
import {createTaskTemplate} from "./view/task";
import {createLoadMoreButton} from "./view/loadMoreButton";
import {generateTask} from "./mock/task";
import {generateFilter} from "./mock/filter.js";

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate(filters));
render(siteMainElement, createBordContainer());

const board = siteMainElement.querySelector(`.board`);
const taskContainer = board.querySelector(`.board__tasks`);

render(board, createBoardSortList(), `afterbegin`);
render(taskContainer, createTaskEditTemplate(tasks[0]));

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  render(taskContainer, createTaskTemplate(tasks[i]));
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  render(board, createLoadMoreButton());

  const loadMoreButton = board.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => render(taskContainer, createTaskTemplate(task)));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
