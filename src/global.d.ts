// Extending the Document interface from the DOM API
declare global {
  interface Document {
    /**
     * startViewTransition method
     *
     * This optional method starts a view transition if it exists on the document object.
     *
     * @param cb - The callback function to call after the view transition starts.
     *
     * @returns Nothing.
     */
    startViewTransition?: (cb: () => void) => void;
  }
}

// This file can be used as a module with a default export or an empty object
export {};
