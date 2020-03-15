import Factory from '@/lib/Factory';
import Admin from '@/services/orders/Admin';
import Utility from '@/services/orders/Utility';

export { Admin, Utility };

export default new Factory({
  admin: Admin,
  default: Utility
});
