import Slider from '@/kit/inputs/Slider';
import Choice from '@/kit/inputs/Choice';

import Button from '@/kit/controls/Button';
import Tabs from '@/kit/controls/Tabs';
import Label from '@/kit/controls/Label';
import LabelGroup from '@/kit/controls/LabelGroup';

import Card from '@/kit/views/Card';
import Icon from '@/kit/views/Icon';

import Ripple from '@/kit/directives/Ripple';

export default Vue => {
  Vue.component(Slider.name, Slider);
  Vue.component(Choice.name, Choice);

  Vue.component(Button.name, Button);
  Vue.component(Tabs.name, Tabs);
  Vue.component(Label.name, Label);
  Vue.component(LabelGroup.name, LabelGroup);

  Vue.component(Card.name, Card);
  Vue.component(Icon.name, Icon);

  Vue.directive(Ripple.name, Ripple);
};
