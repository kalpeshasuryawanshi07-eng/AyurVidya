import { renderHook, act, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext";
import * as api from "../services/api";

jest.mock("../services/api");

describe("AuthContext - Real Backend Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("should fetch user data from backend on mount when token exists", async () => {
    const mockUser = { _id: "user1", name: "John Doe", email: "john@example.com", role: "student" };
    localStorage.setItem("ayurveda-token", "valid-token");
    api.getMe.mockResolvedValue({ data: { user: mockUser } });

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(api.getMe).toHaveBeenCalled();
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isLoggedIn).toBe(true);
  });

  it("should clear localStorage when backend returns error", async () => {
    localStorage.setItem("ayurveda-token", "invalid-token");
    localStorage.setItem("ayurveda-user", JSON.stringify({ name: "Test" }));
    api.getMe.mockRejectedValue(new Error("Unauthorized"));

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(localStorage.getItem("ayurveda-token")).toBeNull();
    expect(localStorage.getItem("ayurveda-user")).toBeNull();
    expect(result.current.user).toBeNull();
  });

  it("should store token and user data on login", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    const mockUser = { _id: "user1", name: "John Doe", email: "john@example.com" };
    const mockToken = "jwt-token-123";

    act(() => {
      result.current.loginUser(mockToken, mockUser);
    });

    expect(localStorage.getItem("ayurveda-token")).toBe(mockToken);
    expect(JSON.parse(localStorage.getItem("ayurveda-user"))).toEqual(mockUser);
    expect(result.current.user).toEqual(mockUser);
  });

  it("should clear localStorage and user state on logout", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    const mockUser = { _id: "user1", name: "John Doe" };
    
    act(() => {
      result.current.loginUser("token", mockUser);
    });

    expect(result.current.user).toEqual(mockUser);

    act(() => {
      result.current.logoutUser();
    });

    expect(localStorage.getItem("ayurveda-token")).toBeNull();
    expect(localStorage.getItem("ayurveda-user")).toBeNull();
    expect(result.current.user).toBeNull();
    expect(result.current.isLoggedIn).toBe(false);
  });

  it("should correctly identify admin users", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    const adminUser = { _id: "admin1", name: "Admin", role: "admin" };

    act(() => {
      result.current.loginUser("token", adminUser);
    });

    expect(result.current.isAdmin).toBe(true);
  });
});
