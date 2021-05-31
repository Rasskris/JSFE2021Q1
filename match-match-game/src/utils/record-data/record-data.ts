import Storage from '../../storage/storage';
import bestScoreData from '../../params/data-to-best-score';
import { Data } from '../../interfaces/storage';

const sucsessCb = (data: Data[]): void => {
  if (data[0].score) {
    bestScoreData.scores = data;
  } else {
    bestScoreData.users = data;
  }
};

const recordDataToBestScore = async (storage: Storage): Promise<void> => {
  await storage.get('users', 'readonly', sucsessCb);
  await storage.get('scores', 'readonly', sucsessCb);
};

export default recordDataToBestScore;