import { Injectable } from '@angular/core';
// SERVICES
import { ApiService, GlobalDataService } from '../common';
import { SnackMessageService } from '../notifcation';
// MODELS
import { HTTP_REQ } from '@models/common';
import { USER } from '@models/auth';
@Injectable({
  providedIn: 'root',
})
export class UserListService {
  constructor(
    private apiService: ApiService,
    private snackMessage: SnackMessageService,
    private globalDataService: GlobalDataService
  ) {}
  // LIST USERS
  async getAllUsers(): Promise<USER[]> {
    const httpData: HTTP_REQ = { url: 'users', params: {} };
    const { success, error, data } = await this.apiService.get(httpData);
    if (success && data?.length > 0) {
      const currentUser: USER | null =
        this.globalDataService.currentUser$.getValue();
      const cleanData: USER[] = data.map((usr: USER) => {
        delete usr.password;
        return usr;
      });
      if (currentUser?.role === 2) {
        cleanData.filter((usr) => usr.role === 1);
      }
      return cleanData;
    } else {
      this.snackMessage.show({
        message: error?.message || 'Failure during list users profile',
      });
      return [];
    }
  }
}
