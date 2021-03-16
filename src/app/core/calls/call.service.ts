import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor(private fireService: AngularFirestore) { }

  async create(record: any, collection: string) {
    await this.fireService.collection(collection).add(record);
  }
}
