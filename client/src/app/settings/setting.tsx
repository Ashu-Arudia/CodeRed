'use client'

type ToggleSwitchProps = {
  label: string;
};
const ToggleSwitch = ({ label }: ToggleSwitchProps) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
    <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
    <span className="ml-3 text-sm font-medium text-gray-300">{label}</span>
  </label>
);

export default function SettingsPage({user}: any) {
  return (
    <div className="bg-[#121212] w-full text-white h-full overflow-y-auto scrollbar-hide  p-8 font-sans rounded-lg">
      <div className="w-full mx-auto scrollbar-hide h-full ">
        {/* Header */}
        <div className="mb-5  p-5">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-zinc-400 mt-1">
            Manage your account and preferences.
          </p>
        </div>

        <div className="overflow-y-auto  scrollbar-hide p-3 ">
          {/* Profile Settings Section */}
          <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg ">
            <h2 className="text-xl font-semibold border-b border-zinc-700 pb-4">
              Profile
            </h2>
            <div className="mt-6 flex items-center space-x-6">
              <img
                src="https://i.pravatar.cc/150?u=hunter07" // Replace with dynamic user avatar
                alt="User Avatar"
                className="w-20 h-20 rounded-full ring-2 ring-zinc-600"
              />
              <div>
                <button className="bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors">
                  Upload New Avatar
                </button>
                <p className="text-xs text-zinc-400 mt-2">
                  Recommended: 256x256px PNG or JPG.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                defaultValue={user.username}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          {/* Account Security Section */}
          <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg mt-8">
            <h2 className="text-xl font-semibold border-b border-zinc-700 pb-4">
              Account Security
            </h2>
            <div className="mt-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                defaultValue={user.email}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Password
              </label>
              <button className="bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors">
                Change Password
              </button>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg mt-8">
            <h2 className="text-xl font-semibold border-b border-zinc-700 pb-4">
              Notifications
            </h2>
            <div className="mt-6 space-y-4 flex flex-col">
              <ToggleSwitch label="Friend Requests" />
              <ToggleSwitch label="Match Invites" />
              <ToggleSwitch label="Tournament Announcements" />
            </div>
          </div>

          {/* Danger Zone Section */}
          <div className="bg-[#1E1E1E] border border-red-700 p-6 rounded-lg shadow-lg mt-8">
            <h2 className="text-xl font-semibold text-red-500">Danger Zone</h2>
            <div className="mt-6 flex justify-between items-center">
              <div>
                <p className="font-semibold">Delete Account</p>
                <p className="text-sm text-zinc-400">
                  Permanently delete your account and all associated data.
                </p>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors">
                Delete My Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
