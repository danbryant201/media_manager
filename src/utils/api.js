// @flow
import { IApiMediaItem } from './interfaces';

type GetTokenFunc = { (): Promise<string> };

export default class Api {
  getToken: GetTokenFunc;
  baseUrl: string;
  axios: any;

  constructor(getToken: GetTokenFunc) {
    this.getToken = getToken;
    this.baseUrl = 'https://djbhost01.azurewebsites.net/api/';
    this.axios = require('axios');
  }

  async getMedia(mediaId: string): Promise<IApiMediaItem> {
    const token = await this.getToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await this.axios.get(
      `${this.baseUrl}/GetMedia?mediaId=${mediaId}`,
      config
    );
    const mediaItem: IApiMediaItem = response.data;
    return mediaItem;
  }

  async getMediaList(
    category: string,
    page: number = 1
  ): Promise<IApiMediaItem[]> {
    const token = await this.getToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await this.axios.get(
      `${this.baseUrl}/GetMediaList?category=${category}`,
      config
    );
    const mediaItems: IApiMediaItem[] = response.data;
    return mediaItems;
  }
}
