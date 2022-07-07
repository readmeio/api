import prompts from 'prompts';

/**
 * The `prompts` library doesn't always interpret CTRL+C and release the terminal back to the user
 * so we need handle this ourselves. This function is just a simple overload of the main `prompts`
 * import that we use.
 *
 * @see {@link https://github.com/terkelg/prompts/issues/252}
 */
export default async function promptTerminal<T extends string = string>(
  question: prompts.PromptObject<T>,
  options?: prompts.Options
) {
  const enableTerminalCursor = () => {
    process.stdout.write('\x1B[?25h');
  };

  const onState = (state: { aborted: boolean }) => {
    if (state.aborted) {
      // If we don't re-enable the terminal cursor before exiting the program, the cursor will
      // remain hidden.
      enableTerminalCursor();
      process.stdout.write('\n');
      process.exit(1);
    }
  };

  return prompts({ ...question, onState }, options);
}
