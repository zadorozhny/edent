import Factory from '@/lib/Factory';
import Admin from '@/services/products/Admin';
import User from '@/services/products/User';
import Utility from '@/services/products/Utility';

export { Admin, User, Utility };

export default new Factory({
  admin: Admin,
  user: User,
  default: Utility
});
