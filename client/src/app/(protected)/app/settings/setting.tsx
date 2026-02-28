"use client";
import userState from "../../../../store/stateStore";

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

export default function SettingsPage({ user }: any) {
  //store
  const setting = userState((s) => s.settingState);
  const setSetting = userState((s) => s.setSettingState);
  return (
    <div className="bg-zinc-900 w-full text-white h-full scrollbar-hide p-5 font-sans rounded-lg">
      <div className="w-full scrollbar-hide h-full flex flex-col ">
        {/* Header */}
        <div className="flex items-center w-full pb-4 border-zinc-700 border-b justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="cursor-pointer text-zinc-500 hover:text-white transition-colors"
            onClick={() => {
              setSetting(false);
            }}
          >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
              <path d="M5.47 5.47a.75.75 0 0 1 1.06 0l12 12a.75.75 0 1 1-1.06 1.06l-12-12a.75.75 0 0 1 0-1.06" />
              <path d="M18.53 5.47a.75.75 0 0 1 0 1.06l-12 12a.75.75 0 0 1-1.06-1.06l12-12a.75.75 0 0 1 1.06 0" />
            </g>
          </svg>
        </div>
        <div className="overflow-y-auto w-full flex-1 flex flex-col scrollbar-hide p-3 ">
          {/* Profile Settings Section */}
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg ">
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
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg mt-8">
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
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg mt-8">
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
          <div className="bg-zinc-800 border border-red-700 p-6 rounded-lg shadow-lg mt-8">
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
