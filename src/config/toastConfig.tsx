// App.jsx
import { Dimensions } from 'react-native';
import { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';

/*
  1. Create the config
*/
const dimensions = Dimensions.get('window');
const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green', height: 75, borderRadius: 10, backgroundColor: 'white' }}
      contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
      text1Style={{
        fontSize: 20,
        fontWeight: '500'
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <ErrorToast
      style={{ borderLeftColor: 'red', height: 75, borderRadius: 10, backgroundColor: 'white' }}
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
  info: (props: any) => (
    <InfoToast
      style={{ borderLeftColor: '#70CEFF', height: 75, borderRadius: 10, backgroundColor: 'white' }}
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  )
};
export default toastConfig