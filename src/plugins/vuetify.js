import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // تضمين الأنماط الخاصة بـ Vuetify
import { aliases, mdi } from 'vuetify/iconsets/mdi'; // يمكن إضافة أيقونات إن أردت

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});
