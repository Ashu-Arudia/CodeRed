import { create } from "zustand";

type userState = {
  communityState: Boolean;
  setCommunityState: (value: Boolean) => void;
}

const useCurrentState = create<userState>()(
    (set) => ({
      communityState: false,
      setCommunityState: (value) => set({ communityState: value }),
    })
);

export default useCurrentState;
