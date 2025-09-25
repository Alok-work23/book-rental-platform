// import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
// import { User, Coordinates } from '../types'; // Make sure Coordinates is defined in your types.ts

// // The User interface should be in `src/types.ts` but is included here for clarity.
// // It needs the optional 'coordinates' field.
// // interface User {
// //   ...
// //   coordinates?: Coordinates | null;
// // }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   login: (credentials: { contact: string; password?: string }) => Promise<boolean>;
//   logout: () => void;
//   register: (details: Omit<User, 'id' | 'isProfileComplete' | 'password'> & { password?: string }) => Promise<boolean>;
//   updateProfile: (details: Partial<Omit<User, 'id' | 'password'>>) => void;
//   // ADDED: The function to fetch user's location
//   fetchUserLocation: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within an AuthProvider');
//   return context;
// };

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     try {
//       const storedUser = sessionStorage.getItem('currentUser');
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
//     } catch (error) {
//       console.error("Failed to parse user from sessionStorage", error);
//     }
//   }, []);

//   const getUsers = useCallback((): User[] => {
//     const users = localStorage.getItem('users');
//     return users ? JSON.parse(users) : [];
//   }, []);

//   const saveUsers = useCallback((users: User[]) => {
//     localStorage.setItem('users', JSON.stringify(users));
//   }, []);

//   const login = useCallback(async (credentials: { contact: string; password?: string }): Promise<boolean> => {
//     const users = getUsers();
//     const existingUser = users.find(
//       u => (u.email === credentials.contact || u.phone === credentials.contact) && u.password === credentials.password
//     );
//     if (existingUser) {
//       const { password, ...userToSave } = existingUser;
//       setUser(userToSave as User);
//       sessionStorage.setItem('currentUser', JSON.stringify(userToSave));
//       return true;
//     }
//     return false;
//   }, [getUsers]);
  
//   const register = useCallback(async (details: Omit<User, 'id' | 'isProfileComplete' | 'password'> & { password?: string }): Promise<boolean> => {
//     const users = getUsers();
//     const contactIdentifier = details.email || details.phone;
//     if (users.find(u => u.email === contactIdentifier || u.phone === contactIdentifier)) {
//       throw new Error('An account with this email or mobile already exists.');
//     }

//     const newUser: User = {
//       ...details,
//       id: Date.now().toString(),
//       isProfileComplete: true,
//     };
    
//     saveUsers([...users, newUser]);
//     const { password, ...userToSave } = newUser;
//     setUser(userToSave as User); // Type assertion
//     sessionStorage.setItem('currentUser', JSON.stringify(userToSave));
//     return true;
//   }, [getUsers, saveUsers]);

//   const updateProfile = useCallback((details: Partial<Omit<User, 'id' | 'password'>>) => {
//     setUser(currentUser => {
//       if (!currentUser) return null;
//       const updatedUser = { ...currentUser, ...details };
//       sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
//       const users = getUsers();
//       const userIndex = users.findIndex(u => u.id === currentUser.id);
//       if (userIndex !== -1) {
//         users[userIndex] = { ...users[userIndex], ...updatedUser };
//         saveUsers(users);
//       }
//       return updatedUser;
//     });
//   }, [getUsers, saveUsers]);

//   // ADDED: Function to get user's geo-coordinates
//   const fetchUserLocation = useCallback(() => {
//     if (!navigator.geolocation) {
//       console.error("Geolocation is not supported by this browser.");
//       return;
//     }
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setUser(currentUser => {
//           if (!currentUser) return null;
//           const updatedUser = { ...currentUser, coordinates: { latitude, longitude } };
//           sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
//           return updatedUser;
//         });
//       },
//       () => {
//         console.error("Unable to retrieve location.");
//       }
//     );
//   }, []);

//   const logout = useCallback(() => {
//     setUser(null);
//     sessionStorage.removeItem('currentUser');
//   }, []);

//   const value = useMemo(() => ({
//     user,
//     isAuthenticated: !!user,
//     login,
//     logout,
//     register,
//     updateProfile,
//     fetchUserLocation, // Added to the context value
//   }), [user, login, logout, register, updateProfile, fetchUserLocation]);

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };





import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { User, Coordinates } from '../types'; // Make sure Coordinates is defined in your types.ts

// The User interface should be in `src/types.ts` but is included here for clarity.
// It needs the optional 'coordinates' field.
// interface User {
//   ...
//   coordinates?: Coordinates | null;
// }

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: { contact: string; password?: string }) => Promise<boolean>;
  logout: () => void;
  completeRegistration: (details: { contact: string; password?: string }) => Promise<void>;
  updateProfile: (details: { name: string; email: string; phone: string; address: string; dob: string; gender: string; }) => void;
  // ADDED: The function to fetch user's location
  fetchUserLocation: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem('currentUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from sessionStorage", error);
    }
  }, []);

  const getUsers = useCallback((): User[] => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }, []);

  const saveUsers = useCallback((users: User[]) => {
    localStorage.setItem('users', JSON.stringify(users));
  }, []);

  const login = useCallback(async (credentials: { contact: string; password?: string }): Promise<boolean> => {
    const users = getUsers();
    const existingUser = users.find(
      u => (u.email === credentials.contact || u.phone === credentials.contact) && u.password === credentials.password
    );
    if (existingUser) {
      const { password, ...userToSave } = existingUser;
      setUser(userToSave as User);
      sessionStorage.setItem('currentUser', JSON.stringify(userToSave));
      return true;
    }
    return false;
  }, [getUsers]);
  
  const completeRegistration = useCallback(async (details: { contact: string; password?: string }) => {
    const users = getUsers();
    const isEmail = details.contact.includes('@');
    const existingUser = users.find(u => u.email === details.contact || u.phone === details.contact);

    if (existingUser) {
      throw new Error('An account with this email or mobile already exists.');
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: '',
      email: isEmail ? details.contact : '',
      phone: !isEmail ? details.contact : '',
      address: '',
      password: details.password,
      isProfileComplete: false,
      dob: '',
      gender: '',
    };
    
    saveUsers([...users, newUser]);
    const { password, ...userToSave } = newUser;
    setUser(userToSave as User);
    sessionStorage.setItem('currentUser', JSON.stringify(userToSave));
  }, [getUsers, saveUsers]);

  const updateProfile = useCallback((details: { name: string; email: string; phone: string; address: string; dob: string; gender: string; }) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      const updatedUser: User = { 
          ...currentUser, 
          ...details, 
          isProfileComplete: true 
      };
      sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
      const users = getUsers();
      const userIndex = users.findIndex(u => u.id === currentUser.id);
      if (userIndex !== -1) {
        const originalUser = users[userIndex];
        users[userIndex] = { ...updatedUser, password: originalUser.password };
        saveUsers(users);
      }
      return updatedUser;
    });
  }, [getUsers, saveUsers]);

  // ADDED: Function to get user's geo-coordinates
  const fetchUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUser(currentUser => {
          if (!currentUser) return null;
          const updatedUser = { ...currentUser, coordinates: { latitude, longitude } };
          sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
          return updatedUser;
        });
      },
      () => {
        console.error("Unable to retrieve location.");
      }
    );
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('currentUser');
  }, []);

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    login,
    logout,
    completeRegistration,
    updateProfile,
    fetchUserLocation, // Added to the context value
  }), [user, login, logout, completeRegistration, updateProfile, fetchUserLocation]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};