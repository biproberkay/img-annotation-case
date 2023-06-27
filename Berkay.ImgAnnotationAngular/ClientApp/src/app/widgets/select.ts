//@ts-ignore
import { get, forEach, isEqual } from 'lodash';

export const SELECT = (args: any) => {
  const purpose = get(args, 'purpose', 'select-purpose');
  // 1. Find a current color setting in the annotation, if any
  var currentSelectBody = args.annotation
    ? args.annotation.bodies.find((b: any) => {
      return b.purpose == purpose;
    })
    : null;

  // 2. Keep the value in a variable
  var currentSelectValue = currentSelectBody ? currentSelectBody.value : null;

  // 3. Triggers callbacks on user action
  var addTag = (evt: any) => {
    if (currentSelectBody) {
      args.onUpdateBody(currentSelectBody, {
        type: 'TextualBody',
        purpose: purpose,
        value: evt.target.value,
      });
    } else {
      args.onAppendBody({
        type: 'TextualBody',
        purpose: purpose,
        value: evt.target.value,
      });
    }
  };

  var createOptions = (options: any) => {
    let html$ = '<option value="">Select</option>';
    forEach(options, (option: string) => {
      if (isEqual(option, currentSelectValue)) {
        html$ +=
          '<option value="' + option + '" selected>' + option + '</option>';
      } else {
        html$ += '<option value="' + option + '">' + option + '</option>';
      }
    });
    return html$;
  };

  // 4. This part renders the UI elements
  var createSelect = () => {
    var select = document.createElement('select');
    select.className = 'form-select';
    select.addEventListener('change', addTag);
    let html$ = '';
    const options = get(args, 'options', []);
    const parent = get(args, 'parent', false);
    if (!parent) {
      html$ = createOptions(options);
    } else {
      const parentBody = args.annotation.bodies.find((b: any) => {
        return b.purpose == parent;
      });
      if (parentBody && parentBody.value) {
        const choices = get(args, 'options.' + parentBody.value, []);
        html$ = createOptions(choices);
      } else {
        html$ = createOptions([]);
      }
    }
    select.innerHTML = html$;
    return select;
  };

  var container = document.createElement('div');
  container.className = 'select-widget';
  container.appendChild(createSelect());
  return container;
};

interface Tag {
  id: number;
  name: string;
}
