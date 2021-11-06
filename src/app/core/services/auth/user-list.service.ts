import { Injectable } from '@angular/core';
// SERVICES
import { ApiService, GlobalDataService } from '../common';
import { SnackMessageService } from '../notifcation';
// MODELS
import { HTTP_REQ } from '@models/common';
import { REGISTER_FORM_DATA, USER } from '@models/auth';
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
  // ADD NEW USER
  async addNewUser(formData: REGISTER_FORM_DATA): Promise<boolean> {
    delete formData.passwordConfirm;
    const httpData: HTTP_REQ = {
      url: 'register',
      body: { ...formData },
    };
    const { success, data, error } = await this.apiService.post(httpData);
    if (success && data?.accessToken) {
      this.snackMessage.show({
        message: `User (${formData?.fullName}) has been created`,
      });
      return true;
    } else {
      this.snackMessage.show({
        message: error?.message || 'Failure during register',
      });
      return false;
    }
  }
  // UPDATE USER
  // ! JSON SERVER AUTH NOT ALLOW THIS METHOD

  async updateUser(user: USER): Promise<boolean> {
    const httpData: HTTP_REQ = {
      url: `api/users/put/${user.id}`,
      body: user,
    };
    const { success, error, data } = await this.apiService.put(httpData);
    if (success) {
      console.log({ data });
      return true;
    } else {
      this.snackMessage.show({
        message: error?.message || 'Failure during update',
      });
      return false;
    }
  }
}
