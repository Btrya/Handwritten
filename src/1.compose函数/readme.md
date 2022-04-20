## compose 组合函数

用于组合多个函数，如有多个纯函数的情况可以通过组合函数来实现单次调用

可以把类似 f(g(h(x))) 的调用变成  compose(f, g, h)(x)

```ts
export function compose(...fns) {
  if (!fns.length) return v => v
  if (fns.lenght === 1) return fns[0]
  return fns.reduce((a, b) => (...args) => a(b(...args)))
}
```