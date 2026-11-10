import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { login } from './userService';
import { notify } from './helpers';
import { colors, shadow } from './theme';
import { Btn, Field } from './ui';

export default function LoginScreen({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const ok = await login(email.trim(), pass);
      ok ? onSuccess() : notify('Sai email hoặc mật khẩu');
    } catch (e) {
      notify('Lỗi: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: colors.bg }} contentContainerStyle={s.container}>
      <View style={s.logo}>
        <Ionicons name="people" size={36} color="#fff" />
      </View>
      <Text style={s.title}>Quản lý người dùng</Text>
      <Text style={s.sub}>Đăng nhập để tiếp tục</Text>

      <View style={s.card}>
        <Field label="Email" icon="mail-outline" placeholder="admin@gmail.com"
          value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <Field label="Mật khẩu" icon="lock-closed-outline" placeholder="••••••"
          value={pass} onChangeText={setPass} secure />
        <Btn title="Đăng nhập" onPress={handleLogin} loading={loading} />
        <Btn title="Vào thẳng (tạo tài khoản đầu tiên)" variant="outline" onPress={onSuccess} style={{ marginTop: 10 }} />
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  logo: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  title: { fontSize: 26, fontWeight: '800', color: colors.text },
  sub: { fontSize: 14, color: colors.muted, marginTop: 4, marginBottom: 24 },
  card: { width: '100%', maxWidth: 420, backgroundColor: colors.card, borderRadius: 20, padding: 20, ...shadow },
});