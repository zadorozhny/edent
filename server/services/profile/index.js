import Factory from '@/lib/Factory';
import User from '@/services/profile/User';
import Utility from '@/services/profile/Utility';

export { User, Utility };

export default new Factory({
  user: User,
  default: Utility
});
