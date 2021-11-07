import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
// SERVICES
import { ApiService, GlobalDataService } from '../common';
import { SnackMessageService } from '../notifcation';
// MODELS
import { HTTP_REQ } from '@models/common';
import { PROFILE, REGISTER_FORM_DATA } from '@models/auth';
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
  async getAllUsers(): Promise<PROFILE[]> {
    const currentUser: PROFILE | null =
      this.globalDataService.currentUser$.getValue();

    const httpData: HTTP_REQ = {
      url: 'profiles',
      params: { role_lte: this.getRoleLTE(currentUser?.role) },
    };
    const { success, error, data } = await this.apiService.get(httpData);
    if (success && data?.length > 0) {
      return data;
    } else {
      this.snackMessage.show({
        message: error?.message || 'Failure during list users profile',
      });
      return [];
    }
  }
  // ADD NEW USER
  async addNewUser(
    formData: REGISTER_FORM_DATA
  ): Promise<{ success: boolean; user: PROFILE }> {
    const userUUID = uuidv4();
    // REGISTER USER
    const httpData: HTTP_REQ = {
      url: 'register',
      body: {
        email: formData?.email,
        password: formData?.password,
        id: userUUID,
      },
    };
    const { success, data, error } = await this.apiService.post(httpData);
    if (success && data?.accessToken) {
      // IF USER REGISTERED SUCCESSFULLY THEN CREATE PROFILE DATA
      const profileHttpData: HTTP_REQ = {
        url: 'profiles',
        body: {
          userId: userUUID,
          email: formData.email,
          fullName: formData.fullName,
          role: formData?.role,
        },
      };
      const profileResult = await this.apiService.post(profileHttpData);
      if (profileResult?.success) {
        this.snackMessage.show({
          message: `User (${formData?.fullName}) has been created`,
        });
        return { success: true, user: profileResult?.data };
      } else {
        return { success: false, user: profileResult?.data };
      }
    } else {
      this.snackMessage.show({
        message: error?.message || 'Failure during register',
      });
      return { success: false, user: data };
    }
  }

  async updateUser(
    user: PROFILE
  ): Promise<{ success: boolean; user: PROFILE }> {
    const httpData: HTTP_REQ = {
      url: `profiles/${user.id}`,
      body: user,
    };
    const { success, error, data } = await this.apiService.put(httpData);
    if (success) {
      return { success: true, user: data };
    } else {
      this.snackMessage.show({
        message: error?.message || 'Failure during update',
      });
      return { success: false, user: data };
    }
  }
  async deleteUser(
    userID: number
  ): Promise<{ success: boolean; user: PROFILE }> {
    const httpData: HTTP_REQ = {
      url: `profiles/${userID}`,
    };
    const { success, error, data } = await this.apiService.delete(httpData);
    if (success) {
      return { success: true, user: data };
    } else {
      this.snackMessage.show({
        message: error?.message || 'Failure during update',
      });
      return { success: false, user: data };
    }
  }
  // LIST USERS WITH ROLE
  private getRoleLTE(userRole: number | undefined) {
    switch (userRole) {
      // SUPER ADMIN CAN LIST ALL
      case 3:
        return 3;
      // ADMIN CAN LIST USERS
      case 2:
        return 1;
      // OTHERS CANT LIST
      default:
        return -1;
    }
  }
}
