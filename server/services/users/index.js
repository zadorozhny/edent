import Factory from '@/lib/Factory';
import Admin from '@/services/users/Admin';

export { Admin };

export default new Factory({
  admin: Admin
});
