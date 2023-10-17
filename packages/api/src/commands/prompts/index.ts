import promptTerminal from '../../lib/prompt.js';
import Storage from '../../storage.js';

export async function confirmProposedIdentifier(initial: string, proposed: string) {
  return promptTerminal({
    type: 'confirm',
    name: 'value',
    message: `Looks like this API is called "${initial}", would you like to install it as "@api/${proposed}"?`,
  });
}

export async function promptForIdentifier(sdkExplanation: boolean = true) {
  let message = 'What would you like to identify this API as?';
  if (sdkExplanation) {
    message += ' This will be how you use the SDK.';
  }

  message += ' (e.g. entering `petstore` would result in `@api/petstore`)';

  return promptTerminal({
    type: 'text',
    name: 'value',
    message,
    validate: value => {
      if (!value) {
        return false;
      }

      try {
        return Storage.isIdentifierValid(value, true);
      } catch (err) {
        return err.message;
      }
    },
  });
}
