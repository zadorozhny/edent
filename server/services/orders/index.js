import Factory from '@/lib/Factory';
import Admin from '@/services/orders/Admin';
import User from '@/services/orders/User';
import Utility from '@/services/orders/Utility';

export { Admin, User, Utility };

export default new Factory({
  admin: Admin,
  user: User
});
