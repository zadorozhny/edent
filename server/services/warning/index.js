import Factory from '@/lib/Factory';
import Admin from '@/services/warning/Admin';
import Utility from '@/services/warning/Utility';

export { Admin, Utility };

export default new Factory({
  admin: Admin,
  default: Utility
});
