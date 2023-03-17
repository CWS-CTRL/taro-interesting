type _Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type _Partial<T> = {
  [P in keyof T]?: T[P];
};

type _Required<T> = {
  [P in keyof T]-?: T[P];
};

type _Exclude<T, U> = T extends U ? T : never;

type _Extract<T, U> = T extends U ? never : T;

type _Omit<T, K extends keyof any> = _Pick<T, _Extract<keyof T, K>>;

type _Reserve<T, K extends keyof any> = _Pick<T, _Exclude<keyof T, K>>;

type _SelectRequired<T, K extends keyof any> = _Partial<_Omit<T, K>> &
  _Required<_Reserve<T, K>>;

type _SelectPartial<T, K extends keyof any> = _Required<_Omit<T, K>> &
  _Partial<_Reserve<T, K>>;
