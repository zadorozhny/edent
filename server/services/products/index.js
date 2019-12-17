import Factory from '@/lib/Factory';
import Admin from '@/services/profile/Admin';

export { Admin };

export default new Factory({
  admin: Admin
});
