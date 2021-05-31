import { Data } from "../../interfaces/storage";
import bestScoreData from '../../params/data-to-best-score';
import { BestScore } from "../../components";

const handleScoreLink = (bestScore: BestScore): void => {
  const data: Data[] = [];

  bestScoreData.scores.forEach((scoreItem) => {
    bestScoreData.users.forEach((userItem) => {
      if (userItem.id === scoreItem.id) {
        data.push({ ...userItem, ...scoreItem });
      }
    });
  });
  const processedData = data
  .sort((item1, item2): number => {
    const score1 = item1.score as number;
    const score2 = item2.score as number;
    return score2 - score1;
  })
  .slice(0, 11);

  setTimeout(() => bestScore.renderScores(processedData), 100);
};

export default handleScoreLink;