export class Serie {
    id: number;
    name: string;
    channel: string;
    seasons: number;
    description: string;
    webPage: string;
    poster: string;

    constructor(id: number, name: string, channel: string, seasons: number, description: string, webPage: string, poster: string) {
        this.id = id;
        this.name = name;
        this.channel = channel;
        this.seasons = seasons;
        this.description = description;
        this.webPage = webPage;
        this.poster = poster;
    }
}
