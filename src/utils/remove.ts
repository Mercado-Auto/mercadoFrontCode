export function remove<_T> (data: _T, key: keyof _T): _T {
  const _data = { ...data };
  delete _data[key];
  return _data;
}
