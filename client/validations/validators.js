import { helpers } from 'vuelidate/lib/validators';

export const email = message => helpers.withParams(
  { type: 'email', message },
  value => !helpers.req(value) || /(^$|^(([^"().,:;<>@[\]\\\s]+(\.[^"().,:;<>@[\]\\\s"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/.test(value)
);

export const phone = message => helpers.withParams(
  { type: 'phone', message },
  value => !helpers.req(value) || (/^\+380 \(\d{2}\) \d{3}-\d{4}/).test(value)
);

export const maxLength = (max, message) => helpers.withParams(
  { type: 'maxLength', max, message },
  value => !helpers.req(value) || helpers.len(value) <= max
);

export const digits = message => helpers.withParams(
  { type: 'digits', message },
  value => !helpers.req(value) || (/^\d+$/).test(value)
);

export const required = message => helpers.withParams(
  { type: 'required', message },
  helpers.req
);

export const requiredIf = (prop, message) => helpers.withParams(
  { type: 'requiredIf', prop, message },
  function (value, parentVm) { return helpers.ref(prop, this, parentVm) ? helpers.req(value) : true; }
);
