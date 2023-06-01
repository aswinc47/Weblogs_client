import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadimgService {

  constructor(private http:HttpClient) {

   }

   uploadImage(vals:FormData):Observable<any>{
      let data = vals
      console.log(data);
      return this.http.post('https://api.cloudinary.com/v1_1/dbychllpr/image/upload',data)
   }

}
