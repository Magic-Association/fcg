// A types rpc registry with builder helpers
// that keeps ctx-first shape and per-method arg/return types

import { RPCContext } from "./context.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RpcFn = (ctx: RPCContext, ...args: any[]) => unknown;

export type RpcRegistry<R extends Record<string, RpcFn>> = {
  define<Name extends string, Fn extends RpcFn>(
    name: Name,
    fn: Fn,
  ): RpcRegistry<R & Record<Name, Fn>>;
  call<Name extends keyof R>(
    name: Name,
    ctx: RPCContext,
    ...args: Parameters<R[Name]> extends [RPCContext, ...infer P] ? P : never
  ): ReturnType<R[Name]>;
  registry: R;
};

export function createRpcRegistry<
  R extends Record<string, RpcFn> = Record<string, RpcFn>,
>(initial?: R): RpcRegistry<R> {
  const store = (initial ?? {}) as R;

  function define<Name extends string, Fn extends RpcFn>(
    name: Name,
    fn: Fn,
  ): RpcRegistry<R & Record<Name, Fn>> {
    (store as Record<string, RpcFn>)[name] = fn;
    return createRpcRegistry<R & Record<Name, Fn>>(
      store as R & Record<Name, Fn>,
    );
  }

  function call<Name extends keyof R>(
    name: Name,
    ctx: RPCContext,
    ...args: Parameters<R[Name]> extends [RPCContext, ...infer P] ? P : never
  ): ReturnType<R[Name]> {
    return store[name](ctx, ...args) as ReturnType<R[Name]>;
  }

  return { registry: store, define, call };
}
