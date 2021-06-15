import { Car } from '../../interfaces';
import { Loader } from '../../libs';
import { garageURL } from '../../constants';

const getDataByCarId = async (id: number, loader: Loader): Promise<Car> => {
  const { name, color } = await loader.getItem(garageURL, id);

  return { name, color };
};

export default getDataByCarId;
