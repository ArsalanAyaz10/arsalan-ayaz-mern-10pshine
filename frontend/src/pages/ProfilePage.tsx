// src/pages/ProfilePage.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { Card, CardContent } from "../components/UI/Card";
import SideNavbar from "../components/SideNavbar";
import { User, Lock } from "lucide-react";

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
          <Card className="shadow-xl border-none rounded-2xl p-6 bg-white">
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
                <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>

              {/* Profile Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                    <User className="w-5 h-5" /> Edit Profile
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      type="text"
                      placeholder="Name"
                      defaultValue={user.name}
                      className="bg-gray-100"
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      defaultValue={user.email}
                      className="bg-gray-100"
                      disabled
                    />
                  </div>
                  <Button className="mt-4 w-full sm:w-auto">Save Changes</Button>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                    <Lock className="w-5 h-5" /> Change Password
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                      className="bg-gray-100"
                    />
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                     className="bg-gray-100"
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
