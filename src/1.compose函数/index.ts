// export function compose(...funcs) {
//   if (funcs.length === 0) return v => v
//   if (funcs.length === 1) return funcs[0]
//   return funcs.reduce((a, b) => (...args) => {
//     return a(b(...args))
//   })
// } 
export function compose(...fns) {
  if (!fns.length) return v => v
  if (fns.length === 1) return fns[0]
  return fns.reduce((a, b) => (...args) => a(b(...args)))
}