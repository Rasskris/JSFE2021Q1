/* -------------------------------- Documents ------------------------------- */

declare module '*.html' {
  const document: any;
  export default document;
}

/* --------------------------------- Images --------------------------------- */

declare module '*.gif' {
  const image: any;
  export default image;
}

declare module '*.jpg' {
  const image: any;
  export default image;
}

declare module '*.jpeg' {
  const image: any;
  export default image;
}

declare module '*.png' {
  const image: any;
  export default image;
}

declare module '*.svg' {
  const image: any;
  export default image;
}

declare interface PromiseConstructor {
  allSettled(promises: Promise<string>[]): Promise<Array<{ status: 'fulfilled' | 'rejected', value?: any, reason?: any }>>;
}
