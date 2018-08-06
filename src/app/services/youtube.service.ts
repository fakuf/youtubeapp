import { Injectable } from '@angular/core';
import { Http,URLSearchParams  } from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
 private youtubeUrl:string = "https://www.googleapis.com/youtube/v3";
 private apikey:string = "AIzaSyB4xIUZDn5i7sMcnmF_tCWVhSVS77aTzsA";
 private playlist:string ="PL6XRrncXkMaUoSMd-1D5uIt7uZ0nWxkMy";
 private nextPageToken:string = "CAoQAA";

  constructor(public http:Http) { }

  getVideos(){
    let url = `${this.youtubeUrl}/playlistItems`;
    let params = new URLSearchParams();
    params.set('part', 'snippet');
    params.set('maxResults', '10');
    params.set('playlistId', this.playlist);
    params.set('key', this.apikey);

    return this.http.get(url, {search:params}).pipe(map(res=>{
      console.log(res.json());
      this.nextPageToken = res.json().nextPageToken;

      let videos:any[]=[];
      for (let video of res.json().items){
        let snippet = video.snippet;
        videos.push(snippet);
      }
      return videos;
    }));
  }


}
