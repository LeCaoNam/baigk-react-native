import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { addUser, updateUser, emailExists } from './userService';
import { notify } from './helpers';
import { colors, shadow } from './theme';
import { Btn, Field } from './ui';

export default function UserFormScreen({ user, onDone }) {
  const isEdit = !!user;
  const [email, setEmail] = useState(user?.email || '');
  const [matkhau, setMatkhau] = useState(user?.matkhau || '');
  const [hoten, setHoten] = useState(user?.hoten || '');
  const [hinhanh, setHinhanh] = useState(user?.hinhanh || '');
  const [saving, setSaving] = useState(false);

  const pickImage = async () => {
    const r = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
      base64: true,
    });
    if (!r.canceled) setHinhanh(r.assets[0].base64);
  };

  const save = async () => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return notify('Email không hợp lệ');
    if (matkhau.length < 6) return notify('Mật khẩu tối thiểu 6 ký tự');
    if (!hoten.trim()) return notify('Nhập họ tên');
    setSaving(true);
    try {
      if ((!isEdit || email.trim() !== user.email) && (await emailExists(email.trim()))) {
        return notify('Email đã tồn tại');
      }
      const d = { email: email.trim(), matkhau, hoten: hoten.trim(), hinhanh };
      isEdit ? await updateUser(user.id, d) : await addUser(d);
      onDone();
    } catch (e) {
      notify('Lỗi: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: colors.bg }} contentContainerStyle={s.container}>
      <View style={s.inner}>
        <View style={s.header}>
          <TouchableOpacity style={s.backBtn} onPress={onDone}>
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </TouchableOpacity>
          <Text style={s.title}>{isEdit ? 'Sửa người dùng' : 'Thêm người dùng'}</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={s.card}>
          <TouchableOpacity onPress={pickImage} activeOpacity={0.8} style={s.avatarWrap}>
            {hinhanh ? (
              <Image style={s.avatar} source={{ uri: 'data:image/jpeg;base64,' + hinhanh }} />
            ) : (
              <View style={[s.avatar, s.avatarEmpty]}>
                <Ionicons name="person" size={48} color={colors.primary} />
              </View>
            )}
            <View style={s.camera}>
              <Ionicons name="camera" size={16} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={s.hint}>Bấm để chọn ảnh đại diện</Text>

          <Field label="Họ tên" icon="person-outline" placeholder="Nguyễn Văn A"
            value={hoten} onChangeText={setHoten} />
          <Field label="Email" icon="mail-outline" placeholder="email@gmail.com"
            value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
          <Field label="Mật khẩu" icon="lock-closed-outline" placeholder="Tối thiểu 6 ký tự"
            value={matkhau} onChangeText={setMatkhau} secure />

          <Btn title={isEdit ? 'Lưu thay đổi' : 'Thêm người dùng'} icon="checkmark" onPress={save} loading={saving} />
          <Btn title="Quay lại" variant="outline" onPress={onDone} style={{ marginTop: 10 }} />
        </View>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flexGrow: 1, padding: 16 },
  inner: { width: '100%', maxWidth: 480, alignSelf: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  backBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.card,
    alignItems: 'center', justifyContent: 'center',
  },
  title: { fontSize: 20, fontWeight: '800', color: colors.text },
  card: { backgroundColor: colors.card, borderRadius: 20, padding: 20, ...shadow },
  avatarWrap: { alignSelf: 'center' },
  avatar: { width: 110, height: 110, borderRadius: 55 },
  avatarEmpty: { backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  camera: {
    position: 'absolute', right: 0, bottom: 0, width: 32, height: 32, borderRadius: 16,
    backgroundColor: colors.primary, borderWidth: 3, borderColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },
  hint: { textAlign: 'center', fontSize: 12, color: colors.muted, marginTop: 8, marginBottom: 20 },
});