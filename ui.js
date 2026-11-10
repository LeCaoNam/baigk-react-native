import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './theme';

export function Btn({ title, onPress, variant = 'primary', loading = false, icon, style }) {
  const isPrimary = variant === 'primary';
  const isDanger = variant === 'danger';
  const textColor = isPrimary ? '#fff' : isDanger ? colors.danger : colors.primary;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={loading}
      onPress={onPress}
      style={[
        b.btn,
        isPrimary && { backgroundColor: colors.primary },
        isDanger && { backgroundColor: colors.dangerSoft },
        variant === 'outline' && { borderWidth: 1.5, borderColor: colors.primary },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {icon ? <Ionicons name={icon} size={18} color={textColor} style={{ marginRight: 6 }} /> : null}
          <Text style={[b.text, { color: textColor }]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export function Field({ label, icon, secure, ...props }) {
  const [focus, setFocus] = useState(false);
  const [hide, setHide] = useState(!!secure);

  return (
    <View style={{ marginBottom: 14 }}>
      {label ? <Text style={f.label}>{label}</Text> : null}
      <View style={[f.wrap, focus && f.focus]}>
        {icon ? <Ionicons name={icon} size={18} color={focus ? colors.primary : colors.muted} style={{ marginRight: 8 }} /> : null}
        <TextInput
          style={[f.input, Platform.OS === 'web' && { outlineStyle: 'none' }]}
          placeholderTextColor={colors.muted}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          secureTextEntry={hide}
          {...props}
        />
        {secure ? (
          <TouchableOpacity onPress={() => setHide(!hide)}>
            <Ionicons name={hide ? 'eye-outline' : 'eye-off-outline'} size={20} color={colors.muted} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const b = StyleSheet.create({
  btn: { height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  text: { fontSize: 16, fontWeight: '600' },
});

const f = StyleSheet.create({
  label: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6 },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  focus: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  input: { flex: 1, fontSize: 15, color: colors.text },
});