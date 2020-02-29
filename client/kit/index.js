import Slider from '@/kit/inputs/Slider';
import Select from '@/kit/inputs/Select';
import Choice from '@/kit/inputs/Choice';
import Input from '@/kit/inputs/Input';
import ImageUploader from '@/kit/inputs/ImageUploader';
import TreeSelect from '@/kit/inputs/TreeSelect';

import Button from '@/kit/controls/Button';
import Tabs from '@/kit/controls/Tabs';
import Label from '@/kit/controls/Label';
import LabelGroup from '@/kit/controls/LabelGroup';
import Pagination from '@/kit/controls/Pagination';

import Card from '@/kit/views/Card';
import Icon from '@/kit/views/Icon';
import Table from '@/kit/views/Table';
import Spinner from '@/kit/views/Spinner';

export default Vue => {
  Vue.component(Slider.name, Slider);
  Vue.component(Select.name, Select);
  Vue.component(Choice.name, Choice);
  Vue.component(Input.name, Input);
  Vue.component(ImageUploader.name, ImageUploader);
  Vue.component(TreeSelect.name, TreeSelect);

  Vue.component(Button.name, Button);
  Vue.component(Tabs.name, Tabs);
  Vue.component(Label.name, Label);
  Vue.component(LabelGroup.name, LabelGroup);
  Vue.component(Pagination.name, Pagination);

  Vue.component(Card.name, Card);
  Vue.component(Icon.name, Icon);
  Vue.component(Table.name, Table);
  Vue.component(Spinner.name, Spinner);
};
