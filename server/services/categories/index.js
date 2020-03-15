import Factory from '@/lib/Factory';
import Admin from '@/services/categories/Admin';
import Utility from '@/services/categories/Utility';

export { Admin, Utility };

export default new Factory({
  admin: Admin,
  default: Utility
});
