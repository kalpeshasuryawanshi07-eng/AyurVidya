import axios from "axios";
import { login, register, getMe } from "./api";

// Mock axios
jest.mock("axios");

describe("API Service - Authentication Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe("Environment Configuration", () => {
    it("should use REACT_APP_API_URL environment variable", () => {
      const expectedBaseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
      expect(axios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          baseURL: expectedBaseURL,
        })
      );
    });
  });

  describe("JWT Token Handling", () => {
    it("should include Authorization header when token exists in localStorage", () => {
      const mockToken = "test-jwt-token";
      localStorage.setItem("ayurveda-token", mockToken);

      const mockAxiosInstance = {
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
      };
      axios.create.mockReturnValue(mockAxiosInstance);

      // Get the request interceptor
      const requestInterceptor = mockAxiosInstance.interceptors.request.use.mock.calls[0][0];
      const config = { headers: {} };
      const result = requestInterceptor(config);

      expect(result.headers.Authorization).toBe(`Bearer ${mockToken}`);
    });

    it("should not include Authorization header when token does not exist", () => {
      const mockAxiosInstance = {
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
      };
      axios.create.mockReturnValue(mockAxiosInstance);

      const requestInterceptor = mockAxiosInstance.interceptors.request.use.mock.calls[0][0];
      const config = { headers: {} };
      const result = requestInterceptor(config);

      expect(result.headers.Authorization).toBeUndefined();
    });
  });

  describe("Authentication Endpoints", () => {
    let mockAxiosInstance;

    beforeEach(() => {
      mockAxiosInstance = {
        post: jest.fn(),
        get: jest.fn(),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
      };
      axios.create.mockReturnValue(mockAxiosInstance);
    });

    it("should call /auth/register endpoint with correct data", async () => {
      const mockResponse = { data: { message: "User registered successfully" } };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      await register("John Doe", "john@example.com", "password123");

      expect(mockAxiosInstance.post).toHaveBeenCalledWith("/auth/register", {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      });
    });

    it("should call /auth/login endpoint with correct data", async () => {
      const mockResponse = {
        data: {
          token: "jwt-token-123",
          user: { _id: "user1", name: "John Doe", email: "john@example.com", role: "student" },
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const response = await login("john@example.com", "password123");

      expect(mockAxiosInstance.post).toHaveBeenCalledWith("/auth/login", {
        email: "john@example.com",
        password: "password123",
      });
      expect(response.data.token).toBe("jwt-token-123");
      expect(response.data.user.name).toBe("John Doe");
    });

    it("should call /auth/me endpoint to get current user", async () => {
      const mockResponse = {
        data: {
          user: { _id: "user1", name: "John Doe", email: "john@example.com", role: "student" },
        },
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const response = await getMe();

      expect(mockAxiosInstance.get).toHaveBeenCalledWith("/auth/me");
      expect(response.data.user.name).toBe("John Doe");
    });
  });

  describe("401 Unauthorized Handling", () => {
    it("should clear localStorage and redirect to login on 401 error", () => {
      const mockAxiosInstance = {
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
      };
      axios.create.mockReturnValue(mockAxiosInstance);

      // Set up localStorage
      localStorage.setItem("ayurveda-token", "expired-token");
      localStorage.setItem("ayurveda-user", JSON.stringify({ name: "Test User" }));

      // Mock window.location.href
      delete window.location;
      window.location = { href: "" };

      // Get the response error interceptor
      const responseErrorInterceptor = mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
      const error = {
        response: { status: 401 },
      };

      // Call the error interceptor
      responseErrorInterceptor(error);

      expect(localStorage.getItem("ayurveda-token")).toBeNull();
      expect(localStorage.getItem("ayurveda-user")).toBeNull();
      expect(window.location.href).toBe("/login");
    });
  });
});
