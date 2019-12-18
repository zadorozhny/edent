import Factory from '@/lib/Factory';
import Admin from '@/services/manufacturers/Admin';
import User from '@/services/manufacturers/User';
import Utility from '@/services/manufacturers/Utility';

export { Admin, User, Utility };

export default new Factory({
  admin: Admin,
  user: User,
  default: Utility
});
