import axios from 'axios';

export class Api {
  public static cmsBasePath = 'https://admin.vakantiehuisantibes.com';
  public static websiteBasePath = 'https://www.vakantiehuisantibes.com';

  public static get = async <T>(path: string): Promise<T> => {
    if (path.indexOf('http') === -1) {
      path = Api.cmsBasePath + path;
    }
    const result = await axios.get<T>(`${path}?token=ab5b0c4737b57b8d7bac392bb68912`);
    return result.data;
  };

  public static post = async <T>(path: string, content?: any): Promise<T> => {
    if (path.indexOf('http') === -1) {
      path = Api.cmsBasePath + path;
    }
    const result = await axios.post<T>(`${path}?token=ab5b0c4737b57b8d7bac392bb68912`, content, {
      headers: { 'Content-Type': 'application/json' }
    });
    return result.data;
  };
}
