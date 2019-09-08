import Slider from '@/kit/inputs/Slider';

import Button from '@/kit/controls/Button';
import Tabs from '@/kit/controls/Tabs';

import Card from '@/kit/views/Card';

export default Vue => {
  Vue.component(Slider.name, Slider);

  Vue.component(Button.name, Button);
  Vue.component(Tabs.name, Tabs);

  Vue.component(Card.name, Card);
};
