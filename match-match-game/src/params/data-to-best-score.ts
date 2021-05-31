import { Data } from '../interfaces/storage';

interface BestScoreData {
  users: Data[],
  scores: Data[],
}

const bestScoreData: BestScoreData = {
  users: [],
  scores: [],
}

export default bestScoreData;