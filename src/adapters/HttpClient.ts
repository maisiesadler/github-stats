import axios from 'axios'

export interface HttpResponse<T> {
  statusCode?: number;
  data?: T
}

export class HttpClient {
  constructor(private readonly hostName: string) {
  }

  public async Get<T>(path: string, authToken: string): Promise<HttpResponse<T>> {
    const url = `${this.hostName}${path}`

    try {
      const response = await axios.get<T>(url, {
        headers: {
          'Authorization': `token ${authToken}`,
        },
      })
      return {
        statusCode: response.status,
        data: response.data,
      }
    } catch (error) {
      this.handleAxiosError(error)
      return {}
    }
  }

  private async handleAxiosError(error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log('error response', error.response);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
      console.log('error request', error.response);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
}
