import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import LoginScreen from './LoginScreen';
import UserListScreen from './UserListScreen';
import UserFormScreen from './UserFormScreen';
import Transition from './Transition';
import DialogHost from './DialogHost';
import { colors } from './theme';

export default function App() {
  const [screen, setScreen] = useState('login'); // login | list | form
  const [editing, setEditing] = useState(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg, paddingTop: StatusBar.currentHeight || 0 }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />
      <Transition key={screen}>
        {screen === 'login' && <LoginScreen onSuccess={() => setScreen('list')} />}
        {screen === 'list' && (
          <UserListScreen
            onAdd={() => { setEditing(null); setScreen('form'); }}
            onEdit={(u) => { setEditing(u); setScreen('form'); }}
            onLogout={() => setScreen('login')}
          />
        )}
        {screen === 'form' && (
          <UserFormScreen user={editing} onDone={() => setScreen('list')} />
        )}
      </Transition>
      <DialogHost />
    </SafeAreaView>
  );
}