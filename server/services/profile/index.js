import Factory from '@/lib/Factory';
import User from '@/services/profile/User';
import Admin from '@/services/profile/Admin';
import Utility from '@/services/profile/Utility';

export { Admin, User, Utility };

export default new Factory({
  admin: Admin,
  user: User,
  default: Utility
});
