import Navbar from "../components/Navbar";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Your Profile</h2>
      </div>
    </div>
  );
};

export default Profile;
