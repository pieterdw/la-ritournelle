import axios from 'axios';

export class Api {
  public static cmsBasePath = 'https://admin.vakantiehuisantibes.com';
  public static websiteBasePath = 'https://www.vakantiehuisantibes.com';

  public static get = async <T>(path: string): Promise<T> => {
    if (path.indexOf('http') !== 0) {
      path = Api.cmsBasePath + path;
    }

    try {
      const result = await axios.get<T>(`${path}?token=ab5b0c4737b57b8d7bac392bb68912`);
      if (result.status !== 200) {
        console.log('failed: ', path);
      }
      return result.data;
    } catch (error) {
      console.log('err', error);
      throw error;
    }
  };

  public static post = async <T>(path: string, content?: any): Promise<T> => {
    if (path.indexOf('http') !== 0) {
      path = Api.cmsBasePath + path;
    }
    try {
      const result = await axios.post<T>(`${path}?token=ab5b0c4737b57b8d7bac392bb68912`, content, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (result.status !== 200) {
        console.log('failed: ', path);
      }
      return result.data;
    } catch (error) {
      console.log('err', error);
      throw error;
    }
  };
}
