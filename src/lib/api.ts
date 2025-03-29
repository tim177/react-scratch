import React from "react";

import { User } from "../types/user";

const API_URL = "https://reqres.in/api";

interface ApiResponse<T> {
  data: T;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

class ApiClient {
  // Get users
  async getUsers(page = 1): Promise<ApiResponse<User[]>> {
    try {
      const response = await fetch(`${API_URL}/users?page=${page}`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  // Get user by ID
  async getUser(id: number): Promise<User> {
    try {
      const response = await fetch(`${API_URL}/users/${id}`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  }

  // Update user
  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  }

  // Delete user
  async deleteUser(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  }
}

export const api = new ApiClient();
