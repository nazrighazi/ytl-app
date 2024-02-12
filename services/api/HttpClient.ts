export class HttpClient {
  protected async post(url: string, body?: any) {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  protected async get(url: string) {
    return await fetch(url);
  }

  protected async put(url: string, body?: any) {
    return await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }
}
