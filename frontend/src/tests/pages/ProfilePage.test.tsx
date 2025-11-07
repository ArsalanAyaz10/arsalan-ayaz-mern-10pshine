import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProfilePage from "../../pages/ProfilePage";
import API from "../../api/axios";
import toast from "react-hot-toast";

// ✅ Mock API & toast
jest.mock("../../api/axios", () => ({
  put: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

// ✅ Mock SideNavbar (avoid layout issues during tests)
jest.mock("../../components/SideNavbar", () => () => <div data-testid="sidebar" />);

describe("ProfilePage", () => {
  const mockUser = {
    name: "Arsalan",
    email: "arsalan@example.com",
    profilePicture: "",
  };

  beforeEach(() => {
    localStorage.setItem("user", JSON.stringify(mockUser));
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("renders user profile info correctly", () => {
    render(<ProfilePage />);

    expect(screen.getByText("Arsalan")).toBeInTheDocument();
    expect(screen.getByText("arsalan@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name")).toHaveValue("Arsalan");
    expect(screen.getByPlaceholderText("Email")).toHaveValue("arsalan@example.com");
  });

  test("updates profile on Save Changes", async () => {
    (API.put as jest.Mock).mockResolvedValueOnce({});

    render(<ProfilePage />);

    const nameInput = screen.getByPlaceholderText("Name");
    const saveButton = screen.getByText("Save Changes");

    fireEvent.change(nameInput, { target: { value: "New Name" } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(API.put).toHaveBeenCalledWith("/user/profile/update", {
        name: "New Name",
        email: "arsalan@example.com",
      });
      expect(toast.success).toHaveBeenCalledWith("Profile updated successfully");
    });
  });

  test("shows error if passwords do not match", async () => {
    render(<ProfilePage />);

    fireEvent.change(screen.getByPlaceholderText("Current Password"), {
      target: { value: "oldPass" },
    });
    fireEvent.change(screen.getByPlaceholderText("New Password"), {
      target: { value: "newPass" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "differentPass" },
    });

    fireEvent.click(screen.getByText("Update Password"));

    expect(toast.error).toHaveBeenCalledWith("Passwords do not match");
  });

  test("submits password change request", async () => {
    (API.put as jest.Mock).mockResolvedValueOnce({});

    render(<ProfilePage />);

    fireEvent.change(screen.getByPlaceholderText("Current Password"), {
      target: { value: "oldPass" },
    });
    fireEvent.change(screen.getByPlaceholderText("New Password"), {
      target: { value: "newPass" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "newPass" },
    });

    fireEvent.click(screen.getByText("Update Password"));

    await waitFor(() => {
      expect(API.put).toHaveBeenCalledWith("/user/profile/change-password", {
        currentPassword: "oldPass",
        newPassword: "newPass",
      });
      expect(toast.success).toHaveBeenCalledWith("Password updated successfully");
    });
  });
});
