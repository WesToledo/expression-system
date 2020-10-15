export function getDate() {
  return new Date().toISOString();
}

export function getMonth() {
  let now = new Date();
  return now.getMonth() + 1;
}
