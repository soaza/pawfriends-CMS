interface ILoginDetails {
  username: string;
  password: string;
}

interface IDogData {
  dog_id: number;
  dog_age: number;
  dog_gender: string;
  dog_name: string;
  dog_characteristics: string;
  [key: string]: any;
}

interface IExcoData {
  exco_id: number;
  exco_name: string;
  exco_year_of_study: number;
  exco_hobbies: string;
  exco_favourite_dog: string;
  [key: string]: any;
}

interface IActivityPosts {
  post_id: number;
  date_posted: Date;
  activity_description: string;
}
