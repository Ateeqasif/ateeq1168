import React, { createContext, useContext, useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const model = pb.authStore.model;
    if (pb.authStore.isValid && model?.collectionName === '_superusers') {
      setAdmin(model);
    }
    setLoading(false);
    const unsubscribe = pb.authStore.onChange((token, model) => {
      setAdmin(model?.collectionName === '_superusers' ? model : null);
    });
    return () => unsubscribe();
  }, []);

  const adminLogin = async (email, password) => {
    const authData = await pb.collection('_superusers').authWithPassword(email, password);
    setAdmin(authData.record);
    return authData;
  };

  const adminLogout = () => {
    pb.authStore.clear();
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, adminLogin, adminLogout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
};
