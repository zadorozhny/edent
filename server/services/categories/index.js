import Factory from '@/lib/Factory';
import Admin from '@/services/categories/Admin';
import User from '@/services/categories/User';
import Utility from '@/services/categories/Utility';

export { Admin, User, Utility };

export default new Factory({
  admin: Admin,
  user: User,
  default: Utility
});
