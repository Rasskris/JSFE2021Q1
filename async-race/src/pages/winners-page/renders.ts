import { renderCarImage } from '../../shared';
import { countWinnersPerPage } from '../../constants';
import { Loader } from '../../libs';
import getDataByCarId from './helpers';
import store from '../../store/store';

const renderTableBody = (loader: Loader): Promise<string | undefined>[] | undefined => (
  store.winners?.map(async ({ id, wins, time }, index) => {
    if (id) {
      const { name, color } = await getDataByCarId(id, loader);

      const carNumber = store.winnersPage > 1 ? (countWinnersPerPage + index + 1) : (index + 1);

      const template = `
          <tr>
            <td>${carNumber}</td>
            <td>${renderCarImage(color)}</td>
            <td>${name}</td>
            <td>${wins}</td>
            <td>${time}s</td>
          </tr>
        `;

      return Promise.resolve(template);
    }
  })
);

const renderWinnersTableContent = async (loader: Loader) => {
  if (!renderTableBody(loader)) {
    return;
  }
  const promises = renderTableBody(loader) as Promise<string>[];
  const tableBody = await Promise.all(promises);

  // TODO fix

  const sortOrderByWins = store.sortBy === 'wins' ? store.sortOrder : '';
  const sortOrderByTime = store.sortBy === 'time' ? store.sortOrder : '';

  const template = `
  <thead>
    <tr>
      <th>№</th>
      <th>CAR</th>
      <th>NAME</th>
      <th>
        <div class="wins">WINS
          <button class="sort ${sortOrderByWins === 'DESC' ? 'desc' : ''}" data-sort-order="DESC" data-sort-by="wins">↓</button>
          <button class="sort ${sortOrderByWins === 'ASC' ? 'asc' : ''}" data-sort-order="ASC" data-sort-by="wins">↑</button>
        </div>
      </th>
      <th>
        <div class="best-time">BEST TIME
          <button class="sort ${sortOrderByTime === 'DESC' ? 'desc' : ''}" data-sort-order="DESC" data-sort-by="time">↓</button>
          <button class="sort ${sortOrderByTime === 'ASC' ? 'asc' : ''}" data-sort-order="ASC" data-sort-by="time">↑</button>
        </div>
      </th>
    </tr>
  </thead>
    ${tableBody.join('')}
  `;

  return template;
};

const renderWinnersCount = (): string => {
  const template = `
    <h2>Winners (${store.winnersCount})</h2>
    <h3>Page #${store.winnersPage}</h3>
    `;

  return template;
};

const renderWinnersContainer = async (loader: Loader): Promise<void> => {
  const winnersTable = document.getElementById('winners-table') as HTMLTableElement;
  const winnersCountWrap = document.getElementById('winners-count') as HTMLDivElement;

  winnersTable.innerHTML = await renderWinnersTableContent(loader) as string;
  winnersCountWrap.innerHTML = renderWinnersCount();
};

export { renderWinnersTableContent, renderWinnersCount, renderWinnersContainer };
