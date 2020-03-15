import Factory from '@/lib/Factory';
import Admin from '@/services/profile/Admin';
import Utility from '@/services/profile/Utility';

export { Admin, Utility };

export default new Factory({
  admin: Admin,
  default: Utility
});
