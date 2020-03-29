import Slider from '@/kit/inputs/Slider';
import Select from '@/kit/inputs/Select';
import Choice from '@/kit/inputs/Choice';
import Input from '@/kit/inputs/Input';
import ImageUploader from '@/kit/inputs/ImageUploader';
import TreeSelect from '@/kit/inputs/TreeSelect';
import Textarea from '@/kit/inputs/Textarea';

import Button from '@/kit/controls/Button';
import Tabs from '@/kit/controls/Tabs';
import Label from '@/kit/controls/Label';
import LabelGroup from '@/kit/controls/LabelGroup';
import Pagination from '@/kit/controls/Pagination';

import Card from '@/kit/views/Card';
import Icon from '@/kit/views/Icon';
import Table from '@/kit/views/Table';
import Spinner from '@/kit/views/Spinner';

import Modal from '@/kit/portals/Modal';
import ModalsTarget from '@/kit/portals/ModalsTarget';
import Alert, { AlertWormhole } from '@/kit/portals/Alert';
import AlertTarget from '@/kit/portals/AlertTarget';
import Menu from '@/kit/portals/Menu';
import MenuTarget from '@/kit/portals/MenuTarget';
import Tooltip from '@/kit/portals/Tooltip';
import Loader, { LoaderWormhole } from '@/kit/portals/Loader';
import LoaderTarget from '@/kit/portals/LoaderTarget';

import TransitionModal from '@/kit/transitions/Modal';
import TransitionAlert from '@/kit/transitions/Alert';
import TransitionMenu from '@/kit/transitions/Menu';
import TransitionLoader from '@/kit/transitions/Loader';

export { AlertWormhole, LoaderWormhole };

export default Vue => {
  Vue.component(Slider.name, Slider);
  Vue.component(Select.name, Select);
  Vue.component(Choice.name, Choice);
  Vue.component(Input.name, Input);
  Vue.component(ImageUploader.name, ImageUploader);
  Vue.component(TreeSelect.name, TreeSelect);
  Vue.component(Textarea.name, Textarea);

  Vue.component(Button.name, Button);
  Vue.component(Tabs.name, Tabs);
  Vue.component(Label.name, Label);
  Vue.component(LabelGroup.name, LabelGroup);
  Vue.component(Pagination.name, Pagination);

  Vue.component(Card.name, Card);
  Vue.component(Icon.name, Icon);
  Vue.component(Table.name, Table);
  Vue.component(Spinner.name, Spinner);

  Vue.component(Modal.name, Modal);
  Vue.component(ModalsTarget.name, ModalsTarget);
  Vue.component(Alert.name, Alert);
  Vue.component(AlertTarget.name, AlertTarget);
  Vue.component(Menu.name, Menu);
  Vue.component(MenuTarget.name, MenuTarget);
  Vue.component(Tooltip.name, Tooltip);
  Vue.component(Loader.name, Loader);
  Vue.component(LoaderTarget.name, LoaderTarget);

  Vue.component(TransitionModal.name, TransitionModal);
  Vue.component(TransitionAlert.name, TransitionAlert);
  Vue.component(TransitionMenu.name, TransitionMenu);
  Vue.component(TransitionLoader.name, TransitionLoader);
};
