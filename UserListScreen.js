import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { listenUsers, deleteUser } from './userService';
import { confirmBox } from './helpers';
import { colors, shadow } from './theme';
import { Field } from './ui';

function Avatar({ user }) {
  if (user.hinhanh) {
    return <Image style={s.avatar} source={{ uri: 'data:image/jpeg;base64,' + user.hinhanh }} />;
  }
  const letter = (user.hoten || user.email || '?').trim().charAt(0).toUpperCase();
  return (
    <View style={[s.avatar, s.avatarEmpty]}>
      <Text style={s.avatarText}>{letter}</Text>
    </View>
  );
}

export default function UserListScreen({ onAdd, onEdit, onLogout }) {
  const [users, setUsers] = useState([]);
  const [kw, setKw] = useState('');

  useEffect(() => listenUsers(setUsers), []);

  const data = users.filter(
    (u) =>
      (u.email || '').toLowerCase().includes(kw.toLowerCase()) ||
      (u.hoten || '').toLowerCase().includes(kw.toLowerCase())
  );

  return (
    <View style={s.screen}>
      <View style={s.inner}>
        <View style={s.header}>
          <View>
            <Text style={s.title}>Người dùng</Text>
            <Text style={s.sub}>{users.length} tài khoản</Text>
          </View>
          <TouchableOpacity style={s.iconBtn} onPress={onLogout}>
            <Ionicons name="log-out-outline" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>

        <Field
          icon="search-outline"
          placeholder="Tìm theo email hoặc họ tên"
          value={kw}
          onChangeText={setKw}
          autoCapitalize="none"
        />

        <FlatList
          data={data}
          keyExtractor={(u) => u.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={s.empty}>
              <Ionicons name="people-outline" size={56} color={colors.border} />
              <Text style={s.emptyText}>
                {kw ? 'Không tìm thấy kết quả' : 'Chưa có người dùng nào'}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={s.card}>
              <TouchableOpacity style={s.info} activeOpacity={0.7} onPress={() => onEdit(item)}>
                <Avatar user={item} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text style={s.name} numberOfLines={1}>{item.hoten}</Text>
                  <Text style={s.email} numberOfLines={1}>{item.email}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[s.iconBtn, { backgroundColor: colors.dangerSoft }]}
                onPress={() => confirmBox(`Xóa "${item.hoten}"?`, () => deleteUser(item.id))}
              >
                <Ionicons name="trash-outline" size={20} color={colors.danger} />
              </TouchableOpacity>
            </View>
          )}
        />

        <TouchableOpacity style={s.fab} activeOpacity={0.85} onPress={onAdd}>
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  inner: { flex: 1, width: '100%', maxWidth: 720, alignSelf: 'center', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 26, fontWeight: '800', color: colors.text },
  sub: { fontSize: 13, color: colors.muted, marginTop: 2 },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.card,
    alignItems: 'center', justifyContent: 'center',
  },
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card,
    borderRadius: 16, padding: 12, marginBottom: 10, ...shadow,
  },
  info: { flex: 1, flexDirection: 'row', alignItems: 'center', minWidth: 0 },
  avatar: { width: 52, height: 52, borderRadius: 26, marginRight: 12 },
  avatarEmpty: { backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 20, fontWeight: '700', color: colors.primary },
  name: { fontSize: 16, fontWeight: '700', color: colors.text },
  email: { fontSize: 13, color: colors.muted, marginTop: 2 },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyText: { marginTop: 8, fontSize: 15, color: colors.muted },
  fab: {
    position: 'absolute', right: 20, bottom: 24, width: 58, height: 58, borderRadius: 29,
    backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', ...shadow,
  },
});