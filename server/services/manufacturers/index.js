import Factory from '@/lib/Factory';
import Admin from '@/services/manufacturers/Admin';
import Utility from '@/services/manufacturers/Utility';

export { Admin, Utility };

export default new Factory({
  admin: Admin,
  default: Utility
});
