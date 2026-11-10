import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { registerDialog } from './helpers';
import { colors, shadow } from './theme';
import { Btn } from './ui';

const TYPES = {
  error: { icon: 'alert-circle', color: colors.danger, soft: colors.dangerSoft, title: 'Có lỗi xảy ra' },
  success: { icon: 'checkmark-circle', color: '#10B981', soft: '#D1FAE5', title: 'Thành công' },
  confirm: { icon: 'trash', color: colors.danger, soft: colors.dangerSoft, title: 'Xác nhận xóa' },
};

export default function DialogHost() {
  const [d, setD] = useState(null);

  useEffect(() => {
    registerDialog(setD);
    return () => registerDialog(null);
  }, []);

  if (!d) return null;

  const t = TYPES[d.type] || TYPES.error;
  const close = () => setD(null);

  return (
    <Modal transparent animationType="fade" visible onRequestClose={close}>
      <View style={s.backdrop}>
        <View style={s.card}>
          <View style={[s.iconWrap, { backgroundColor: t.soft }]}>
            <Ionicons name={t.icon} size={34} color={t.color} />
          </View>
          <Text style={s.title}>{t.title}</Text>
          <Text style={s.message}>{d.message}</Text>

          {d.type === 'confirm' ? (
            <View style={s.row}>
              <Btn title="Hủy" variant="outline" onPress={close} style={{ flex: 1 }} />
              <View style={{ width: 10 }} />
              <Btn
                title="Xóa"
                onPress={() => { close(); d.onYes && d.onYes(); }}
                style={{ flex: 1, backgroundColor: colors.danger }}
              />
            </View>
          ) : (
            <Btn title="Đã hiểu" onPress={close} style={{ alignSelf: 'stretch' }} />
          )}
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: {
    flex: 1, backgroundColor: 'rgba(17,24,39,0.5)',
    alignItems: 'center', justifyContent: 'center', padding: 24,
  },
  card: {
    width: '100%', maxWidth: 360, backgroundColor: colors.card,
    borderRadius: 20, padding: 24, alignItems: 'center', ...shadow,
  },
  iconWrap: {
    width: 64, height: 64, borderRadius: 32,
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  title: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: 6 },
  message: { fontSize: 14, color: colors.muted, textAlign: 'center', marginBottom: 20 },
  row: { flexDirection: 'row', alignSelf: 'stretch' },
});