import Factory from '@/lib/Factory';
import Admin from '@/services/products/Admin';
import Utility from '@/services/products/Utility';

export { Admin, Utility };

export default new Factory({
  admin: Admin,
  default: Utility
});
