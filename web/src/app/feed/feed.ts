export interface Feed {
  highlight?: Post;
  posts: Post[];
}

export interface Post {
  barName: String;
  barPicture: string; // Base64
  carrousel?: Carrousel[];
  people?: PostPerson[];
}

export interface PostPerson {
  name: string; // Base64
  picture: String; 
}

export interface Carrousel {
  picture: string; // Base64
  author: String;
}