import { Permissions, Notifications } from 'expo';

async function registerForPushNotificationsAsync() {
  // Android remote notification permissions are granted during the app
  // install, so this will only ask on iOS
  const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  const token = await Notifications.getExponentPushTokenAsync();
  console.log({
    token: {
      value: token,
    },
  });
}

export default registerForPushNotificationsAsync;
