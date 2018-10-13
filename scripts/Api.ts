import axios from 'axios';

export class Api {
  public static get = async <T>(path: string): Promise<T> => {
    const result = await axios.get<T>(
      `https://admin.vakantiehuisantibes.com${path}?token=ab5b0c4737b57b8d7bac392bb68912`
    );
    return result.data;
  };
}
