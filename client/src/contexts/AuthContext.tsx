// import React, { createContext, useContext, useState } from 'react';

// // Replaced 'location' with 'address' in the User type
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   isProfileComplete: boolean;
// }

// // Updated updateProfile to handle all the new fields
// interface AuthContextType {
//   user: User | null;
//   login: (credentials: { contact: string; otp: string }) => Promise<boolean>;
//   logout: () => void;
//   isAuthenticated: boolean;
//   updateProfile: (details: { name: string; email: string; phone: string; address: string; }) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   const login = (credentials: { contact: string; otp: string }): Promise<boolean> => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         if (credentials.otp === '123456') {
//           const isEmail = credentials.contact.includes('@');
//           const loggedInUser: User = {
//             id: '1',
//             name: '',
//             email: isEmail ? credentials.contact : '',
//             phone: !isEmail ? credentials.contact : '',
//             address: '', // Added address field
//             isProfileComplete: false,
//           };
//           setUser(loggedInUser);
//           resolve(true);
//         } else {
//           resolve(false);
//         }
//       }, 1000);
//     });
//   };

//   // The updateProfile function now handles all the new details
//   const updateProfile = (details: { name: string; email: string; phone: string; address: string; }) => {
//     setUser(prevUser => {
//       if (!prevUser) return null;
//       return {
//         ...prevUser,
//         name: details.name,
//         email: details.email,
//         phone: details.phone,
//         address: details.address,
//         isProfileComplete: true,
//       };
//     });
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   const value = {
//     user,
//     login,
//     logout,
//     isAuthenticated: !!user,
//     updateProfile,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// import React, { createContext, useContext, useState, useEffect } from 'react';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   isProfileComplete: boolean;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (credentials: { contact: string; otp: string }) => Promise<boolean>;
//   logout: () => void;
//   isAuthenticated: boolean;
//   updateProfile: (details: { name: string; email: string; phone: string; address: string; }) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   // FIX #1: Load user from localStorage on initial app load
//   useEffect(() => {
//     try {
//       const storedUser = localStorage.getItem('user');
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
//     } catch (error) {
//       console.error("Failed to parse user from localStorage", error);
//       localStorage.removeItem('user');
//     }
//   }, []); // The empty array ensures this effect runs only once

//   // FIX #2: Save user to localStorage whenever the user state changes
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem('user', JSON.stringify(user));
//     } else {
//       // If user is null (logged out), remove them from storage
//       localStorage.removeItem('user');
//     }
//   }, [user]); // This effect runs every time the 'user' object changes

//   const login = (credentials: { contact: string; otp: string }): Promise<boolean> => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         if (credentials.otp === '123456') {
//           const isEmail = credentials.contact.includes('@');
//           const loggedInUser: User = {
//             id: '1',
//             name: '',
//             email: isEmail ? credentials.contact : '',
//             phone: !isEmail ? credentials.contact : '',
//             address: '',
//             isProfileComplete: false,
//           };
//           setUser(loggedInUser); // This will trigger the useEffect above to save the user
//           resolve(true);
//         } else {
//           resolve(false);
//         }
//       }, 1000);
//     });
//   };

//   const updateProfile = (details: { name: string; email: string; phone: string; address: string; }) => {
//     setUser(prevUser => {
//       if (!prevUser) return null;
//       const updatedUser = {
//         ...prevUser,
//         name: details.name,
//         email: details.email,
//         phone: details.phone,
//         address: details.address,
//         isProfileComplete: true,
//       };
//       return updatedUser; // This will also trigger the useEffect to save the updated user
//     });
//   };

//   const logout = () => {
//     // Simply setting user to null will trigger the useEffect to clear localStorage
//     setUser(null);
//   };

//   const value = {
//     user,
//     login,
//     logout,
//     isAuthenticated: !!user,
//     updateProfile,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };






import React, { createContext, useContext, useState, useEffect } from 'react';

// Added 'password' to the User interface for our simulated database
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  password?: string;
  isProfileComplete: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { contact: string; password?: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  completeRegistration: (details: { contact: string; password?: string }) => Promise<void>;
  updateProfile: (details: { name: string; email: string; phone: string; address: string; }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load the currently logged-in user from session storage
  useEffect(() => {
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const getUsers = (): User[] => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  const login = async (credentials: { contact: string; password?: string }): Promise<boolean> => {
    const users = getUsers();
    const existingUser = users.find(
      u => (u.email === credentials.contact || u.phone === credentials.contact) && u.password === credentials.password
    );

    if (existingUser) {
      const { password, ...userToSave } = existingUser; // Never store password in state/session
      setUser(userToSave);
      sessionStorage.setItem('currentUser', JSON.stringify(userToSave));
      return true;
    }
    return false;
  };
  
  const completeRegistration = async (details: { contact: string; password?: string }) => {
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
    };
    
    // Save new user to the "database"
    saveUsers([...users, newUser]);

    // Set the new user as the current user for the next step (profile creation)
    const { password, ...userToSave } = newUser;
    setUser(userToSave);
    sessionStorage.setItem('currentUser', JSON.stringify(userToSave));
  };


  const updateProfile = (details: { name: string; email: string; phone: string; address: string; }) => {
    if (!user) return;

    const updatedUser: User = { ...user, ...details, isProfileComplete: true };
    setUser(updatedUser);
    sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Update the user in our "database" as well
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      // Re-add password before saving, since it's not in the state
      const originalUser = users[userIndex];
      users[userIndex] = { ...updatedUser, password: originalUser.password };
      saveUsers(users);
    }
  };


  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      completeRegistration,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};