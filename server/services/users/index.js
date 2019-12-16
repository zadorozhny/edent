import Factory from '@/lib/Factory';
import User from '@/services/users/User';

export { User };

export default new Factory({
  user: User,
  default: User
});
