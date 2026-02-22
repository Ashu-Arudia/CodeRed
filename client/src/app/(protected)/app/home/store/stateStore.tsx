import { create } from "zustand";

type userState = {
  communityState: Boolean;
  settingState: Boolean,
  setCommunityState: (value: Boolean) => void;
  setSettingState: (value: Boolean) => void;
}

const useCurrentState = create<userState>()(
    (set) => ({
      communityState: false,
      settingState: false,
      setCommunityState: (value) => set({ communityState: value }),
      setSettingState: (value) => set({ settingState: value }),
    })
);

export default useCurrentState;
