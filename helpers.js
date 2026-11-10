import { Alert, Platform } from 'react-native';

let show = null;

export function registerDialog(fn) {
  show = fn;
}

export function notify(msg, type = 'error') {
  if (show) return show({ type, message: msg });
  if (Platform.OS === 'web') window.alert(msg);
  else Alert.alert('Thông báo', msg);
}

export function confirmBox(msg, onYes) {
  if (show) return show({ type: 'confirm', message: msg, onYes });
  if (Platform.OS === 'web') {
    if (window.confirm(msg)) onYes();
  } else {
    Alert.alert('Xác nhận', msg, [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Xóa', style: 'destructive', onPress: onYes },
    ]);
  }
}