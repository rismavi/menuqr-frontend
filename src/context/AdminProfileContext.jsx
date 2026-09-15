import { createContext, useContext, useState } from "react";

const AdminProfileContext = createContext();

export function AdminProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("adminProfile");

    if (savedProfile) {
      return JSON.parse(savedProfile);
    }

    return {
      name: "Admin",
      role: "Administrator",
      photo: null,
    };
  });

  const updateProfile = (newProfile) => {
    setProfile(newProfile);

    localStorage.setItem(
      "adminProfile",
      JSON.stringify(newProfile)
    );
  };

  return (
    <AdminProfileContext.Provider
      value={{
        profile,
        updateProfile,
      }}
    >
      {children}
    </AdminProfileContext.Provider>
  );
}

export function useAdminProfile() {
  return useContext(AdminProfileContext);
}