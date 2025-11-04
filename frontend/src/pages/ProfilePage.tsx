// src/pages/ProfilePage.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { Card, CardContent } from "../components/UI/Card";
import SideNavbar from "../components/SideNavbar";
import { User, Lock } from "lucide-react";
import API from "../api/axios";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setName(parsed.name);
      setEmail(parsed.email);
    }
  }, []);

  // ✅ Update Profile
  const handleProfileUpdate = async () => {
    try {
      const res = await API.put("/user/profile/update", { name, email });

      toast.success("Profile updated successfully");

      const updatedUser = { ...user, name, email };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
  };

  // 🔐 Change Password
  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword)
      return toast.error("All fields are required");

    if (newPassword !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      await API.put("/user/profile/change-password", {
        currentPassword,
        newPassword,
      });

      toast.success("Password updated successfully");

      // Reset fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update password");
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideNavbar />

      <div className="flex-1 flex justify-center items-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl"
        >
          <Card className="shadow-xl border-none rounded-2xl p-6 bg-white text-gray-800">
  <CardContent>
    <div className="flex flex-col items-center mb-8">
      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-200">
        <img
          src={
            user?.profilePicture ||
            "https://avatar.iran.liara.run/public/boy?username=" + user.name
          }
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-2xl font-semibold mt-4 text-gray-800">{user.name}</h2>
      <p className="text-gray-500">{user.email}</p>
    </div>

    {/* Profile Info */}
    <div className="space-y-6">
      {/* Edit Profile */}
      <div>
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-gray-800">
          <User className="w-5 h-5 text-gray-700" /> Edit Profile
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-100 text-gray-800"
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-100 text-gray-800"
          />
        </div>
        <Button className="mt-4 w-full sm:w-auto">Save Changes</Button>
      </div>

      {/* Change Password */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-gray-800">
          <Lock className="w-5 h-5 text-gray-700" /> Change Password
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="bg-gray-100 text-gray-800"
          />
          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-gray-100 text-gray-800"
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-gray-100 text-gray-800"
          />
        </div>
        <Button className="mt-4 w-full sm:w-auto">Update Password</Button>
      </div>
    </div>
  </CardContent>
</Card>

        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
