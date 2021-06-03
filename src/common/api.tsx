export const MAIN_URL = `http://localhost:3001`;

interface IRequest {
  endpoint: string;
  headers?: Record<string, unknown>;
  params?: Record<string, unknown>;
  data?: Record<string, unknown>;
}

async function makeRequest(request: IRequest, method: string) {
  let url = `${MAIN_URL}/${request.endpoint}`;

  if (request.params) {
    Object.keys(request.params).forEach((param, ind) => {
      const paramsObj = request.params ? request.params : {};
      url += `${ind === 0 ? "?" : "&"}${param}=${paramsObj[param]}`;
    });
  }

  const headers = {
    "Content-Type": "application/json",
    ...request.headers,
  } as unknown as Headers;

  try {
    return fetch(url, {
      method: method,
      headers: headers,
      body: request.data ? JSON.stringify(request.data) : null,
    }).then((res) => {
      if (res.ok) return res.json();
      else throw Error;
    });
  } catch (e) {
    console.log(e);
  }
}

async function get<T>(request: IRequest): Promise<T> {
  return await makeRequest(request, "GET");
}

async function patch<T>(request: IRequest): Promise<T> {
  return await makeRequest(request, "PATCH");
}

async function post<T>(request: IRequest): Promise<T> {
  return await makeRequest(request, "POST");
}

async function remove<T>(request: IRequest): Promise<T> {
  return await makeRequest(request, "DELETE");
}

// Login

export async function getUser(req: ILoginDetails): Promise<boolean> {
  const request: IRequest = {
    endpoint: `login`,
    params: {
      username: req.username,
      password: req.password,
    },
  };

  const response = await get<any>(request);
  if (!response.success) return false;
  return response.success;
}

// Dogs

export async function getDogs(): Promise<any> {
  const request: IRequest = {
    endpoint: `dogs`,
  };

  const response = await get<any>(request);
  return response;
}

export async function updateDogInfo(dog: IDogData): Promise<boolean> {
  const { dog_id, dog_gender, dog_name, dog_age, dog_characteristics } = dog;
  const request: IRequest = {
    endpoint: `update/dog`,
    params: { dog_id, dog_gender, dog_name, dog_age, dog_characteristics },
  };

  const response = await patch<any>(request);
  return response.success;
}

// Exco

export async function getExcos(): Promise<IExcoData[]> {
  const request: IRequest = {
    endpoint: `excos`,
  };

  const response = await get<any>(request);
  return response;
}

export async function updateExcoInfo(exco: IExcoData): Promise<boolean> {
  const {
    exco_id,
    exco_name,
    exco_year_of_study,
    exco_hobbies,
    exco_favourite_dog,
  } = exco;
  const request: IRequest = {
    endpoint: `update/exco`,
    params: {
      exco_id,
      exco_name,
      exco_year_of_study,
      exco_hobbies,
      exco_favourite_dog,
    },
  };

  const response = await patch<any>(request);
  return response.success;
}

// Main Page

export async function getMainDescription(): Promise<string> {
  const request: IRequest = {
    endpoint: `mainpage`,
  };

  const response = await get<any>(request);
  return response.pawfriends_description;
}

export async function updateMainDescription(
  description: string
): Promise<boolean> {
  const request: IRequest = {
    endpoint: `update/mainpage`,
    params: {
      description,
    },
  };

  const response = await patch<any>(request);
  return response.success;
}

// Activity Page
export async function getActivityPosts(): Promise<IActivityPosts[]> {
  const request: IRequest = {
    endpoint: `activities`,
  };

  const response = await get<IActivityPosts[]>(request);
  return response;
}

export async function updateActivityPost(
  post: IActivityPosts
): Promise<boolean> {
  const { post_id, date_posted, activity_description } = post;

  const request: IRequest = {
    endpoint: `update/activity`,
    params: { post_id, date_posted, activity_description },
  };

  const response = await patch<any>(request);
  return response.success;
}
