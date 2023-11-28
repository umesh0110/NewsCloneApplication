export class newsData {
    uri: string | undefined;
    url: string = "";
    title: string = "";
    body: string = "";
    date: string = "";
    dateTime: string = "";
    authors: Author[] =[];
    image: string = "";
    source : Source = new Source();

  }

export class Author {
    uri: string ="";
    name: string ="";
    type: string="";
    isAgency: boolean = false;
  }

  export class Source {
    uri: string ="";
    title: string ="";
   
    
  }