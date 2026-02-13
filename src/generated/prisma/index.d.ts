
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Bot
 * 
 */
export type Bot = $Result.DefaultSelection<Prisma.$BotPayload>
/**
 * Model AgentPersona
 * 
 */
export type AgentPersona = $Result.DefaultSelection<Prisma.$AgentPersonaPayload>
/**
 * Model Subscription
 * 
 */
export type Subscription = $Result.DefaultSelection<Prisma.$SubscriptionPayload>
/**
 * Model Activity
 * 
 */
export type Activity = $Result.DefaultSelection<Prisma.$ActivityPayload>
/**
 * Model Lead
 * 
 */
export type Lead = $Result.DefaultSelection<Prisma.$LeadPayload>
/**
 * Model EmailLog
 * 
 */
export type EmailLog = $Result.DefaultSelection<Prisma.$EmailLogPayload>
/**
 * Model VideoJob
 * 
 */
export type VideoJob = $Result.DefaultSelection<Prisma.$VideoJobPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model PulseEvent
 * 
 */
export type PulseEvent = $Result.DefaultSelection<Prisma.$PulseEventPayload>
/**
 * Model InboxMessage
 * 
 */
export type InboxMessage = $Result.DefaultSelection<Prisma.$InboxMessagePayload>
/**
 * Model ProcessedStripeEvent
 * 
 */
export type ProcessedStripeEvent = $Result.DefaultSelection<Prisma.$ProcessedStripeEventPayload>
/**
 * Model ExecutionRecord
 * 
 */
export type ExecutionRecord = $Result.DefaultSelection<Prisma.$ExecutionRecordPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bot`: Exposes CRUD operations for the **Bot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bots
    * const bots = await prisma.bot.findMany()
    * ```
    */
  get bot(): Prisma.BotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agentPersona`: Exposes CRUD operations for the **AgentPersona** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgentPersonas
    * const agentPersonas = await prisma.agentPersona.findMany()
    * ```
    */
  get agentPersona(): Prisma.AgentPersonaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscription`: Exposes CRUD operations for the **Subscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriptions
    * const subscriptions = await prisma.subscription.findMany()
    * ```
    */
  get subscription(): Prisma.SubscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activity`: Exposes CRUD operations for the **Activity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Activities
    * const activities = await prisma.activity.findMany()
    * ```
    */
  get activity(): Prisma.ActivityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lead`: Exposes CRUD operations for the **Lead** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leads
    * const leads = await prisma.lead.findMany()
    * ```
    */
  get lead(): Prisma.LeadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emailLog`: Exposes CRUD operations for the **EmailLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailLogs
    * const emailLogs = await prisma.emailLog.findMany()
    * ```
    */
  get emailLog(): Prisma.EmailLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.videoJob`: Exposes CRUD operations for the **VideoJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VideoJobs
    * const videoJobs = await prisma.videoJob.findMany()
    * ```
    */
  get videoJob(): Prisma.VideoJobDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pulseEvent`: Exposes CRUD operations for the **PulseEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PulseEvents
    * const pulseEvents = await prisma.pulseEvent.findMany()
    * ```
    */
  get pulseEvent(): Prisma.PulseEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inboxMessage`: Exposes CRUD operations for the **InboxMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InboxMessages
    * const inboxMessages = await prisma.inboxMessage.findMany()
    * ```
    */
  get inboxMessage(): Prisma.InboxMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.processedStripeEvent`: Exposes CRUD operations for the **ProcessedStripeEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProcessedStripeEvents
    * const processedStripeEvents = await prisma.processedStripeEvent.findMany()
    * ```
    */
  get processedStripeEvent(): Prisma.ProcessedStripeEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.executionRecord`: Exposes CRUD operations for the **ExecutionRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExecutionRecords
    * const executionRecords = await prisma.executionRecord.findMany()
    * ```
    */
  get executionRecord(): Prisma.ExecutionRecordDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Bot: 'Bot',
    AgentPersona: 'AgentPersona',
    Subscription: 'Subscription',
    Activity: 'Activity',
    Lead: 'Lead',
    EmailLog: 'EmailLog',
    VideoJob: 'VideoJob',
    Task: 'Task',
    PulseEvent: 'PulseEvent',
    InboxMessage: 'InboxMessage',
    ProcessedStripeEvent: 'ProcessedStripeEvent',
    ExecutionRecord: 'ExecutionRecord'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "bot" | "agentPersona" | "subscription" | "activity" | "lead" | "emailLog" | "videoJob" | "task" | "pulseEvent" | "inboxMessage" | "processedStripeEvent" | "executionRecord"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Bot: {
        payload: Prisma.$BotPayload<ExtArgs>
        fields: Prisma.BotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotPayload>
          }
          findFirst: {
            args: Prisma.BotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotPayload>
          }
          findMany: {
            args: Prisma.BotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotPayload>[]
          }
          create: {
            args: Prisma.BotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotPayload>
          }
          createMany: {
            args: Prisma.BotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotPayload>[]
          }
          delete: {
            args: Prisma.BotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotPayload>
          }
          update: {
            args: Prisma.BotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotPayload>
          }
          deleteMany: {
            args: Prisma.BotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotPayload>[]
          }
          upsert: {
            args: Prisma.BotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotPayload>
          }
          aggregate: {
            args: Prisma.BotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBot>
          }
          groupBy: {
            args: Prisma.BotGroupByArgs<ExtArgs>
            result: $Utils.Optional<BotGroupByOutputType>[]
          }
          count: {
            args: Prisma.BotCountArgs<ExtArgs>
            result: $Utils.Optional<BotCountAggregateOutputType> | number
          }
        }
      }
      AgentPersona: {
        payload: Prisma.$AgentPersonaPayload<ExtArgs>
        fields: Prisma.AgentPersonaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentPersonaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPersonaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentPersonaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPersonaPayload>
          }
          findFirst: {
            args: Prisma.AgentPersonaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPersonaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentPersonaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPersonaPayload>
          }
          findMany: {
            args: Prisma.AgentPersonaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPersonaPayload>[]
          }
          create: {
            args: Prisma.AgentPersonaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPersonaPayload>
          }
          createMany: {
            args: Prisma.AgentPersonaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentPersonaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPersonaPayload>[]
          }
          delete: {
            args: Prisma.AgentPersonaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPersonaPayload>
          }
          update: {
            args: Prisma.AgentPersonaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPersonaPayload>
          }
          deleteMany: {
            args: Prisma.AgentPersonaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentPersonaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgentPersonaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPersonaPayload>[]
          }
          upsert: {
            args: Prisma.AgentPersonaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPersonaPayload>
          }
          aggregate: {
            args: Prisma.AgentPersonaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgentPersona>
          }
          groupBy: {
            args: Prisma.AgentPersonaGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentPersonaGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentPersonaCountArgs<ExtArgs>
            result: $Utils.Optional<AgentPersonaCountAggregateOutputType> | number
          }
        }
      }
      Subscription: {
        payload: Prisma.$SubscriptionPayload<ExtArgs>
        fields: Prisma.SubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findFirst: {
            args: Prisma.SubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findMany: {
            args: Prisma.SubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          create: {
            args: Prisma.SubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          createMany: {
            args: Prisma.SubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          delete: {
            args: Prisma.SubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          update: {
            args: Prisma.SubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          upsert: {
            args: Prisma.SubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscription>
          }
          groupBy: {
            args: Prisma.SubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionCountAggregateOutputType> | number
          }
        }
      }
      Activity: {
        payload: Prisma.$ActivityPayload<ExtArgs>
        fields: Prisma.ActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findFirst: {
            args: Prisma.ActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findMany: {
            args: Prisma.ActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          create: {
            args: Prisma.ActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          createMany: {
            args: Prisma.ActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          delete: {
            args: Prisma.ActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          update: {
            args: Prisma.ActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          deleteMany: {
            args: Prisma.ActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          upsert: {
            args: Prisma.ActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          aggregate: {
            args: Prisma.ActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivity>
          }
          groupBy: {
            args: Prisma.ActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityCountAggregateOutputType> | number
          }
        }
      }
      Lead: {
        payload: Prisma.$LeadPayload<ExtArgs>
        fields: Prisma.LeadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findFirst: {
            args: Prisma.LeadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findMany: {
            args: Prisma.LeadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          create: {
            args: Prisma.LeadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          createMany: {
            args: Prisma.LeadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          delete: {
            args: Prisma.LeadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          update: {
            args: Prisma.LeadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          deleteMany: {
            args: Prisma.LeadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          upsert: {
            args: Prisma.LeadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          aggregate: {
            args: Prisma.LeadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLead>
          }
          groupBy: {
            args: Prisma.LeadGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeadGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeadCountArgs<ExtArgs>
            result: $Utils.Optional<LeadCountAggregateOutputType> | number
          }
        }
      }
      EmailLog: {
        payload: Prisma.$EmailLogPayload<ExtArgs>
        fields: Prisma.EmailLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailLogPayload>
          }
          findFirst: {
            args: Prisma.EmailLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailLogPayload>
          }
          findMany: {
            args: Prisma.EmailLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailLogPayload>[]
          }
          create: {
            args: Prisma.EmailLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailLogPayload>
          }
          createMany: {
            args: Prisma.EmailLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmailLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailLogPayload>[]
          }
          delete: {
            args: Prisma.EmailLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailLogPayload>
          }
          update: {
            args: Prisma.EmailLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailLogPayload>
          }
          deleteMany: {
            args: Prisma.EmailLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmailLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailLogPayload>[]
          }
          upsert: {
            args: Prisma.EmailLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailLogPayload>
          }
          aggregate: {
            args: Prisma.EmailLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailLog>
          }
          groupBy: {
            args: Prisma.EmailLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailLogCountArgs<ExtArgs>
            result: $Utils.Optional<EmailLogCountAggregateOutputType> | number
          }
        }
      }
      VideoJob: {
        payload: Prisma.$VideoJobPayload<ExtArgs>
        fields: Prisma.VideoJobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VideoJobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoJobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VideoJobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoJobPayload>
          }
          findFirst: {
            args: Prisma.VideoJobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoJobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VideoJobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoJobPayload>
          }
          findMany: {
            args: Prisma.VideoJobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoJobPayload>[]
          }
          create: {
            args: Prisma.VideoJobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoJobPayload>
          }
          createMany: {
            args: Prisma.VideoJobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VideoJobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoJobPayload>[]
          }
          delete: {
            args: Prisma.VideoJobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoJobPayload>
          }
          update: {
            args: Prisma.VideoJobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoJobPayload>
          }
          deleteMany: {
            args: Prisma.VideoJobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VideoJobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VideoJobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoJobPayload>[]
          }
          upsert: {
            args: Prisma.VideoJobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoJobPayload>
          }
          aggregate: {
            args: Prisma.VideoJobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVideoJob>
          }
          groupBy: {
            args: Prisma.VideoJobGroupByArgs<ExtArgs>
            result: $Utils.Optional<VideoJobGroupByOutputType>[]
          }
          count: {
            args: Prisma.VideoJobCountArgs<ExtArgs>
            result: $Utils.Optional<VideoJobCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      PulseEvent: {
        payload: Prisma.$PulseEventPayload<ExtArgs>
        fields: Prisma.PulseEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PulseEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PulseEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PulseEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PulseEventPayload>
          }
          findFirst: {
            args: Prisma.PulseEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PulseEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PulseEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PulseEventPayload>
          }
          findMany: {
            args: Prisma.PulseEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PulseEventPayload>[]
          }
          create: {
            args: Prisma.PulseEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PulseEventPayload>
          }
          createMany: {
            args: Prisma.PulseEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PulseEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PulseEventPayload>[]
          }
          delete: {
            args: Prisma.PulseEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PulseEventPayload>
          }
          update: {
            args: Prisma.PulseEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PulseEventPayload>
          }
          deleteMany: {
            args: Prisma.PulseEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PulseEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PulseEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PulseEventPayload>[]
          }
          upsert: {
            args: Prisma.PulseEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PulseEventPayload>
          }
          aggregate: {
            args: Prisma.PulseEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePulseEvent>
          }
          groupBy: {
            args: Prisma.PulseEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<PulseEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.PulseEventCountArgs<ExtArgs>
            result: $Utils.Optional<PulseEventCountAggregateOutputType> | number
          }
        }
      }
      InboxMessage: {
        payload: Prisma.$InboxMessagePayload<ExtArgs>
        fields: Prisma.InboxMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InboxMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InboxMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InboxMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InboxMessagePayload>
          }
          findFirst: {
            args: Prisma.InboxMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InboxMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InboxMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InboxMessagePayload>
          }
          findMany: {
            args: Prisma.InboxMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InboxMessagePayload>[]
          }
          create: {
            args: Prisma.InboxMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InboxMessagePayload>
          }
          createMany: {
            args: Prisma.InboxMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InboxMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InboxMessagePayload>[]
          }
          delete: {
            args: Prisma.InboxMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InboxMessagePayload>
          }
          update: {
            args: Prisma.InboxMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InboxMessagePayload>
          }
          deleteMany: {
            args: Prisma.InboxMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InboxMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InboxMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InboxMessagePayload>[]
          }
          upsert: {
            args: Prisma.InboxMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InboxMessagePayload>
          }
          aggregate: {
            args: Prisma.InboxMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInboxMessage>
          }
          groupBy: {
            args: Prisma.InboxMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<InboxMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.InboxMessageCountArgs<ExtArgs>
            result: $Utils.Optional<InboxMessageCountAggregateOutputType> | number
          }
        }
      }
      ProcessedStripeEvent: {
        payload: Prisma.$ProcessedStripeEventPayload<ExtArgs>
        fields: Prisma.ProcessedStripeEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProcessedStripeEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedStripeEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProcessedStripeEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedStripeEventPayload>
          }
          findFirst: {
            args: Prisma.ProcessedStripeEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedStripeEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProcessedStripeEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedStripeEventPayload>
          }
          findMany: {
            args: Prisma.ProcessedStripeEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedStripeEventPayload>[]
          }
          create: {
            args: Prisma.ProcessedStripeEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedStripeEventPayload>
          }
          createMany: {
            args: Prisma.ProcessedStripeEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProcessedStripeEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedStripeEventPayload>[]
          }
          delete: {
            args: Prisma.ProcessedStripeEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedStripeEventPayload>
          }
          update: {
            args: Prisma.ProcessedStripeEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedStripeEventPayload>
          }
          deleteMany: {
            args: Prisma.ProcessedStripeEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProcessedStripeEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProcessedStripeEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedStripeEventPayload>[]
          }
          upsert: {
            args: Prisma.ProcessedStripeEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedStripeEventPayload>
          }
          aggregate: {
            args: Prisma.ProcessedStripeEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProcessedStripeEvent>
          }
          groupBy: {
            args: Prisma.ProcessedStripeEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProcessedStripeEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProcessedStripeEventCountArgs<ExtArgs>
            result: $Utils.Optional<ProcessedStripeEventCountAggregateOutputType> | number
          }
        }
      }
      ExecutionRecord: {
        payload: Prisma.$ExecutionRecordPayload<ExtArgs>
        fields: Prisma.ExecutionRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExecutionRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExecutionRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionRecordPayload>
          }
          findFirst: {
            args: Prisma.ExecutionRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExecutionRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionRecordPayload>
          }
          findMany: {
            args: Prisma.ExecutionRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionRecordPayload>[]
          }
          create: {
            args: Prisma.ExecutionRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionRecordPayload>
          }
          createMany: {
            args: Prisma.ExecutionRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExecutionRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionRecordPayload>[]
          }
          delete: {
            args: Prisma.ExecutionRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionRecordPayload>
          }
          update: {
            args: Prisma.ExecutionRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionRecordPayload>
          }
          deleteMany: {
            args: Prisma.ExecutionRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExecutionRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExecutionRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionRecordPayload>[]
          }
          upsert: {
            args: Prisma.ExecutionRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionRecordPayload>
          }
          aggregate: {
            args: Prisma.ExecutionRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExecutionRecord>
          }
          groupBy: {
            args: Prisma.ExecutionRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExecutionRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExecutionRecordCountArgs<ExtArgs>
            result: $Utils.Optional<ExecutionRecordCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    bot?: BotOmit
    agentPersona?: AgentPersonaOmit
    subscription?: SubscriptionOmit
    activity?: ActivityOmit
    lead?: LeadOmit
    emailLog?: EmailLogOmit
    videoJob?: VideoJobOmit
    task?: TaskOmit
    pulseEvent?: PulseEventOmit
    inboxMessage?: InboxMessageOmit
    processedStripeEvent?: ProcessedStripeEventOmit
    executionRecord?: ExecutionRecordOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    activities: number
    bots: number
    emailLogs: number
    leads: number
    tasks: number
    videoJobs: number
    executionRecords: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activities?: boolean | UserCountOutputTypeCountActivitiesArgs
    bots?: boolean | UserCountOutputTypeCountBotsArgs
    emailLogs?: boolean | UserCountOutputTypeCountEmailLogsArgs
    leads?: boolean | UserCountOutputTypeCountLeadsArgs
    tasks?: boolean | UserCountOutputTypeCountTasksArgs
    videoJobs?: boolean | UserCountOutputTypeCountVideoJobsArgs
    executionRecords?: boolean | UserCountOutputTypeCountExecutionRecordsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BotWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEmailLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLeadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVideoJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoJobWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountExecutionRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExecutionRecordWhereInput
  }


  /**
   * Count Type BotCountOutputType
   */

  export type BotCountOutputType = {
    activities: number
  }

  export type BotCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activities?: boolean | BotCountOutputTypeCountActivitiesArgs
  }

  // Custom InputTypes
  /**
   * BotCountOutputType without action
   */
  export type BotCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotCountOutputType
     */
    select?: BotCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BotCountOutputType without action
   */
  export type BotCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    activeTaskCount: number | null
    dailyUsageCount: number | null
    overageBalance: number | null
    creditsTotal: number | null
    creditsUsed: number | null
  }

  export type UserSumAggregateOutputType = {
    activeTaskCount: number | null
    dailyUsageCount: number | null
    overageBalance: number | null
    creditsTotal: number | null
    creditsUsed: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    clerkId: string | null
    stripeCustomerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    activeTaskCount: number | null
    dailyUsageCount: number | null
    lastUsageReset: Date | null
    overageBalance: number | null
    tier: string | null
    creditsTotal: number | null
    creditsUsed: number | null
    plan: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    clerkId: string | null
    stripeCustomerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    activeTaskCount: number | null
    dailyUsageCount: number | null
    lastUsageReset: Date | null
    overageBalance: number | null
    tier: string | null
    creditsTotal: number | null
    creditsUsed: number | null
    plan: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    clerkId: number
    stripeCustomerId: number
    createdAt: number
    updatedAt: number
    activeTaskCount: number
    dailyUsageCount: number
    lastUsageReset: number
    overageBalance: number
    tier: number
    creditsTotal: number
    creditsUsed: number
    plan: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    activeTaskCount?: true
    dailyUsageCount?: true
    overageBalance?: true
    creditsTotal?: true
    creditsUsed?: true
  }

  export type UserSumAggregateInputType = {
    activeTaskCount?: true
    dailyUsageCount?: true
    overageBalance?: true
    creditsTotal?: true
    creditsUsed?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    clerkId?: true
    stripeCustomerId?: true
    createdAt?: true
    updatedAt?: true
    activeTaskCount?: true
    dailyUsageCount?: true
    lastUsageReset?: true
    overageBalance?: true
    tier?: true
    creditsTotal?: true
    creditsUsed?: true
    plan?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    clerkId?: true
    stripeCustomerId?: true
    createdAt?: true
    updatedAt?: true
    activeTaskCount?: true
    dailyUsageCount?: true
    lastUsageReset?: true
    overageBalance?: true
    tier?: true
    creditsTotal?: true
    creditsUsed?: true
    plan?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    clerkId?: true
    stripeCustomerId?: true
    createdAt?: true
    updatedAt?: true
    activeTaskCount?: true
    dailyUsageCount?: true
    lastUsageReset?: true
    overageBalance?: true
    tier?: true
    creditsTotal?: true
    creditsUsed?: true
    plan?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    clerkId: string
    stripeCustomerId: string | null
    createdAt: Date
    updatedAt: Date
    activeTaskCount: number
    dailyUsageCount: number
    lastUsageReset: Date
    overageBalance: number
    tier: string
    creditsTotal: number
    creditsUsed: number
    plan: string
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    clerkId?: boolean
    stripeCustomerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    activeTaskCount?: boolean
    dailyUsageCount?: boolean
    lastUsageReset?: boolean
    overageBalance?: boolean
    tier?: boolean
    creditsTotal?: boolean
    creditsUsed?: boolean
    plan?: boolean
    activities?: boolean | User$activitiesArgs<ExtArgs>
    bots?: boolean | User$botsArgs<ExtArgs>
    emailLogs?: boolean | User$emailLogsArgs<ExtArgs>
    leads?: boolean | User$leadsArgs<ExtArgs>
    subscriptions?: boolean | User$subscriptionsArgs<ExtArgs>
    tasks?: boolean | User$tasksArgs<ExtArgs>
    videoJobs?: boolean | User$videoJobsArgs<ExtArgs>
    executionRecords?: boolean | User$executionRecordsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    clerkId?: boolean
    stripeCustomerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    activeTaskCount?: boolean
    dailyUsageCount?: boolean
    lastUsageReset?: boolean
    overageBalance?: boolean
    tier?: boolean
    creditsTotal?: boolean
    creditsUsed?: boolean
    plan?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    clerkId?: boolean
    stripeCustomerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    activeTaskCount?: boolean
    dailyUsageCount?: boolean
    lastUsageReset?: boolean
    overageBalance?: boolean
    tier?: boolean
    creditsTotal?: boolean
    creditsUsed?: boolean
    plan?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    clerkId?: boolean
    stripeCustomerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    activeTaskCount?: boolean
    dailyUsageCount?: boolean
    lastUsageReset?: boolean
    overageBalance?: boolean
    tier?: boolean
    creditsTotal?: boolean
    creditsUsed?: boolean
    plan?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "clerkId" | "stripeCustomerId" | "createdAt" | "updatedAt" | "activeTaskCount" | "dailyUsageCount" | "lastUsageReset" | "overageBalance" | "tier" | "creditsTotal" | "creditsUsed" | "plan", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activities?: boolean | User$activitiesArgs<ExtArgs>
    bots?: boolean | User$botsArgs<ExtArgs>
    emailLogs?: boolean | User$emailLogsArgs<ExtArgs>
    leads?: boolean | User$leadsArgs<ExtArgs>
    subscriptions?: boolean | User$subscriptionsArgs<ExtArgs>
    tasks?: boolean | User$tasksArgs<ExtArgs>
    videoJobs?: boolean | User$videoJobsArgs<ExtArgs>
    executionRecords?: boolean | User$executionRecordsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      activities: Prisma.$ActivityPayload<ExtArgs>[]
      bots: Prisma.$BotPayload<ExtArgs>[]
      emailLogs: Prisma.$EmailLogPayload<ExtArgs>[]
      leads: Prisma.$LeadPayload<ExtArgs>[]
      subscriptions: Prisma.$SubscriptionPayload<ExtArgs> | null
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      videoJobs: Prisma.$VideoJobPayload<ExtArgs>[]
      executionRecords: Prisma.$ExecutionRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      clerkId: string
      stripeCustomerId: string | null
      createdAt: Date
      updatedAt: Date
      activeTaskCount: number
      dailyUsageCount: number
      lastUsageReset: Date
      overageBalance: number
      tier: string
      creditsTotal: number
      creditsUsed: number
      plan: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    activities<T extends User$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, User$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bots<T extends User$botsArgs<ExtArgs> = {}>(args?: Subset<T, User$botsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    emailLogs<T extends User$emailLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$emailLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    leads<T extends User$leadsArgs<ExtArgs> = {}>(args?: Subset<T, User$leadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subscriptions<T extends User$subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, User$subscriptionsArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    tasks<T extends User$tasksArgs<ExtArgs> = {}>(args?: Subset<T, User$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    videoJobs<T extends User$videoJobsArgs<ExtArgs> = {}>(args?: Subset<T, User$videoJobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    executionRecords<T extends User$executionRecordsArgs<ExtArgs> = {}>(args?: Subset<T, User$executionRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExecutionRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly clerkId: FieldRef<"User", 'String'>
    readonly stripeCustomerId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly activeTaskCount: FieldRef<"User", 'Int'>
    readonly dailyUsageCount: FieldRef<"User", 'Int'>
    readonly lastUsageReset: FieldRef<"User", 'DateTime'>
    readonly overageBalance: FieldRef<"User", 'Int'>
    readonly tier: FieldRef<"User", 'String'>
    readonly creditsTotal: FieldRef<"User", 'Int'>
    readonly creditsUsed: FieldRef<"User", 'Int'>
    readonly plan: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.activities
   */
  export type User$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    cursor?: ActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * User.bots
   */
  export type User$botsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInclude<ExtArgs> | null
    where?: BotWhereInput
    orderBy?: BotOrderByWithRelationInput | BotOrderByWithRelationInput[]
    cursor?: BotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BotScalarFieldEnum | BotScalarFieldEnum[]
  }

  /**
   * User.emailLogs
   */
  export type User$emailLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailLog
     */
    select?: EmailLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailLog
     */
    omit?: EmailLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailLogInclude<ExtArgs> | null
    where?: EmailLogWhereInput
    orderBy?: EmailLogOrderByWithRelationInput | EmailLogOrderByWithRelationInput[]
    cursor?: EmailLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmailLogScalarFieldEnum | EmailLogScalarFieldEnum[]
  }

  /**
   * User.leads
   */
  export type User$leadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    cursor?: LeadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * User.subscriptions
   */
  export type User$subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
  }

  /**
   * User.tasks
   */
  export type User$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * User.videoJobs
   */
  export type User$videoJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoJob
     */
    select?: VideoJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoJob
     */
    omit?: VideoJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoJobInclude<ExtArgs> | null
    where?: VideoJobWhereInput
    orderBy?: VideoJobOrderByWithRelationInput | VideoJobOrderByWithRelationInput[]
    cursor?: VideoJobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VideoJobScalarFieldEnum | VideoJobScalarFieldEnum[]
  }

  /**
   * User.executionRecords
   */
  export type User$executionRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionRecord
     */
    select?: ExecutionRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExecutionRecord
     */
    omit?: ExecutionRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionRecordInclude<ExtArgs> | null
    where?: ExecutionRecordWhereInput
    orderBy?: ExecutionRecordOrderByWithRelationInput | ExecutionRecordOrderByWithRelationInput[]
    cursor?: ExecutionRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExecutionRecordScalarFieldEnum | ExecutionRecordScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Bot
   */

  export type AggregateBot = {
    _count: BotCountAggregateOutputType | null
    _min: BotMinAggregateOutputType | null
    _max: BotMaxAggregateOutputType | null
  }

  export type BotMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    type: string | null
    status: string | null
    isRunning: boolean | null
    desc: string | null
    lastRun: Date | null
    createdAt: Date | null
  }

  export type BotMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    type: string | null
    status: string | null
    isRunning: boolean | null
    desc: string | null
    lastRun: Date | null
    createdAt: Date | null
  }

  export type BotCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    type: number
    status: number
    isRunning: number
    desc: number
    lastRun: number
    createdAt: number
    _all: number
  }


  export type BotMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    type?: true
    status?: true
    isRunning?: true
    desc?: true
    lastRun?: true
    createdAt?: true
  }

  export type BotMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    type?: true
    status?: true
    isRunning?: true
    desc?: true
    lastRun?: true
    createdAt?: true
  }

  export type BotCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    type?: true
    status?: true
    isRunning?: true
    desc?: true
    lastRun?: true
    createdAt?: true
    _all?: true
  }

  export type BotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bot to aggregate.
     */
    where?: BotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bots to fetch.
     */
    orderBy?: BotOrderByWithRelationInput | BotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bots
    **/
    _count?: true | BotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BotMaxAggregateInputType
  }

  export type GetBotAggregateType<T extends BotAggregateArgs> = {
        [P in keyof T & keyof AggregateBot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBot[P]>
      : GetScalarType<T[P], AggregateBot[P]>
  }




  export type BotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BotWhereInput
    orderBy?: BotOrderByWithAggregationInput | BotOrderByWithAggregationInput[]
    by: BotScalarFieldEnum[] | BotScalarFieldEnum
    having?: BotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BotCountAggregateInputType | true
    _min?: BotMinAggregateInputType
    _max?: BotMaxAggregateInputType
  }

  export type BotGroupByOutputType = {
    id: string
    userId: string
    name: string
    type: string
    status: string
    isRunning: boolean
    desc: string
    lastRun: Date
    createdAt: Date
    _count: BotCountAggregateOutputType | null
    _min: BotMinAggregateOutputType | null
    _max: BotMaxAggregateOutputType | null
  }

  type GetBotGroupByPayload<T extends BotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BotGroupByOutputType[P]>
            : GetScalarType<T[P], BotGroupByOutputType[P]>
        }
      >
    >


  export type BotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    type?: boolean
    status?: boolean
    isRunning?: boolean
    desc?: boolean
    lastRun?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    activities?: boolean | Bot$activitiesArgs<ExtArgs>
    persona?: boolean | Bot$personaArgs<ExtArgs>
    _count?: boolean | BotCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bot"]>

  export type BotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    type?: boolean
    status?: boolean
    isRunning?: boolean
    desc?: boolean
    lastRun?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bot"]>

  export type BotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    type?: boolean
    status?: boolean
    isRunning?: boolean
    desc?: boolean
    lastRun?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bot"]>

  export type BotSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    type?: boolean
    status?: boolean
    isRunning?: boolean
    desc?: boolean
    lastRun?: boolean
    createdAt?: boolean
  }

  export type BotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "type" | "status" | "isRunning" | "desc" | "lastRun" | "createdAt", ExtArgs["result"]["bot"]>
  export type BotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    activities?: boolean | Bot$activitiesArgs<ExtArgs>
    persona?: boolean | Bot$personaArgs<ExtArgs>
    _count?: boolean | BotCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bot"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      activities: Prisma.$ActivityPayload<ExtArgs>[]
      persona: Prisma.$AgentPersonaPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      type: string
      status: string
      isRunning: boolean
      desc: string
      lastRun: Date
      createdAt: Date
    }, ExtArgs["result"]["bot"]>
    composites: {}
  }

  type BotGetPayload<S extends boolean | null | undefined | BotDefaultArgs> = $Result.GetResult<Prisma.$BotPayload, S>

  type BotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BotCountAggregateInputType | true
    }

  export interface BotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bot'], meta: { name: 'Bot' } }
    /**
     * Find zero or one Bot that matches the filter.
     * @param {BotFindUniqueArgs} args - Arguments to find a Bot
     * @example
     * // Get one Bot
     * const bot = await prisma.bot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BotFindUniqueArgs>(args: SelectSubset<T, BotFindUniqueArgs<ExtArgs>>): Prisma__BotClient<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BotFindUniqueOrThrowArgs} args - Arguments to find a Bot
     * @example
     * // Get one Bot
     * const bot = await prisma.bot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BotFindUniqueOrThrowArgs>(args: SelectSubset<T, BotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BotClient<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotFindFirstArgs} args - Arguments to find a Bot
     * @example
     * // Get one Bot
     * const bot = await prisma.bot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BotFindFirstArgs>(args?: SelectSubset<T, BotFindFirstArgs<ExtArgs>>): Prisma__BotClient<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotFindFirstOrThrowArgs} args - Arguments to find a Bot
     * @example
     * // Get one Bot
     * const bot = await prisma.bot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BotFindFirstOrThrowArgs>(args?: SelectSubset<T, BotFindFirstOrThrowArgs<ExtArgs>>): Prisma__BotClient<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bots
     * const bots = await prisma.bot.findMany()
     * 
     * // Get first 10 Bots
     * const bots = await prisma.bot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const botWithIdOnly = await prisma.bot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BotFindManyArgs>(args?: SelectSubset<T, BotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bot.
     * @param {BotCreateArgs} args - Arguments to create a Bot.
     * @example
     * // Create one Bot
     * const Bot = await prisma.bot.create({
     *   data: {
     *     // ... data to create a Bot
     *   }
     * })
     * 
     */
    create<T extends BotCreateArgs>(args: SelectSubset<T, BotCreateArgs<ExtArgs>>): Prisma__BotClient<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bots.
     * @param {BotCreateManyArgs} args - Arguments to create many Bots.
     * @example
     * // Create many Bots
     * const bot = await prisma.bot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BotCreateManyArgs>(args?: SelectSubset<T, BotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bots and returns the data saved in the database.
     * @param {BotCreateManyAndReturnArgs} args - Arguments to create many Bots.
     * @example
     * // Create many Bots
     * const bot = await prisma.bot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bots and only return the `id`
     * const botWithIdOnly = await prisma.bot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BotCreateManyAndReturnArgs>(args?: SelectSubset<T, BotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bot.
     * @param {BotDeleteArgs} args - Arguments to delete one Bot.
     * @example
     * // Delete one Bot
     * const Bot = await prisma.bot.delete({
     *   where: {
     *     // ... filter to delete one Bot
     *   }
     * })
     * 
     */
    delete<T extends BotDeleteArgs>(args: SelectSubset<T, BotDeleteArgs<ExtArgs>>): Prisma__BotClient<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bot.
     * @param {BotUpdateArgs} args - Arguments to update one Bot.
     * @example
     * // Update one Bot
     * const bot = await prisma.bot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BotUpdateArgs>(args: SelectSubset<T, BotUpdateArgs<ExtArgs>>): Prisma__BotClient<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bots.
     * @param {BotDeleteManyArgs} args - Arguments to filter Bots to delete.
     * @example
     * // Delete a few Bots
     * const { count } = await prisma.bot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BotDeleteManyArgs>(args?: SelectSubset<T, BotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bots
     * const bot = await prisma.bot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BotUpdateManyArgs>(args: SelectSubset<T, BotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bots and returns the data updated in the database.
     * @param {BotUpdateManyAndReturnArgs} args - Arguments to update many Bots.
     * @example
     * // Update many Bots
     * const bot = await prisma.bot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bots and only return the `id`
     * const botWithIdOnly = await prisma.bot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BotUpdateManyAndReturnArgs>(args: SelectSubset<T, BotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bot.
     * @param {BotUpsertArgs} args - Arguments to update or create a Bot.
     * @example
     * // Update or create a Bot
     * const bot = await prisma.bot.upsert({
     *   create: {
     *     // ... data to create a Bot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bot we want to update
     *   }
     * })
     */
    upsert<T extends BotUpsertArgs>(args: SelectSubset<T, BotUpsertArgs<ExtArgs>>): Prisma__BotClient<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotCountArgs} args - Arguments to filter Bots to count.
     * @example
     * // Count the number of Bots
     * const count = await prisma.bot.count({
     *   where: {
     *     // ... the filter for the Bots we want to count
     *   }
     * })
    **/
    count<T extends BotCountArgs>(
      args?: Subset<T, BotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BotAggregateArgs>(args: Subset<T, BotAggregateArgs>): Prisma.PrismaPromise<GetBotAggregateType<T>>

    /**
     * Group by Bot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BotGroupByArgs['orderBy'] }
        : { orderBy?: BotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bot model
   */
  readonly fields: BotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    activities<T extends Bot$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, Bot$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    persona<T extends Bot$personaArgs<ExtArgs> = {}>(args?: Subset<T, Bot$personaArgs<ExtArgs>>): Prisma__AgentPersonaClient<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Bot model
   */
  interface BotFieldRefs {
    readonly id: FieldRef<"Bot", 'String'>
    readonly userId: FieldRef<"Bot", 'String'>
    readonly name: FieldRef<"Bot", 'String'>
    readonly type: FieldRef<"Bot", 'String'>
    readonly status: FieldRef<"Bot", 'String'>
    readonly isRunning: FieldRef<"Bot", 'Boolean'>
    readonly desc: FieldRef<"Bot", 'String'>
    readonly lastRun: FieldRef<"Bot", 'DateTime'>
    readonly createdAt: FieldRef<"Bot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Bot findUnique
   */
  export type BotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInclude<ExtArgs> | null
    /**
     * Filter, which Bot to fetch.
     */
    where: BotWhereUniqueInput
  }

  /**
   * Bot findUniqueOrThrow
   */
  export type BotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInclude<ExtArgs> | null
    /**
     * Filter, which Bot to fetch.
     */
    where: BotWhereUniqueInput
  }

  /**
   * Bot findFirst
   */
  export type BotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInclude<ExtArgs> | null
    /**
     * Filter, which Bot to fetch.
     */
    where?: BotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bots to fetch.
     */
    orderBy?: BotOrderByWithRelationInput | BotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bots.
     */
    cursor?: BotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bots.
     */
    distinct?: BotScalarFieldEnum | BotScalarFieldEnum[]
  }

  /**
   * Bot findFirstOrThrow
   */
  export type BotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInclude<ExtArgs> | null
    /**
     * Filter, which Bot to fetch.
     */
    where?: BotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bots to fetch.
     */
    orderBy?: BotOrderByWithRelationInput | BotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bots.
     */
    cursor?: BotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bots.
     */
    distinct?: BotScalarFieldEnum | BotScalarFieldEnum[]
  }

  /**
   * Bot findMany
   */
  export type BotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInclude<ExtArgs> | null
    /**
     * Filter, which Bots to fetch.
     */
    where?: BotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bots to fetch.
     */
    orderBy?: BotOrderByWithRelationInput | BotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bots.
     */
    cursor?: BotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bots.
     */
    skip?: number
    distinct?: BotScalarFieldEnum | BotScalarFieldEnum[]
  }

  /**
   * Bot create
   */
  export type BotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInclude<ExtArgs> | null
    /**
     * The data needed to create a Bot.
     */
    data: XOR<BotCreateInput, BotUncheckedCreateInput>
  }

  /**
   * Bot createMany
   */
  export type BotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bots.
     */
    data: BotCreateManyInput | BotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bot createManyAndReturn
   */
  export type BotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * The data used to create many Bots.
     */
    data: BotCreateManyInput | BotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bot update
   */
  export type BotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInclude<ExtArgs> | null
    /**
     * The data needed to update a Bot.
     */
    data: XOR<BotUpdateInput, BotUncheckedUpdateInput>
    /**
     * Choose, which Bot to update.
     */
    where: BotWhereUniqueInput
  }

  /**
   * Bot updateMany
   */
  export type BotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bots.
     */
    data: XOR<BotUpdateManyMutationInput, BotUncheckedUpdateManyInput>
    /**
     * Filter which Bots to update
     */
    where?: BotWhereInput
    /**
     * Limit how many Bots to update.
     */
    limit?: number
  }

  /**
   * Bot updateManyAndReturn
   */
  export type BotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * The data used to update Bots.
     */
    data: XOR<BotUpdateManyMutationInput, BotUncheckedUpdateManyInput>
    /**
     * Filter which Bots to update
     */
    where?: BotWhereInput
    /**
     * Limit how many Bots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bot upsert
   */
  export type BotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInclude<ExtArgs> | null
    /**
     * The filter to search for the Bot to update in case it exists.
     */
    where: BotWhereUniqueInput
    /**
     * In case the Bot found by the `where` argument doesn't exist, create a new Bot with this data.
     */
    create: XOR<BotCreateInput, BotUncheckedCreateInput>
    /**
     * In case the Bot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BotUpdateInput, BotUncheckedUpdateInput>
  }

  /**
   * Bot delete
   */
  export type BotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInclude<ExtArgs> | null
    /**
     * Filter which Bot to delete.
     */
    where: BotWhereUniqueInput
  }

  /**
   * Bot deleteMany
   */
  export type BotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bots to delete
     */
    where?: BotWhereInput
    /**
     * Limit how many Bots to delete.
     */
    limit?: number
  }

  /**
   * Bot.activities
   */
  export type Bot$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    cursor?: ActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Bot.persona
   */
  export type Bot$personaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPersonaInclude<ExtArgs> | null
    where?: AgentPersonaWhereInput
  }

  /**
   * Bot without action
   */
  export type BotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInclude<ExtArgs> | null
  }


  /**
   * Model AgentPersona
   */

  export type AggregateAgentPersona = {
    _count: AgentPersonaCountAggregateOutputType | null
    _min: AgentPersonaMinAggregateOutputType | null
    _max: AgentPersonaMaxAggregateOutputType | null
  }

  export type AgentPersonaMinAggregateOutputType = {
    id: string | null
    botId: string | null
    systemPrompt: string | null
    riskLevel: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AgentPersonaMaxAggregateOutputType = {
    id: string | null
    botId: string | null
    systemPrompt: string | null
    riskLevel: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AgentPersonaCountAggregateOutputType = {
    id: number
    botId: number
    systemPrompt: number
    riskLevel: number
    capabilities: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AgentPersonaMinAggregateInputType = {
    id?: true
    botId?: true
    systemPrompt?: true
    riskLevel?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AgentPersonaMaxAggregateInputType = {
    id?: true
    botId?: true
    systemPrompt?: true
    riskLevel?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AgentPersonaCountAggregateInputType = {
    id?: true
    botId?: true
    systemPrompt?: true
    riskLevel?: true
    capabilities?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AgentPersonaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentPersona to aggregate.
     */
    where?: AgentPersonaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentPersonas to fetch.
     */
    orderBy?: AgentPersonaOrderByWithRelationInput | AgentPersonaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentPersonaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentPersonas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentPersonas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgentPersonas
    **/
    _count?: true | AgentPersonaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentPersonaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentPersonaMaxAggregateInputType
  }

  export type GetAgentPersonaAggregateType<T extends AgentPersonaAggregateArgs> = {
        [P in keyof T & keyof AggregateAgentPersona]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgentPersona[P]>
      : GetScalarType<T[P], AggregateAgentPersona[P]>
  }




  export type AgentPersonaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentPersonaWhereInput
    orderBy?: AgentPersonaOrderByWithAggregationInput | AgentPersonaOrderByWithAggregationInput[]
    by: AgentPersonaScalarFieldEnum[] | AgentPersonaScalarFieldEnum
    having?: AgentPersonaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentPersonaCountAggregateInputType | true
    _min?: AgentPersonaMinAggregateInputType
    _max?: AgentPersonaMaxAggregateInputType
  }

  export type AgentPersonaGroupByOutputType = {
    id: string
    botId: string
    systemPrompt: string
    riskLevel: string
    capabilities: string[]
    createdAt: Date
    updatedAt: Date
    _count: AgentPersonaCountAggregateOutputType | null
    _min: AgentPersonaMinAggregateOutputType | null
    _max: AgentPersonaMaxAggregateOutputType | null
  }

  type GetAgentPersonaGroupByPayload<T extends AgentPersonaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentPersonaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentPersonaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentPersonaGroupByOutputType[P]>
            : GetScalarType<T[P], AgentPersonaGroupByOutputType[P]>
        }
      >
    >


  export type AgentPersonaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    botId?: boolean
    systemPrompt?: boolean
    riskLevel?: boolean
    capabilities?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bot?: boolean | BotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentPersona"]>

  export type AgentPersonaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    botId?: boolean
    systemPrompt?: boolean
    riskLevel?: boolean
    capabilities?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bot?: boolean | BotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentPersona"]>

  export type AgentPersonaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    botId?: boolean
    systemPrompt?: boolean
    riskLevel?: boolean
    capabilities?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bot?: boolean | BotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentPersona"]>

  export type AgentPersonaSelectScalar = {
    id?: boolean
    botId?: boolean
    systemPrompt?: boolean
    riskLevel?: boolean
    capabilities?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AgentPersonaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "botId" | "systemPrompt" | "riskLevel" | "capabilities" | "createdAt" | "updatedAt", ExtArgs["result"]["agentPersona"]>
  export type AgentPersonaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bot?: boolean | BotDefaultArgs<ExtArgs>
  }
  export type AgentPersonaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bot?: boolean | BotDefaultArgs<ExtArgs>
  }
  export type AgentPersonaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bot?: boolean | BotDefaultArgs<ExtArgs>
  }

  export type $AgentPersonaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgentPersona"
    objects: {
      bot: Prisma.$BotPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      botId: string
      systemPrompt: string
      riskLevel: string
      capabilities: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["agentPersona"]>
    composites: {}
  }

  type AgentPersonaGetPayload<S extends boolean | null | undefined | AgentPersonaDefaultArgs> = $Result.GetResult<Prisma.$AgentPersonaPayload, S>

  type AgentPersonaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgentPersonaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgentPersonaCountAggregateInputType | true
    }

  export interface AgentPersonaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgentPersona'], meta: { name: 'AgentPersona' } }
    /**
     * Find zero or one AgentPersona that matches the filter.
     * @param {AgentPersonaFindUniqueArgs} args - Arguments to find a AgentPersona
     * @example
     * // Get one AgentPersona
     * const agentPersona = await prisma.agentPersona.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentPersonaFindUniqueArgs>(args: SelectSubset<T, AgentPersonaFindUniqueArgs<ExtArgs>>): Prisma__AgentPersonaClient<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AgentPersona that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgentPersonaFindUniqueOrThrowArgs} args - Arguments to find a AgentPersona
     * @example
     * // Get one AgentPersona
     * const agentPersona = await prisma.agentPersona.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentPersonaFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentPersonaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentPersonaClient<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentPersona that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentPersonaFindFirstArgs} args - Arguments to find a AgentPersona
     * @example
     * // Get one AgentPersona
     * const agentPersona = await prisma.agentPersona.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentPersonaFindFirstArgs>(args?: SelectSubset<T, AgentPersonaFindFirstArgs<ExtArgs>>): Prisma__AgentPersonaClient<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentPersona that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentPersonaFindFirstOrThrowArgs} args - Arguments to find a AgentPersona
     * @example
     * // Get one AgentPersona
     * const agentPersona = await prisma.agentPersona.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentPersonaFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentPersonaFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentPersonaClient<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AgentPersonas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentPersonaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgentPersonas
     * const agentPersonas = await prisma.agentPersona.findMany()
     * 
     * // Get first 10 AgentPersonas
     * const agentPersonas = await prisma.agentPersona.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentPersonaWithIdOnly = await prisma.agentPersona.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentPersonaFindManyArgs>(args?: SelectSubset<T, AgentPersonaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AgentPersona.
     * @param {AgentPersonaCreateArgs} args - Arguments to create a AgentPersona.
     * @example
     * // Create one AgentPersona
     * const AgentPersona = await prisma.agentPersona.create({
     *   data: {
     *     // ... data to create a AgentPersona
     *   }
     * })
     * 
     */
    create<T extends AgentPersonaCreateArgs>(args: SelectSubset<T, AgentPersonaCreateArgs<ExtArgs>>): Prisma__AgentPersonaClient<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AgentPersonas.
     * @param {AgentPersonaCreateManyArgs} args - Arguments to create many AgentPersonas.
     * @example
     * // Create many AgentPersonas
     * const agentPersona = await prisma.agentPersona.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentPersonaCreateManyArgs>(args?: SelectSubset<T, AgentPersonaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AgentPersonas and returns the data saved in the database.
     * @param {AgentPersonaCreateManyAndReturnArgs} args - Arguments to create many AgentPersonas.
     * @example
     * // Create many AgentPersonas
     * const agentPersona = await prisma.agentPersona.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AgentPersonas and only return the `id`
     * const agentPersonaWithIdOnly = await prisma.agentPersona.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentPersonaCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentPersonaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AgentPersona.
     * @param {AgentPersonaDeleteArgs} args - Arguments to delete one AgentPersona.
     * @example
     * // Delete one AgentPersona
     * const AgentPersona = await prisma.agentPersona.delete({
     *   where: {
     *     // ... filter to delete one AgentPersona
     *   }
     * })
     * 
     */
    delete<T extends AgentPersonaDeleteArgs>(args: SelectSubset<T, AgentPersonaDeleteArgs<ExtArgs>>): Prisma__AgentPersonaClient<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AgentPersona.
     * @param {AgentPersonaUpdateArgs} args - Arguments to update one AgentPersona.
     * @example
     * // Update one AgentPersona
     * const agentPersona = await prisma.agentPersona.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentPersonaUpdateArgs>(args: SelectSubset<T, AgentPersonaUpdateArgs<ExtArgs>>): Prisma__AgentPersonaClient<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AgentPersonas.
     * @param {AgentPersonaDeleteManyArgs} args - Arguments to filter AgentPersonas to delete.
     * @example
     * // Delete a few AgentPersonas
     * const { count } = await prisma.agentPersona.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentPersonaDeleteManyArgs>(args?: SelectSubset<T, AgentPersonaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentPersonas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentPersonaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgentPersonas
     * const agentPersona = await prisma.agentPersona.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentPersonaUpdateManyArgs>(args: SelectSubset<T, AgentPersonaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentPersonas and returns the data updated in the database.
     * @param {AgentPersonaUpdateManyAndReturnArgs} args - Arguments to update many AgentPersonas.
     * @example
     * // Update many AgentPersonas
     * const agentPersona = await prisma.agentPersona.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AgentPersonas and only return the `id`
     * const agentPersonaWithIdOnly = await prisma.agentPersona.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgentPersonaUpdateManyAndReturnArgs>(args: SelectSubset<T, AgentPersonaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AgentPersona.
     * @param {AgentPersonaUpsertArgs} args - Arguments to update or create a AgentPersona.
     * @example
     * // Update or create a AgentPersona
     * const agentPersona = await prisma.agentPersona.upsert({
     *   create: {
     *     // ... data to create a AgentPersona
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgentPersona we want to update
     *   }
     * })
     */
    upsert<T extends AgentPersonaUpsertArgs>(args: SelectSubset<T, AgentPersonaUpsertArgs<ExtArgs>>): Prisma__AgentPersonaClient<$Result.GetResult<Prisma.$AgentPersonaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AgentPersonas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentPersonaCountArgs} args - Arguments to filter AgentPersonas to count.
     * @example
     * // Count the number of AgentPersonas
     * const count = await prisma.agentPersona.count({
     *   where: {
     *     // ... the filter for the AgentPersonas we want to count
     *   }
     * })
    **/
    count<T extends AgentPersonaCountArgs>(
      args?: Subset<T, AgentPersonaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentPersonaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgentPersona.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentPersonaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentPersonaAggregateArgs>(args: Subset<T, AgentPersonaAggregateArgs>): Prisma.PrismaPromise<GetAgentPersonaAggregateType<T>>

    /**
     * Group by AgentPersona.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentPersonaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentPersonaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentPersonaGroupByArgs['orderBy'] }
        : { orderBy?: AgentPersonaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentPersonaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentPersonaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgentPersona model
   */
  readonly fields: AgentPersonaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgentPersona.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentPersonaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bot<T extends BotDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BotDefaultArgs<ExtArgs>>): Prisma__BotClient<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgentPersona model
   */
  interface AgentPersonaFieldRefs {
    readonly id: FieldRef<"AgentPersona", 'String'>
    readonly botId: FieldRef<"AgentPersona", 'String'>
    readonly systemPrompt: FieldRef<"AgentPersona", 'String'>
    readonly riskLevel: FieldRef<"AgentPersona", 'String'>
    readonly capabilities: FieldRef<"AgentPersona", 'String[]'>
    readonly createdAt: FieldRef<"AgentPersona", 'DateTime'>
    readonly updatedAt: FieldRef<"AgentPersona", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AgentPersona findUnique
   */
  export type AgentPersonaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPersonaInclude<ExtArgs> | null
    /**
     * Filter, which AgentPersona to fetch.
     */
    where: AgentPersonaWhereUniqueInput
  }

  /**
   * AgentPersona findUniqueOrThrow
   */
  export type AgentPersonaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPersonaInclude<ExtArgs> | null
    /**
     * Filter, which AgentPersona to fetch.
     */
    where: AgentPersonaWhereUniqueInput
  }

  /**
   * AgentPersona findFirst
   */
  export type AgentPersonaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPersonaInclude<ExtArgs> | null
    /**
     * Filter, which AgentPersona to fetch.
     */
    where?: AgentPersonaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentPersonas to fetch.
     */
    orderBy?: AgentPersonaOrderByWithRelationInput | AgentPersonaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentPersonas.
     */
    cursor?: AgentPersonaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentPersonas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentPersonas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentPersonas.
     */
    distinct?: AgentPersonaScalarFieldEnum | AgentPersonaScalarFieldEnum[]
  }

  /**
   * AgentPersona findFirstOrThrow
   */
  export type AgentPersonaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPersonaInclude<ExtArgs> | null
    /**
     * Filter, which AgentPersona to fetch.
     */
    where?: AgentPersonaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentPersonas to fetch.
     */
    orderBy?: AgentPersonaOrderByWithRelationInput | AgentPersonaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentPersonas.
     */
    cursor?: AgentPersonaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentPersonas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentPersonas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentPersonas.
     */
    distinct?: AgentPersonaScalarFieldEnum | AgentPersonaScalarFieldEnum[]
  }

  /**
   * AgentPersona findMany
   */
  export type AgentPersonaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPersonaInclude<ExtArgs> | null
    /**
     * Filter, which AgentPersonas to fetch.
     */
    where?: AgentPersonaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentPersonas to fetch.
     */
    orderBy?: AgentPersonaOrderByWithRelationInput | AgentPersonaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgentPersonas.
     */
    cursor?: AgentPersonaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentPersonas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentPersonas.
     */
    skip?: number
    distinct?: AgentPersonaScalarFieldEnum | AgentPersonaScalarFieldEnum[]
  }

  /**
   * AgentPersona create
   */
  export type AgentPersonaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPersonaInclude<ExtArgs> | null
    /**
     * The data needed to create a AgentPersona.
     */
    data: XOR<AgentPersonaCreateInput, AgentPersonaUncheckedCreateInput>
  }

  /**
   * AgentPersona createMany
   */
  export type AgentPersonaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgentPersonas.
     */
    data: AgentPersonaCreateManyInput | AgentPersonaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AgentPersona createManyAndReturn
   */
  export type AgentPersonaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * The data used to create many AgentPersonas.
     */
    data: AgentPersonaCreateManyInput | AgentPersonaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPersonaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentPersona update
   */
  export type AgentPersonaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPersonaInclude<ExtArgs> | null
    /**
     * The data needed to update a AgentPersona.
     */
    data: XOR<AgentPersonaUpdateInput, AgentPersonaUncheckedUpdateInput>
    /**
     * Choose, which AgentPersona to update.
     */
    where: AgentPersonaWhereUniqueInput
  }

  /**
   * AgentPersona updateMany
   */
  export type AgentPersonaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgentPersonas.
     */
    data: XOR<AgentPersonaUpdateManyMutationInput, AgentPersonaUncheckedUpdateManyInput>
    /**
     * Filter which AgentPersonas to update
     */
    where?: AgentPersonaWhereInput
    /**
     * Limit how many AgentPersonas to update.
     */
    limit?: number
  }

  /**
   * AgentPersona updateManyAndReturn
   */
  export type AgentPersonaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * The data used to update AgentPersonas.
     */
    data: XOR<AgentPersonaUpdateManyMutationInput, AgentPersonaUncheckedUpdateManyInput>
    /**
     * Filter which AgentPersonas to update
     */
    where?: AgentPersonaWhereInput
    /**
     * Limit how many AgentPersonas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPersonaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentPersona upsert
   */
  export type AgentPersonaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPersonaInclude<ExtArgs> | null
    /**
     * The filter to search for the AgentPersona to update in case it exists.
     */
    where: AgentPersonaWhereUniqueInput
    /**
     * In case the AgentPersona found by the `where` argument doesn't exist, create a new AgentPersona with this data.
     */
    create: XOR<AgentPersonaCreateInput, AgentPersonaUncheckedCreateInput>
    /**
     * In case the AgentPersona was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentPersonaUpdateInput, AgentPersonaUncheckedUpdateInput>
  }

  /**
   * AgentPersona delete
   */
  export type AgentPersonaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPersonaInclude<ExtArgs> | null
    /**
     * Filter which AgentPersona to delete.
     */
    where: AgentPersonaWhereUniqueInput
  }

  /**
   * AgentPersona deleteMany
   */
  export type AgentPersonaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentPersonas to delete
     */
    where?: AgentPersonaWhereInput
    /**
     * Limit how many AgentPersonas to delete.
     */
    limit?: number
  }

  /**
   * AgentPersona without action
   */
  export type AgentPersonaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentPersona
     */
    select?: AgentPersonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentPersona
     */
    omit?: AgentPersonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentPersonaInclude<ExtArgs> | null
  }


  /**
   * Model Subscription
   */

  export type AggregateSubscription = {
    _count: SubscriptionCountAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  export type SubscriptionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    stripeSubscriptionId: string | null
    stripeCustomerId: string | null
    stripePriceId: string | null
    plan: string | null
    status: string | null
    currentPeriodEnd: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    discountApplied: boolean | null
  }

  export type SubscriptionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    stripeSubscriptionId: string | null
    stripeCustomerId: string | null
    stripePriceId: string | null
    plan: string | null
    status: string | null
    currentPeriodEnd: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    discountApplied: boolean | null
  }

  export type SubscriptionCountAggregateOutputType = {
    id: number
    userId: number
    stripeSubscriptionId: number
    stripeCustomerId: number
    stripePriceId: number
    plan: number
    status: number
    currentPeriodEnd: number
    createdAt: number
    updatedAt: number
    discountApplied: number
    _all: number
  }


  export type SubscriptionMinAggregateInputType = {
    id?: true
    userId?: true
    stripeSubscriptionId?: true
    stripeCustomerId?: true
    stripePriceId?: true
    plan?: true
    status?: true
    currentPeriodEnd?: true
    createdAt?: true
    updatedAt?: true
    discountApplied?: true
  }

  export type SubscriptionMaxAggregateInputType = {
    id?: true
    userId?: true
    stripeSubscriptionId?: true
    stripeCustomerId?: true
    stripePriceId?: true
    plan?: true
    status?: true
    currentPeriodEnd?: true
    createdAt?: true
    updatedAt?: true
    discountApplied?: true
  }

  export type SubscriptionCountAggregateInputType = {
    id?: true
    userId?: true
    stripeSubscriptionId?: true
    stripeCustomerId?: true
    stripePriceId?: true
    plan?: true
    status?: true
    currentPeriodEnd?: true
    createdAt?: true
    updatedAt?: true
    discountApplied?: true
    _all?: true
  }

  export type SubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscription to aggregate.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subscriptions
    **/
    _count?: true | SubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionMaxAggregateInputType
  }

  export type GetSubscriptionAggregateType<T extends SubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscription[P]>
      : GetScalarType<T[P], AggregateSubscription[P]>
  }




  export type SubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithAggregationInput | SubscriptionOrderByWithAggregationInput[]
    by: SubscriptionScalarFieldEnum[] | SubscriptionScalarFieldEnum
    having?: SubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionCountAggregateInputType | true
    _min?: SubscriptionMinAggregateInputType
    _max?: SubscriptionMaxAggregateInputType
  }

  export type SubscriptionGroupByOutputType = {
    id: string
    userId: string
    stripeSubscriptionId: string | null
    stripeCustomerId: string | null
    stripePriceId: string | null
    plan: string | null
    status: string | null
    currentPeriodEnd: Date | null
    createdAt: Date
    updatedAt: Date
    discountApplied: boolean
    _count: SubscriptionCountAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  type GetSubscriptionGroupByPayload<T extends SubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    stripeSubscriptionId?: boolean
    stripeCustomerId?: boolean
    stripePriceId?: boolean
    plan?: boolean
    status?: boolean
    currentPeriodEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    discountApplied?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    stripeSubscriptionId?: boolean
    stripeCustomerId?: boolean
    stripePriceId?: boolean
    plan?: boolean
    status?: boolean
    currentPeriodEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    discountApplied?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    stripeSubscriptionId?: boolean
    stripeCustomerId?: boolean
    stripePriceId?: boolean
    plan?: boolean
    status?: boolean
    currentPeriodEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    discountApplied?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectScalar = {
    id?: boolean
    userId?: boolean
    stripeSubscriptionId?: boolean
    stripeCustomerId?: boolean
    stripePriceId?: boolean
    plan?: boolean
    status?: boolean
    currentPeriodEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    discountApplied?: boolean
  }

  export type SubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "stripeSubscriptionId" | "stripeCustomerId" | "stripePriceId" | "plan" | "status" | "currentPeriodEnd" | "createdAt" | "updatedAt" | "discountApplied", ExtArgs["result"]["subscription"]>
  export type SubscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subscription"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      stripeSubscriptionId: string | null
      stripeCustomerId: string | null
      stripePriceId: string | null
      plan: string | null
      status: string | null
      currentPeriodEnd: Date | null
      createdAt: Date
      updatedAt: Date
      discountApplied: boolean
    }, ExtArgs["result"]["subscription"]>
    composites: {}
  }

  type SubscriptionGetPayload<S extends boolean | null | undefined | SubscriptionDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionPayload, S>

  type SubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionCountAggregateInputType | true
    }

  export interface SubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subscription'], meta: { name: 'Subscription' } }
    /**
     * Find zero or one Subscription that matches the filter.
     * @param {SubscriptionFindUniqueArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionFindUniqueArgs>(args: SelectSubset<T, SubscriptionFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscriptionFindUniqueOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionFindFirstArgs>(args?: SelectSubset<T, SubscriptionFindFirstArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriptions
     * const subscriptions = await prisma.subscription.findMany()
     * 
     * // Get first 10 Subscriptions
     * const subscriptions = await prisma.subscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriptionFindManyArgs>(args?: SelectSubset<T, SubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscription.
     * @param {SubscriptionCreateArgs} args - Arguments to create a Subscription.
     * @example
     * // Create one Subscription
     * const Subscription = await prisma.subscription.create({
     *   data: {
     *     // ... data to create a Subscription
     *   }
     * })
     * 
     */
    create<T extends SubscriptionCreateArgs>(args: SelectSubset<T, SubscriptionCreateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscriptions.
     * @param {SubscriptionCreateManyArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionCreateManyArgs>(args?: SelectSubset<T, SubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscriptions and returns the data saved in the database.
     * @param {SubscriptionCreateManyAndReturnArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subscription.
     * @param {SubscriptionDeleteArgs} args - Arguments to delete one Subscription.
     * @example
     * // Delete one Subscription
     * const Subscription = await prisma.subscription.delete({
     *   where: {
     *     // ... filter to delete one Subscription
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionDeleteArgs>(args: SelectSubset<T, SubscriptionDeleteArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscription.
     * @param {SubscriptionUpdateArgs} args - Arguments to update one Subscription.
     * @example
     * // Update one Subscription
     * const subscription = await prisma.subscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionUpdateArgs>(args: SelectSubset<T, SubscriptionUpdateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscriptions.
     * @param {SubscriptionDeleteManyArgs} args - Arguments to filter Subscriptions to delete.
     * @example
     * // Delete a few Subscriptions
     * const { count } = await prisma.subscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionDeleteManyArgs>(args?: SelectSubset<T, SubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionUpdateManyArgs>(args: SelectSubset<T, SubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions and returns the data updated in the database.
     * @param {SubscriptionUpdateManyAndReturnArgs} args - Arguments to update many Subscriptions.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, SubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subscription.
     * @param {SubscriptionUpsertArgs} args - Arguments to update or create a Subscription.
     * @example
     * // Update or create a Subscription
     * const subscription = await prisma.subscription.upsert({
     *   create: {
     *     // ... data to create a Subscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscription we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionUpsertArgs>(args: SelectSubset<T, SubscriptionUpsertArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCountArgs} args - Arguments to filter Subscriptions to count.
     * @example
     * // Count the number of Subscriptions
     * const count = await prisma.subscription.count({
     *   where: {
     *     // ... the filter for the Subscriptions we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionCountArgs>(
      args?: Subset<T, SubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriptionAggregateArgs>(args: Subset<T, SubscriptionAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionAggregateType<T>>

    /**
     * Group by Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subscription model
   */
  readonly fields: SubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subscription model
   */
  interface SubscriptionFieldRefs {
    readonly id: FieldRef<"Subscription", 'String'>
    readonly userId: FieldRef<"Subscription", 'String'>
    readonly stripeSubscriptionId: FieldRef<"Subscription", 'String'>
    readonly stripeCustomerId: FieldRef<"Subscription", 'String'>
    readonly stripePriceId: FieldRef<"Subscription", 'String'>
    readonly plan: FieldRef<"Subscription", 'String'>
    readonly status: FieldRef<"Subscription", 'String'>
    readonly currentPeriodEnd: FieldRef<"Subscription", 'DateTime'>
    readonly createdAt: FieldRef<"Subscription", 'DateTime'>
    readonly updatedAt: FieldRef<"Subscription", 'DateTime'>
    readonly discountApplied: FieldRef<"Subscription", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Subscription findUnique
   */
  export type SubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findUniqueOrThrow
   */
  export type SubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findFirst
   */
  export type SubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findFirstOrThrow
   */
  export type SubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findMany
   */
  export type SubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscriptions to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription create
   */
  export type SubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Subscription.
     */
    data: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
  }

  /**
   * Subscription createMany
   */
  export type SubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subscription createManyAndReturn
   */
  export type SubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription update
   */
  export type SubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Subscription.
     */
    data: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
    /**
     * Choose, which Subscription to update.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription updateMany
   */
  export type SubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
  }

  /**
   * Subscription updateManyAndReturn
   */
  export type SubscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription upsert
   */
  export type SubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Subscription to update in case it exists.
     */
    where: SubscriptionWhereUniqueInput
    /**
     * In case the Subscription found by the `where` argument doesn't exist, create a new Subscription with this data.
     */
    create: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
    /**
     * In case the Subscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
  }

  /**
   * Subscription delete
   */
  export type SubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter which Subscription to delete.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription deleteMany
   */
  export type SubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscriptions to delete
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to delete.
     */
    limit?: number
  }

  /**
   * Subscription without action
   */
  export type SubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
  }


  /**
   * Model Activity
   */

  export type AggregateActivity = {
    _count: ActivityCountAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  export type ActivityMinAggregateOutputType = {
    id: string | null
    userId: string | null
    botId: string | null
    action: string | null
    type: string | null
    createdAt: Date | null
  }

  export type ActivityMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    botId: string | null
    action: string | null
    type: string | null
    createdAt: Date | null
  }

  export type ActivityCountAggregateOutputType = {
    id: number
    userId: number
    botId: number
    action: number
    type: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type ActivityMinAggregateInputType = {
    id?: true
    userId?: true
    botId?: true
    action?: true
    type?: true
    createdAt?: true
  }

  export type ActivityMaxAggregateInputType = {
    id?: true
    userId?: true
    botId?: true
    action?: true
    type?: true
    createdAt?: true
  }

  export type ActivityCountAggregateInputType = {
    id?: true
    userId?: true
    botId?: true
    action?: true
    type?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type ActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activity to aggregate.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Activities
    **/
    _count?: true | ActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityMaxAggregateInputType
  }

  export type GetActivityAggregateType<T extends ActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivity[P]>
      : GetScalarType<T[P], AggregateActivity[P]>
  }




  export type ActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithAggregationInput | ActivityOrderByWithAggregationInput[]
    by: ActivityScalarFieldEnum[] | ActivityScalarFieldEnum
    having?: ActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityCountAggregateInputType | true
    _min?: ActivityMinAggregateInputType
    _max?: ActivityMaxAggregateInputType
  }

  export type ActivityGroupByOutputType = {
    id: string
    userId: string
    botId: string | null
    action: string
    type: string
    metadata: JsonValue | null
    createdAt: Date
    _count: ActivityCountAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  type GetActivityGroupByPayload<T extends ActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityGroupByOutputType[P]>
        }
      >
    >


  export type ActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    botId?: boolean
    action?: boolean
    type?: boolean
    metadata?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    bot?: boolean | Activity$botArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    botId?: boolean
    action?: boolean
    type?: boolean
    metadata?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    bot?: boolean | Activity$botArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    botId?: boolean
    action?: boolean
    type?: boolean
    metadata?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    bot?: boolean | Activity$botArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectScalar = {
    id?: boolean
    userId?: boolean
    botId?: boolean
    action?: boolean
    type?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type ActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "botId" | "action" | "type" | "metadata" | "createdAt", ExtArgs["result"]["activity"]>
  export type ActivityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    bot?: boolean | Activity$botArgs<ExtArgs>
  }
  export type ActivityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    bot?: boolean | Activity$botArgs<ExtArgs>
  }
  export type ActivityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    bot?: boolean | Activity$botArgs<ExtArgs>
  }

  export type $ActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Activity"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      bot: Prisma.$BotPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      botId: string | null
      action: string
      type: string
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["activity"]>
    composites: {}
  }

  type ActivityGetPayload<S extends boolean | null | undefined | ActivityDefaultArgs> = $Result.GetResult<Prisma.$ActivityPayload, S>

  type ActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityCountAggregateInputType | true
    }

  export interface ActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Activity'], meta: { name: 'Activity' } }
    /**
     * Find zero or one Activity that matches the filter.
     * @param {ActivityFindUniqueArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityFindUniqueArgs>(args: SelectSubset<T, ActivityFindUniqueArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Activity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityFindUniqueOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityFindFirstArgs>(args?: SelectSubset<T, ActivityFindFirstArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Activities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Activities
     * const activities = await prisma.activity.findMany()
     * 
     * // Get first 10 Activities
     * const activities = await prisma.activity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityWithIdOnly = await prisma.activity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityFindManyArgs>(args?: SelectSubset<T, ActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Activity.
     * @param {ActivityCreateArgs} args - Arguments to create a Activity.
     * @example
     * // Create one Activity
     * const Activity = await prisma.activity.create({
     *   data: {
     *     // ... data to create a Activity
     *   }
     * })
     * 
     */
    create<T extends ActivityCreateArgs>(args: SelectSubset<T, ActivityCreateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Activities.
     * @param {ActivityCreateManyArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityCreateManyArgs>(args?: SelectSubset<T, ActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Activities and returns the data saved in the database.
     * @param {ActivityCreateManyAndReturnArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Activity.
     * @param {ActivityDeleteArgs} args - Arguments to delete one Activity.
     * @example
     * // Delete one Activity
     * const Activity = await prisma.activity.delete({
     *   where: {
     *     // ... filter to delete one Activity
     *   }
     * })
     * 
     */
    delete<T extends ActivityDeleteArgs>(args: SelectSubset<T, ActivityDeleteArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Activity.
     * @param {ActivityUpdateArgs} args - Arguments to update one Activity.
     * @example
     * // Update one Activity
     * const activity = await prisma.activity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityUpdateArgs>(args: SelectSubset<T, ActivityUpdateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Activities.
     * @param {ActivityDeleteManyArgs} args - Arguments to filter Activities to delete.
     * @example
     * // Delete a few Activities
     * const { count } = await prisma.activity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityDeleteManyArgs>(args?: SelectSubset<T, ActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityUpdateManyArgs>(args: SelectSubset<T, ActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities and returns the data updated in the database.
     * @param {ActivityUpdateManyAndReturnArgs} args - Arguments to update many Activities.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivityUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Activity.
     * @param {ActivityUpsertArgs} args - Arguments to update or create a Activity.
     * @example
     * // Update or create a Activity
     * const activity = await prisma.activity.upsert({
     *   create: {
     *     // ... data to create a Activity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Activity we want to update
     *   }
     * })
     */
    upsert<T extends ActivityUpsertArgs>(args: SelectSubset<T, ActivityUpsertArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCountArgs} args - Arguments to filter Activities to count.
     * @example
     * // Count the number of Activities
     * const count = await prisma.activity.count({
     *   where: {
     *     // ... the filter for the Activities we want to count
     *   }
     * })
    **/
    count<T extends ActivityCountArgs>(
      args?: Subset<T, ActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityAggregateArgs>(args: Subset<T, ActivityAggregateArgs>): Prisma.PrismaPromise<GetActivityAggregateType<T>>

    /**
     * Group by Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityGroupByArgs['orderBy'] }
        : { orderBy?: ActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Activity model
   */
  readonly fields: ActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Activity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    bot<T extends Activity$botArgs<ExtArgs> = {}>(args?: Subset<T, Activity$botArgs<ExtArgs>>): Prisma__BotClient<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Activity model
   */
  interface ActivityFieldRefs {
    readonly id: FieldRef<"Activity", 'String'>
    readonly userId: FieldRef<"Activity", 'String'>
    readonly botId: FieldRef<"Activity", 'String'>
    readonly action: FieldRef<"Activity", 'String'>
    readonly type: FieldRef<"Activity", 'String'>
    readonly metadata: FieldRef<"Activity", 'Json'>
    readonly createdAt: FieldRef<"Activity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Activity findUnique
   */
  export type ActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findUniqueOrThrow
   */
  export type ActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findFirst
   */
  export type ActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findFirstOrThrow
   */
  export type ActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findMany
   */
  export type ActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activities to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity create
   */
  export type ActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to create a Activity.
     */
    data: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
  }

  /**
   * Activity createMany
   */
  export type ActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Activity createManyAndReturn
   */
  export type ActivityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Activity update
   */
  export type ActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to update a Activity.
     */
    data: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
    /**
     * Choose, which Activity to update.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity updateMany
   */
  export type ActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
  }

  /**
   * Activity updateManyAndReturn
   */
  export type ActivityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Activity upsert
   */
  export type ActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The filter to search for the Activity to update in case it exists.
     */
    where: ActivityWhereUniqueInput
    /**
     * In case the Activity found by the `where` argument doesn't exist, create a new Activity with this data.
     */
    create: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
    /**
     * In case the Activity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
  }

  /**
   * Activity delete
   */
  export type ActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter which Activity to delete.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity deleteMany
   */
  export type ActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activities to delete
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to delete.
     */
    limit?: number
  }

  /**
   * Activity.bot
   */
  export type Activity$botArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInclude<ExtArgs> | null
    where?: BotWhereInput
  }

  /**
   * Activity without action
   */
  export type ActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
  }


  /**
   * Model Lead
   */

  export type AggregateLead = {
    _count: LeadCountAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  export type LeadMinAggregateOutputType = {
    id: string | null
    userId: string | null
    businessName: string | null
    website: string | null
    email: string | null
    phone: string | null
    industry: string | null
    location: string | null
    source: string | null
    createdAt: Date | null
  }

  export type LeadMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    businessName: string | null
    website: string | null
    email: string | null
    phone: string | null
    industry: string | null
    location: string | null
    source: string | null
    createdAt: Date | null
  }

  export type LeadCountAggregateOutputType = {
    id: number
    userId: number
    businessName: number
    website: number
    email: number
    phone: number
    industry: number
    location: number
    source: number
    createdAt: number
    _all: number
  }


  export type LeadMinAggregateInputType = {
    id?: true
    userId?: true
    businessName?: true
    website?: true
    email?: true
    phone?: true
    industry?: true
    location?: true
    source?: true
    createdAt?: true
  }

  export type LeadMaxAggregateInputType = {
    id?: true
    userId?: true
    businessName?: true
    website?: true
    email?: true
    phone?: true
    industry?: true
    location?: true
    source?: true
    createdAt?: true
  }

  export type LeadCountAggregateInputType = {
    id?: true
    userId?: true
    businessName?: true
    website?: true
    email?: true
    phone?: true
    industry?: true
    location?: true
    source?: true
    createdAt?: true
    _all?: true
  }

  export type LeadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lead to aggregate.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Leads
    **/
    _count?: true | LeadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeadMaxAggregateInputType
  }

  export type GetLeadAggregateType<T extends LeadAggregateArgs> = {
        [P in keyof T & keyof AggregateLead]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLead[P]>
      : GetScalarType<T[P], AggregateLead[P]>
  }




  export type LeadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithAggregationInput | LeadOrderByWithAggregationInput[]
    by: LeadScalarFieldEnum[] | LeadScalarFieldEnum
    having?: LeadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeadCountAggregateInputType | true
    _min?: LeadMinAggregateInputType
    _max?: LeadMaxAggregateInputType
  }

  export type LeadGroupByOutputType = {
    id: string
    userId: string
    businessName: string
    website: string | null
    email: string | null
    phone: string | null
    industry: string | null
    location: string | null
    source: string
    createdAt: Date
    _count: LeadCountAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  type GetLeadGroupByPayload<T extends LeadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeadGroupByOutputType[P]>
            : GetScalarType<T[P], LeadGroupByOutputType[P]>
        }
      >
    >


  export type LeadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    businessName?: boolean
    website?: boolean
    email?: boolean
    phone?: boolean
    industry?: boolean
    location?: boolean
    source?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    businessName?: boolean
    website?: boolean
    email?: boolean
    phone?: boolean
    industry?: boolean
    location?: boolean
    source?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    businessName?: boolean
    website?: boolean
    email?: boolean
    phone?: boolean
    industry?: boolean
    location?: boolean
    source?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectScalar = {
    id?: boolean
    userId?: boolean
    businessName?: boolean
    website?: boolean
    email?: boolean
    phone?: boolean
    industry?: boolean
    location?: boolean
    source?: boolean
    createdAt?: boolean
  }

  export type LeadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "businessName" | "website" | "email" | "phone" | "industry" | "location" | "source" | "createdAt", ExtArgs["result"]["lead"]>
  export type LeadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LeadIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LeadIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LeadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lead"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      businessName: string
      website: string | null
      email: string | null
      phone: string | null
      industry: string | null
      location: string | null
      source: string
      createdAt: Date
    }, ExtArgs["result"]["lead"]>
    composites: {}
  }

  type LeadGetPayload<S extends boolean | null | undefined | LeadDefaultArgs> = $Result.GetResult<Prisma.$LeadPayload, S>

  type LeadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeadCountAggregateInputType | true
    }

  export interface LeadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lead'], meta: { name: 'Lead' } }
    /**
     * Find zero or one Lead that matches the filter.
     * @param {LeadFindUniqueArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeadFindUniqueArgs>(args: SelectSubset<T, LeadFindUniqueArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lead that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeadFindUniqueOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeadFindUniqueOrThrowArgs>(args: SelectSubset<T, LeadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lead that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeadFindFirstArgs>(args?: SelectSubset<T, LeadFindFirstArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lead that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeadFindFirstOrThrowArgs>(args?: SelectSubset<T, LeadFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Leads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leads
     * const leads = await prisma.lead.findMany()
     * 
     * // Get first 10 Leads
     * const leads = await prisma.lead.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leadWithIdOnly = await prisma.lead.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeadFindManyArgs>(args?: SelectSubset<T, LeadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lead.
     * @param {LeadCreateArgs} args - Arguments to create a Lead.
     * @example
     * // Create one Lead
     * const Lead = await prisma.lead.create({
     *   data: {
     *     // ... data to create a Lead
     *   }
     * })
     * 
     */
    create<T extends LeadCreateArgs>(args: SelectSubset<T, LeadCreateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Leads.
     * @param {LeadCreateManyArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeadCreateManyArgs>(args?: SelectSubset<T, LeadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Leads and returns the data saved in the database.
     * @param {LeadCreateManyAndReturnArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Leads and only return the `id`
     * const leadWithIdOnly = await prisma.lead.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeadCreateManyAndReturnArgs>(args?: SelectSubset<T, LeadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Lead.
     * @param {LeadDeleteArgs} args - Arguments to delete one Lead.
     * @example
     * // Delete one Lead
     * const Lead = await prisma.lead.delete({
     *   where: {
     *     // ... filter to delete one Lead
     *   }
     * })
     * 
     */
    delete<T extends LeadDeleteArgs>(args: SelectSubset<T, LeadDeleteArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lead.
     * @param {LeadUpdateArgs} args - Arguments to update one Lead.
     * @example
     * // Update one Lead
     * const lead = await prisma.lead.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeadUpdateArgs>(args: SelectSubset<T, LeadUpdateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Leads.
     * @param {LeadDeleteManyArgs} args - Arguments to filter Leads to delete.
     * @example
     * // Delete a few Leads
     * const { count } = await prisma.lead.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeadDeleteManyArgs>(args?: SelectSubset<T, LeadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leads
     * const lead = await prisma.lead.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeadUpdateManyArgs>(args: SelectSubset<T, LeadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leads and returns the data updated in the database.
     * @param {LeadUpdateManyAndReturnArgs} args - Arguments to update many Leads.
     * @example
     * // Update many Leads
     * const lead = await prisma.lead.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Leads and only return the `id`
     * const leadWithIdOnly = await prisma.lead.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LeadUpdateManyAndReturnArgs>(args: SelectSubset<T, LeadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Lead.
     * @param {LeadUpsertArgs} args - Arguments to update or create a Lead.
     * @example
     * // Update or create a Lead
     * const lead = await prisma.lead.upsert({
     *   create: {
     *     // ... data to create a Lead
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lead we want to update
     *   }
     * })
     */
    upsert<T extends LeadUpsertArgs>(args: SelectSubset<T, LeadUpsertArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCountArgs} args - Arguments to filter Leads to count.
     * @example
     * // Count the number of Leads
     * const count = await prisma.lead.count({
     *   where: {
     *     // ... the filter for the Leads we want to count
     *   }
     * })
    **/
    count<T extends LeadCountArgs>(
      args?: Subset<T, LeadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeadAggregateArgs>(args: Subset<T, LeadAggregateArgs>): Prisma.PrismaPromise<GetLeadAggregateType<T>>

    /**
     * Group by Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeadGroupByArgs['orderBy'] }
        : { orderBy?: LeadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lead model
   */
  readonly fields: LeadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lead.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lead model
   */
  interface LeadFieldRefs {
    readonly id: FieldRef<"Lead", 'String'>
    readonly userId: FieldRef<"Lead", 'String'>
    readonly businessName: FieldRef<"Lead", 'String'>
    readonly website: FieldRef<"Lead", 'String'>
    readonly email: FieldRef<"Lead", 'String'>
    readonly phone: FieldRef<"Lead", 'String'>
    readonly industry: FieldRef<"Lead", 'String'>
    readonly location: FieldRef<"Lead", 'String'>
    readonly source: FieldRef<"Lead", 'String'>
    readonly createdAt: FieldRef<"Lead", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Lead findUnique
   */
  export type LeadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findUniqueOrThrow
   */
  export type LeadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findFirst
   */
  export type LeadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findFirstOrThrow
   */
  export type LeadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findMany
   */
  export type LeadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Leads to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead create
   */
  export type LeadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to create a Lead.
     */
    data: XOR<LeadCreateInput, LeadUncheckedCreateInput>
  }

  /**
   * Lead createMany
   */
  export type LeadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lead createManyAndReturn
   */
  export type LeadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lead update
   */
  export type LeadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to update a Lead.
     */
    data: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
    /**
     * Choose, which Lead to update.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead updateMany
   */
  export type LeadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Leads.
     */
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyInput>
    /**
     * Filter which Leads to update
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to update.
     */
    limit?: number
  }

  /**
   * Lead updateManyAndReturn
   */
  export type LeadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The data used to update Leads.
     */
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyInput>
    /**
     * Filter which Leads to update
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lead upsert
   */
  export type LeadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The filter to search for the Lead to update in case it exists.
     */
    where: LeadWhereUniqueInput
    /**
     * In case the Lead found by the `where` argument doesn't exist, create a new Lead with this data.
     */
    create: XOR<LeadCreateInput, LeadUncheckedCreateInput>
    /**
     * In case the Lead was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
  }

  /**
   * Lead delete
   */
  export type LeadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter which Lead to delete.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead deleteMany
   */
  export type LeadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Leads to delete
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to delete.
     */
    limit?: number
  }

  /**
   * Lead without action
   */
  export type LeadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
  }


  /**
   * Model EmailLog
   */

  export type AggregateEmailLog = {
    _count: EmailLogCountAggregateOutputType | null
    _min: EmailLogMinAggregateOutputType | null
    _max: EmailLogMaxAggregateOutputType | null
  }

  export type EmailLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    text: string | null
    createdAt: Date | null
  }

  export type EmailLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    text: string | null
    createdAt: Date | null
  }

  export type EmailLogCountAggregateOutputType = {
    id: number
    userId: number
    text: number
    createdAt: number
    _all: number
  }


  export type EmailLogMinAggregateInputType = {
    id?: true
    userId?: true
    text?: true
    createdAt?: true
  }

  export type EmailLogMaxAggregateInputType = {
    id?: true
    userId?: true
    text?: true
    createdAt?: true
  }

  export type EmailLogCountAggregateInputType = {
    id?: true
    userId?: true
    text?: true
    createdAt?: true
    _all?: true
  }

  export type EmailLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailLog to aggregate.
     */
    where?: EmailLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailLogs to fetch.
     */
    orderBy?: EmailLogOrderByWithRelationInput | EmailLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailLogs
    **/
    _count?: true | EmailLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailLogMaxAggregateInputType
  }

  export type GetEmailLogAggregateType<T extends EmailLogAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailLog[P]>
      : GetScalarType<T[P], AggregateEmailLog[P]>
  }




  export type EmailLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailLogWhereInput
    orderBy?: EmailLogOrderByWithAggregationInput | EmailLogOrderByWithAggregationInput[]
    by: EmailLogScalarFieldEnum[] | EmailLogScalarFieldEnum
    having?: EmailLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailLogCountAggregateInputType | true
    _min?: EmailLogMinAggregateInputType
    _max?: EmailLogMaxAggregateInputType
  }

  export type EmailLogGroupByOutputType = {
    id: string
    userId: string
    text: string
    createdAt: Date
    _count: EmailLogCountAggregateOutputType | null
    _min: EmailLogMinAggregateOutputType | null
    _max: EmailLogMaxAggregateOutputType | null
  }

  type GetEmailLogGroupByPayload<T extends EmailLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailLogGroupByOutputType[P]>
            : GetScalarType<T[P], EmailLogGroupByOutputType[P]>
        }
      >
    >


  export type EmailLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    text?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailLog"]>

  export type EmailLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    text?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailLog"]>

  export type EmailLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    text?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailLog"]>

  export type EmailLogSelectScalar = {
    id?: boolean
    userId?: boolean
    text?: boolean
    createdAt?: boolean
  }

  export type EmailLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "text" | "createdAt", ExtArgs["result"]["emailLog"]>
  export type EmailLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EmailLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EmailLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EmailLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      text: string
      createdAt: Date
    }, ExtArgs["result"]["emailLog"]>
    composites: {}
  }

  type EmailLogGetPayload<S extends boolean | null | undefined | EmailLogDefaultArgs> = $Result.GetResult<Prisma.$EmailLogPayload, S>

  type EmailLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailLogCountAggregateInputType | true
    }

  export interface EmailLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailLog'], meta: { name: 'EmailLog' } }
    /**
     * Find zero or one EmailLog that matches the filter.
     * @param {EmailLogFindUniqueArgs} args - Arguments to find a EmailLog
     * @example
     * // Get one EmailLog
     * const emailLog = await prisma.emailLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailLogFindUniqueArgs>(args: SelectSubset<T, EmailLogFindUniqueArgs<ExtArgs>>): Prisma__EmailLogClient<$Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmailLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailLogFindUniqueOrThrowArgs} args - Arguments to find a EmailLog
     * @example
     * // Get one EmailLog
     * const emailLog = await prisma.emailLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailLogFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailLogClient<$Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailLogFindFirstArgs} args - Arguments to find a EmailLog
     * @example
     * // Get one EmailLog
     * const emailLog = await prisma.emailLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailLogFindFirstArgs>(args?: SelectSubset<T, EmailLogFindFirstArgs<ExtArgs>>): Prisma__EmailLogClient<$Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailLogFindFirstOrThrowArgs} args - Arguments to find a EmailLog
     * @example
     * // Get one EmailLog
     * const emailLog = await prisma.emailLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailLogFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailLogClient<$Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmailLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailLogs
     * const emailLogs = await prisma.emailLog.findMany()
     * 
     * // Get first 10 EmailLogs
     * const emailLogs = await prisma.emailLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailLogWithIdOnly = await prisma.emailLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailLogFindManyArgs>(args?: SelectSubset<T, EmailLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmailLog.
     * @param {EmailLogCreateArgs} args - Arguments to create a EmailLog.
     * @example
     * // Create one EmailLog
     * const EmailLog = await prisma.emailLog.create({
     *   data: {
     *     // ... data to create a EmailLog
     *   }
     * })
     * 
     */
    create<T extends EmailLogCreateArgs>(args: SelectSubset<T, EmailLogCreateArgs<ExtArgs>>): Prisma__EmailLogClient<$Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmailLogs.
     * @param {EmailLogCreateManyArgs} args - Arguments to create many EmailLogs.
     * @example
     * // Create many EmailLogs
     * const emailLog = await prisma.emailLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailLogCreateManyArgs>(args?: SelectSubset<T, EmailLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmailLogs and returns the data saved in the database.
     * @param {EmailLogCreateManyAndReturnArgs} args - Arguments to create many EmailLogs.
     * @example
     * // Create many EmailLogs
     * const emailLog = await prisma.emailLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmailLogs and only return the `id`
     * const emailLogWithIdOnly = await prisma.emailLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmailLogCreateManyAndReturnArgs>(args?: SelectSubset<T, EmailLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmailLog.
     * @param {EmailLogDeleteArgs} args - Arguments to delete one EmailLog.
     * @example
     * // Delete one EmailLog
     * const EmailLog = await prisma.emailLog.delete({
     *   where: {
     *     // ... filter to delete one EmailLog
     *   }
     * })
     * 
     */
    delete<T extends EmailLogDeleteArgs>(args: SelectSubset<T, EmailLogDeleteArgs<ExtArgs>>): Prisma__EmailLogClient<$Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmailLog.
     * @param {EmailLogUpdateArgs} args - Arguments to update one EmailLog.
     * @example
     * // Update one EmailLog
     * const emailLog = await prisma.emailLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailLogUpdateArgs>(args: SelectSubset<T, EmailLogUpdateArgs<ExtArgs>>): Prisma__EmailLogClient<$Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmailLogs.
     * @param {EmailLogDeleteManyArgs} args - Arguments to filter EmailLogs to delete.
     * @example
     * // Delete a few EmailLogs
     * const { count } = await prisma.emailLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailLogDeleteManyArgs>(args?: SelectSubset<T, EmailLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailLogs
     * const emailLog = await prisma.emailLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailLogUpdateManyArgs>(args: SelectSubset<T, EmailLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailLogs and returns the data updated in the database.
     * @param {EmailLogUpdateManyAndReturnArgs} args - Arguments to update many EmailLogs.
     * @example
     * // Update many EmailLogs
     * const emailLog = await prisma.emailLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmailLogs and only return the `id`
     * const emailLogWithIdOnly = await prisma.emailLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmailLogUpdateManyAndReturnArgs>(args: SelectSubset<T, EmailLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmailLog.
     * @param {EmailLogUpsertArgs} args - Arguments to update or create a EmailLog.
     * @example
     * // Update or create a EmailLog
     * const emailLog = await prisma.emailLog.upsert({
     *   create: {
     *     // ... data to create a EmailLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailLog we want to update
     *   }
     * })
     */
    upsert<T extends EmailLogUpsertArgs>(args: SelectSubset<T, EmailLogUpsertArgs<ExtArgs>>): Prisma__EmailLogClient<$Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmailLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailLogCountArgs} args - Arguments to filter EmailLogs to count.
     * @example
     * // Count the number of EmailLogs
     * const count = await prisma.emailLog.count({
     *   where: {
     *     // ... the filter for the EmailLogs we want to count
     *   }
     * })
    **/
    count<T extends EmailLogCountArgs>(
      args?: Subset<T, EmailLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmailLogAggregateArgs>(args: Subset<T, EmailLogAggregateArgs>): Prisma.PrismaPromise<GetEmailLogAggregateType<T>>

    /**
     * Group by EmailLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmailLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailLogGroupByArgs['orderBy'] }
        : { orderBy?: EmailLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmailLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailLog model
   */
  readonly fields: EmailLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmailLog model
   */
  interface EmailLogFieldRefs {
    readonly id: FieldRef<"EmailLog", 'String'>
    readonly userId: FieldRef<"EmailLog", 'String'>
    readonly text: FieldRef<"EmailLog", 'String'>
    readonly createdAt: FieldRef<"EmailLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmailLog findUnique
   */
  export type EmailLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailLog
     */
    select?: EmailLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailLog
     */
    omit?: EmailLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailLogInclude<ExtArgs> | null
    /**
     * Filter, which EmailLog to fetch.
     */
    where: EmailLogWhereUniqueInput
  }

  /**
   * EmailLog findUniqueOrThrow
   */
  export type EmailLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailLog
     */
    select?: EmailLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailLog
     */
    omit?: EmailLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailLogInclude<ExtArgs> | null
    /**
     * Filter, which EmailLog to fetch.
     */
    where: EmailLogWhereUniqueInput
  }

  /**
   * EmailLog findFirst
   */
  export type EmailLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailLog
     */
    select?: EmailLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailLog
     */
    omit?: EmailLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailLogInclude<ExtArgs> | null
    /**
     * Filter, which EmailLog to fetch.
     */
    where?: EmailLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailLogs to fetch.
     */
    orderBy?: EmailLogOrderByWithRelationInput | EmailLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailLogs.
     */
    cursor?: EmailLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailLogs.
     */
    distinct?: EmailLogScalarFieldEnum | EmailLogScalarFieldEnum[]
  }

  /**
   * EmailLog findFirstOrThrow
   */
  export type EmailLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailLog
     */
    select?: EmailLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailLog
     */
    omit?: EmailLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailLogInclude<ExtArgs> | null
    /**
     * Filter, which EmailLog to fetch.
     */
    where?: EmailLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailLogs to fetch.
     */
    orderBy?: EmailLogOrderByWithRelationInput | EmailLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailLogs.
     */
    cursor?: EmailLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailLogs.
     */
    distinct?: EmailLogScalarFieldEnum | EmailLogScalarFieldEnum[]
  }

  /**
   * EmailLog findMany
   */
  export type EmailLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailLog
     */
    select?: EmailLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailLog
     */
    omit?: EmailLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailLogInclude<ExtArgs> | null
    /**
     * Filter, which EmailLogs to fetch.
     */
    where?: EmailLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailLogs to fetch.
     */
    orderBy?: EmailLogOrderByWithRelationInput | EmailLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailLogs.
     */
    cursor?: EmailLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailLogs.
     */
    skip?: number
    distinct?: EmailLogScalarFieldEnum | EmailLogScalarFieldEnum[]
  }

  /**
   * EmailLog create
   */
  export type EmailLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailLog
     */
    select?: EmailLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailLog
     */
    omit?: EmailLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailLogInclude<ExtArgs> | null
    /**
     * The data needed to create a EmailLog.
     */
    data: XOR<EmailLogCreateInput, EmailLogUncheckedCreateInput>
  }

  /**
   * EmailLog createMany
   */
  export type EmailLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailLogs.
     */
    data: EmailLogCreateManyInput | EmailLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailLog createManyAndReturn
   */
  export type EmailLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailLog
     */
    select?: EmailLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailLog
     */
    omit?: EmailLogOmit<ExtArgs> | null
    /**
     * The data used to create many EmailLogs.
     */
    data: EmailLogCreateManyInput | EmailLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailLog update
   */
  export type EmailLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailLog
     */
    select?: EmailLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailLog
     */
    omit?: EmailLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailLogInclude<ExtArgs> | null
    /**
     * The data needed to update a EmailLog.
     */
    data: XOR<EmailLogUpdateInput, EmailLogUncheckedUpdateInput>
    /**
     * Choose, which EmailLog to update.
     */
    where: EmailLogWhereUniqueInput
  }

  /**
   * EmailLog updateMany
   */
  export type EmailLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailLogs.
     */
    data: XOR<EmailLogUpdateManyMutationInput, EmailLogUncheckedUpdateManyInput>
    /**
     * Filter which EmailLogs to update
     */
    where?: EmailLogWhereInput
    /**
     * Limit how many EmailLogs to update.
     */
    limit?: number
  }

  /**
   * EmailLog updateManyAndReturn
   */
  export type EmailLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailLog
     */
    select?: EmailLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailLog
     */
    omit?: EmailLogOmit<ExtArgs> | null
    /**
     * The data used to update EmailLogs.
     */
    data: XOR<EmailLogUpdateManyMutationInput, EmailLogUncheckedUpdateManyInput>
    /**
     * Filter which EmailLogs to update
     */
    where?: EmailLogWhereInput
    /**
     * Limit how many EmailLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailLog upsert
   */
  export type EmailLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailLog
     */
    select?: EmailLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailLog
     */
    omit?: EmailLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailLogInclude<ExtArgs> | null
    /**
     * The filter to search for the EmailLog to update in case it exists.
     */
    where: EmailLogWhereUniqueInput
    /**
     * In case the EmailLog found by the `where` argument doesn't exist, create a new EmailLog with this data.
     */
    create: XOR<EmailLogCreateInput, EmailLogUncheckedCreateInput>
    /**
     * In case the EmailLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailLogUpdateInput, EmailLogUncheckedUpdateInput>
  }

  /**
   * EmailLog delete
   */
  export type EmailLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailLog
     */
    select?: EmailLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailLog
     */
    omit?: EmailLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailLogInclude<ExtArgs> | null
    /**
     * Filter which EmailLog to delete.
     */
    where: EmailLogWhereUniqueInput
  }

  /**
   * EmailLog deleteMany
   */
  export type EmailLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailLogs to delete
     */
    where?: EmailLogWhereInput
    /**
     * Limit how many EmailLogs to delete.
     */
    limit?: number
  }

  /**
   * EmailLog without action
   */
  export type EmailLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailLog
     */
    select?: EmailLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailLog
     */
    omit?: EmailLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailLogInclude<ExtArgs> | null
  }


  /**
   * Model VideoJob
   */

  export type AggregateVideoJob = {
    _count: VideoJobCountAggregateOutputType | null
    _min: VideoJobMinAggregateOutputType | null
    _max: VideoJobMaxAggregateOutputType | null
  }

  export type VideoJobMinAggregateOutputType = {
    id: string | null
    userId: string | null
    status: string | null
    videoUrl: string | null
    prompt: string | null
    createdAt: Date | null
  }

  export type VideoJobMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    status: string | null
    videoUrl: string | null
    prompt: string | null
    createdAt: Date | null
  }

  export type VideoJobCountAggregateOutputType = {
    id: number
    userId: number
    status: number
    videoUrl: number
    prompt: number
    settings: number
    createdAt: number
    _all: number
  }


  export type VideoJobMinAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    videoUrl?: true
    prompt?: true
    createdAt?: true
  }

  export type VideoJobMaxAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    videoUrl?: true
    prompt?: true
    createdAt?: true
  }

  export type VideoJobCountAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    videoUrl?: true
    prompt?: true
    settings?: true
    createdAt?: true
    _all?: true
  }

  export type VideoJobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VideoJob to aggregate.
     */
    where?: VideoJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoJobs to fetch.
     */
    orderBy?: VideoJobOrderByWithRelationInput | VideoJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VideoJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VideoJobs
    **/
    _count?: true | VideoJobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VideoJobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VideoJobMaxAggregateInputType
  }

  export type GetVideoJobAggregateType<T extends VideoJobAggregateArgs> = {
        [P in keyof T & keyof AggregateVideoJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVideoJob[P]>
      : GetScalarType<T[P], AggregateVideoJob[P]>
  }




  export type VideoJobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoJobWhereInput
    orderBy?: VideoJobOrderByWithAggregationInput | VideoJobOrderByWithAggregationInput[]
    by: VideoJobScalarFieldEnum[] | VideoJobScalarFieldEnum
    having?: VideoJobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VideoJobCountAggregateInputType | true
    _min?: VideoJobMinAggregateInputType
    _max?: VideoJobMaxAggregateInputType
  }

  export type VideoJobGroupByOutputType = {
    id: string
    userId: string
    status: string
    videoUrl: string | null
    prompt: string | null
    settings: JsonValue | null
    createdAt: Date
    _count: VideoJobCountAggregateOutputType | null
    _min: VideoJobMinAggregateOutputType | null
    _max: VideoJobMaxAggregateOutputType | null
  }

  type GetVideoJobGroupByPayload<T extends VideoJobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VideoJobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VideoJobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VideoJobGroupByOutputType[P]>
            : GetScalarType<T[P], VideoJobGroupByOutputType[P]>
        }
      >
    >


  export type VideoJobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    status?: boolean
    videoUrl?: boolean
    prompt?: boolean
    settings?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["videoJob"]>

  export type VideoJobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    status?: boolean
    videoUrl?: boolean
    prompt?: boolean
    settings?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["videoJob"]>

  export type VideoJobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    status?: boolean
    videoUrl?: boolean
    prompt?: boolean
    settings?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["videoJob"]>

  export type VideoJobSelectScalar = {
    id?: boolean
    userId?: boolean
    status?: boolean
    videoUrl?: boolean
    prompt?: boolean
    settings?: boolean
    createdAt?: boolean
  }

  export type VideoJobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "status" | "videoUrl" | "prompt" | "settings" | "createdAt", ExtArgs["result"]["videoJob"]>
  export type VideoJobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type VideoJobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type VideoJobIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $VideoJobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VideoJob"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      status: string
      videoUrl: string | null
      prompt: string | null
      settings: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["videoJob"]>
    composites: {}
  }

  type VideoJobGetPayload<S extends boolean | null | undefined | VideoJobDefaultArgs> = $Result.GetResult<Prisma.$VideoJobPayload, S>

  type VideoJobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VideoJobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VideoJobCountAggregateInputType | true
    }

  export interface VideoJobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VideoJob'], meta: { name: 'VideoJob' } }
    /**
     * Find zero or one VideoJob that matches the filter.
     * @param {VideoJobFindUniqueArgs} args - Arguments to find a VideoJob
     * @example
     * // Get one VideoJob
     * const videoJob = await prisma.videoJob.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VideoJobFindUniqueArgs>(args: SelectSubset<T, VideoJobFindUniqueArgs<ExtArgs>>): Prisma__VideoJobClient<$Result.GetResult<Prisma.$VideoJobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VideoJob that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VideoJobFindUniqueOrThrowArgs} args - Arguments to find a VideoJob
     * @example
     * // Get one VideoJob
     * const videoJob = await prisma.videoJob.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VideoJobFindUniqueOrThrowArgs>(args: SelectSubset<T, VideoJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VideoJobClient<$Result.GetResult<Prisma.$VideoJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VideoJob that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoJobFindFirstArgs} args - Arguments to find a VideoJob
     * @example
     * // Get one VideoJob
     * const videoJob = await prisma.videoJob.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VideoJobFindFirstArgs>(args?: SelectSubset<T, VideoJobFindFirstArgs<ExtArgs>>): Prisma__VideoJobClient<$Result.GetResult<Prisma.$VideoJobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VideoJob that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoJobFindFirstOrThrowArgs} args - Arguments to find a VideoJob
     * @example
     * // Get one VideoJob
     * const videoJob = await prisma.videoJob.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VideoJobFindFirstOrThrowArgs>(args?: SelectSubset<T, VideoJobFindFirstOrThrowArgs<ExtArgs>>): Prisma__VideoJobClient<$Result.GetResult<Prisma.$VideoJobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VideoJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoJobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VideoJobs
     * const videoJobs = await prisma.videoJob.findMany()
     * 
     * // Get first 10 VideoJobs
     * const videoJobs = await prisma.videoJob.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const videoJobWithIdOnly = await prisma.videoJob.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VideoJobFindManyArgs>(args?: SelectSubset<T, VideoJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VideoJob.
     * @param {VideoJobCreateArgs} args - Arguments to create a VideoJob.
     * @example
     * // Create one VideoJob
     * const VideoJob = await prisma.videoJob.create({
     *   data: {
     *     // ... data to create a VideoJob
     *   }
     * })
     * 
     */
    create<T extends VideoJobCreateArgs>(args: SelectSubset<T, VideoJobCreateArgs<ExtArgs>>): Prisma__VideoJobClient<$Result.GetResult<Prisma.$VideoJobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VideoJobs.
     * @param {VideoJobCreateManyArgs} args - Arguments to create many VideoJobs.
     * @example
     * // Create many VideoJobs
     * const videoJob = await prisma.videoJob.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VideoJobCreateManyArgs>(args?: SelectSubset<T, VideoJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VideoJobs and returns the data saved in the database.
     * @param {VideoJobCreateManyAndReturnArgs} args - Arguments to create many VideoJobs.
     * @example
     * // Create many VideoJobs
     * const videoJob = await prisma.videoJob.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VideoJobs and only return the `id`
     * const videoJobWithIdOnly = await prisma.videoJob.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VideoJobCreateManyAndReturnArgs>(args?: SelectSubset<T, VideoJobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoJobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VideoJob.
     * @param {VideoJobDeleteArgs} args - Arguments to delete one VideoJob.
     * @example
     * // Delete one VideoJob
     * const VideoJob = await prisma.videoJob.delete({
     *   where: {
     *     // ... filter to delete one VideoJob
     *   }
     * })
     * 
     */
    delete<T extends VideoJobDeleteArgs>(args: SelectSubset<T, VideoJobDeleteArgs<ExtArgs>>): Prisma__VideoJobClient<$Result.GetResult<Prisma.$VideoJobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VideoJob.
     * @param {VideoJobUpdateArgs} args - Arguments to update one VideoJob.
     * @example
     * // Update one VideoJob
     * const videoJob = await prisma.videoJob.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VideoJobUpdateArgs>(args: SelectSubset<T, VideoJobUpdateArgs<ExtArgs>>): Prisma__VideoJobClient<$Result.GetResult<Prisma.$VideoJobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VideoJobs.
     * @param {VideoJobDeleteManyArgs} args - Arguments to filter VideoJobs to delete.
     * @example
     * // Delete a few VideoJobs
     * const { count } = await prisma.videoJob.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VideoJobDeleteManyArgs>(args?: SelectSubset<T, VideoJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VideoJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoJobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VideoJobs
     * const videoJob = await prisma.videoJob.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VideoJobUpdateManyArgs>(args: SelectSubset<T, VideoJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VideoJobs and returns the data updated in the database.
     * @param {VideoJobUpdateManyAndReturnArgs} args - Arguments to update many VideoJobs.
     * @example
     * // Update many VideoJobs
     * const videoJob = await prisma.videoJob.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VideoJobs and only return the `id`
     * const videoJobWithIdOnly = await prisma.videoJob.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VideoJobUpdateManyAndReturnArgs>(args: SelectSubset<T, VideoJobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoJobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VideoJob.
     * @param {VideoJobUpsertArgs} args - Arguments to update or create a VideoJob.
     * @example
     * // Update or create a VideoJob
     * const videoJob = await prisma.videoJob.upsert({
     *   create: {
     *     // ... data to create a VideoJob
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VideoJob we want to update
     *   }
     * })
     */
    upsert<T extends VideoJobUpsertArgs>(args: SelectSubset<T, VideoJobUpsertArgs<ExtArgs>>): Prisma__VideoJobClient<$Result.GetResult<Prisma.$VideoJobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VideoJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoJobCountArgs} args - Arguments to filter VideoJobs to count.
     * @example
     * // Count the number of VideoJobs
     * const count = await prisma.videoJob.count({
     *   where: {
     *     // ... the filter for the VideoJobs we want to count
     *   }
     * })
    **/
    count<T extends VideoJobCountArgs>(
      args?: Subset<T, VideoJobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VideoJobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VideoJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoJobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VideoJobAggregateArgs>(args: Subset<T, VideoJobAggregateArgs>): Prisma.PrismaPromise<GetVideoJobAggregateType<T>>

    /**
     * Group by VideoJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoJobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VideoJobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VideoJobGroupByArgs['orderBy'] }
        : { orderBy?: VideoJobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VideoJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVideoJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VideoJob model
   */
  readonly fields: VideoJobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VideoJob.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VideoJobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VideoJob model
   */
  interface VideoJobFieldRefs {
    readonly id: FieldRef<"VideoJob", 'String'>
    readonly userId: FieldRef<"VideoJob", 'String'>
    readonly status: FieldRef<"VideoJob", 'String'>
    readonly videoUrl: FieldRef<"VideoJob", 'String'>
    readonly prompt: FieldRef<"VideoJob", 'String'>
    readonly settings: FieldRef<"VideoJob", 'Json'>
    readonly createdAt: FieldRef<"VideoJob", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VideoJob findUnique
   */
  export type VideoJobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoJob
     */
    select?: VideoJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoJob
     */
    omit?: VideoJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoJobInclude<ExtArgs> | null
    /**
     * Filter, which VideoJob to fetch.
     */
    where: VideoJobWhereUniqueInput
  }

  /**
   * VideoJob findUniqueOrThrow
   */
  export type VideoJobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoJob
     */
    select?: VideoJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoJob
     */
    omit?: VideoJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoJobInclude<ExtArgs> | null
    /**
     * Filter, which VideoJob to fetch.
     */
    where: VideoJobWhereUniqueInput
  }

  /**
   * VideoJob findFirst
   */
  export type VideoJobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoJob
     */
    select?: VideoJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoJob
     */
    omit?: VideoJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoJobInclude<ExtArgs> | null
    /**
     * Filter, which VideoJob to fetch.
     */
    where?: VideoJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoJobs to fetch.
     */
    orderBy?: VideoJobOrderByWithRelationInput | VideoJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VideoJobs.
     */
    cursor?: VideoJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VideoJobs.
     */
    distinct?: VideoJobScalarFieldEnum | VideoJobScalarFieldEnum[]
  }

  /**
   * VideoJob findFirstOrThrow
   */
  export type VideoJobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoJob
     */
    select?: VideoJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoJob
     */
    omit?: VideoJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoJobInclude<ExtArgs> | null
    /**
     * Filter, which VideoJob to fetch.
     */
    where?: VideoJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoJobs to fetch.
     */
    orderBy?: VideoJobOrderByWithRelationInput | VideoJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VideoJobs.
     */
    cursor?: VideoJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VideoJobs.
     */
    distinct?: VideoJobScalarFieldEnum | VideoJobScalarFieldEnum[]
  }

  /**
   * VideoJob findMany
   */
  export type VideoJobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoJob
     */
    select?: VideoJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoJob
     */
    omit?: VideoJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoJobInclude<ExtArgs> | null
    /**
     * Filter, which VideoJobs to fetch.
     */
    where?: VideoJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoJobs to fetch.
     */
    orderBy?: VideoJobOrderByWithRelationInput | VideoJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VideoJobs.
     */
    cursor?: VideoJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoJobs.
     */
    skip?: number
    distinct?: VideoJobScalarFieldEnum | VideoJobScalarFieldEnum[]
  }

  /**
   * VideoJob create
   */
  export type VideoJobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoJob
     */
    select?: VideoJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoJob
     */
    omit?: VideoJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoJobInclude<ExtArgs> | null
    /**
     * The data needed to create a VideoJob.
     */
    data: XOR<VideoJobCreateInput, VideoJobUncheckedCreateInput>
  }

  /**
   * VideoJob createMany
   */
  export type VideoJobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VideoJobs.
     */
    data: VideoJobCreateManyInput | VideoJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VideoJob createManyAndReturn
   */
  export type VideoJobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoJob
     */
    select?: VideoJobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VideoJob
     */
    omit?: VideoJobOmit<ExtArgs> | null
    /**
     * The data used to create many VideoJobs.
     */
    data: VideoJobCreateManyInput | VideoJobCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoJobIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VideoJob update
   */
  export type VideoJobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoJob
     */
    select?: VideoJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoJob
     */
    omit?: VideoJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoJobInclude<ExtArgs> | null
    /**
     * The data needed to update a VideoJob.
     */
    data: XOR<VideoJobUpdateInput, VideoJobUncheckedUpdateInput>
    /**
     * Choose, which VideoJob to update.
     */
    where: VideoJobWhereUniqueInput
  }

  /**
   * VideoJob updateMany
   */
  export type VideoJobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VideoJobs.
     */
    data: XOR<VideoJobUpdateManyMutationInput, VideoJobUncheckedUpdateManyInput>
    /**
     * Filter which VideoJobs to update
     */
    where?: VideoJobWhereInput
    /**
     * Limit how many VideoJobs to update.
     */
    limit?: number
  }

  /**
   * VideoJob updateManyAndReturn
   */
  export type VideoJobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoJob
     */
    select?: VideoJobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VideoJob
     */
    omit?: VideoJobOmit<ExtArgs> | null
    /**
     * The data used to update VideoJobs.
     */
    data: XOR<VideoJobUpdateManyMutationInput, VideoJobUncheckedUpdateManyInput>
    /**
     * Filter which VideoJobs to update
     */
    where?: VideoJobWhereInput
    /**
     * Limit how many VideoJobs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoJobIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VideoJob upsert
   */
  export type VideoJobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoJob
     */
    select?: VideoJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoJob
     */
    omit?: VideoJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoJobInclude<ExtArgs> | null
    /**
     * The filter to search for the VideoJob to update in case it exists.
     */
    where: VideoJobWhereUniqueInput
    /**
     * In case the VideoJob found by the `where` argument doesn't exist, create a new VideoJob with this data.
     */
    create: XOR<VideoJobCreateInput, VideoJobUncheckedCreateInput>
    /**
     * In case the VideoJob was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VideoJobUpdateInput, VideoJobUncheckedUpdateInput>
  }

  /**
   * VideoJob delete
   */
  export type VideoJobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoJob
     */
    select?: VideoJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoJob
     */
    omit?: VideoJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoJobInclude<ExtArgs> | null
    /**
     * Filter which VideoJob to delete.
     */
    where: VideoJobWhereUniqueInput
  }

  /**
   * VideoJob deleteMany
   */
  export type VideoJobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VideoJobs to delete
     */
    where?: VideoJobWhereInput
    /**
     * Limit how many VideoJobs to delete.
     */
    limit?: number
  }

  /**
   * VideoJob without action
   */
  export type VideoJobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoJob
     */
    select?: VideoJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoJob
     */
    omit?: VideoJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoJobInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    status: string | null
    createdAt: Date | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    status: string | null
    createdAt: Date | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    status: number
    createdAt: number
    _all: number
  }


  export type TaskMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    status?: true
    createdAt?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    status?: true
    createdAt?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    userId: string
    type: string
    status: string
    createdAt: Date
    _count: TaskCountAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "status" | "createdAt", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      status: string
      createdAt: Date
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly userId: FieldRef<"Task", 'String'>
    readonly type: FieldRef<"Task", 'String'>
    readonly status: FieldRef<"Task", 'String'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model PulseEvent
   */

  export type AggregatePulseEvent = {
    _count: PulseEventCountAggregateOutputType | null
    _min: PulseEventMinAggregateOutputType | null
    _max: PulseEventMaxAggregateOutputType | null
  }

  export type PulseEventMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    message: string | null
    type: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type PulseEventMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    message: string | null
    type: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type PulseEventCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    message: number
    type: number
    isRead: number
    createdAt: number
    _all: number
  }


  export type PulseEventMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    isRead?: true
    createdAt?: true
  }

  export type PulseEventMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    isRead?: true
    createdAt?: true
  }

  export type PulseEventCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    isRead?: true
    createdAt?: true
    _all?: true
  }

  export type PulseEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PulseEvent to aggregate.
     */
    where?: PulseEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PulseEvents to fetch.
     */
    orderBy?: PulseEventOrderByWithRelationInput | PulseEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PulseEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PulseEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PulseEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PulseEvents
    **/
    _count?: true | PulseEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PulseEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PulseEventMaxAggregateInputType
  }

  export type GetPulseEventAggregateType<T extends PulseEventAggregateArgs> = {
        [P in keyof T & keyof AggregatePulseEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePulseEvent[P]>
      : GetScalarType<T[P], AggregatePulseEvent[P]>
  }




  export type PulseEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PulseEventWhereInput
    orderBy?: PulseEventOrderByWithAggregationInput | PulseEventOrderByWithAggregationInput[]
    by: PulseEventScalarFieldEnum[] | PulseEventScalarFieldEnum
    having?: PulseEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PulseEventCountAggregateInputType | true
    _min?: PulseEventMinAggregateInputType
    _max?: PulseEventMaxAggregateInputType
  }

  export type PulseEventGroupByOutputType = {
    id: string
    userId: string
    title: string
    message: string
    type: string
    isRead: boolean
    createdAt: Date
    _count: PulseEventCountAggregateOutputType | null
    _min: PulseEventMinAggregateOutputType | null
    _max: PulseEventMaxAggregateOutputType | null
  }

  type GetPulseEventGroupByPayload<T extends PulseEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PulseEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PulseEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PulseEventGroupByOutputType[P]>
            : GetScalarType<T[P], PulseEventGroupByOutputType[P]>
        }
      >
    >


  export type PulseEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["pulseEvent"]>

  export type PulseEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["pulseEvent"]>

  export type PulseEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["pulseEvent"]>

  export type PulseEventSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    createdAt?: boolean
  }

  export type PulseEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "message" | "type" | "isRead" | "createdAt", ExtArgs["result"]["pulseEvent"]>

  export type $PulseEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PulseEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      message: string
      type: string
      isRead: boolean
      createdAt: Date
    }, ExtArgs["result"]["pulseEvent"]>
    composites: {}
  }

  type PulseEventGetPayload<S extends boolean | null | undefined | PulseEventDefaultArgs> = $Result.GetResult<Prisma.$PulseEventPayload, S>

  type PulseEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PulseEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PulseEventCountAggregateInputType | true
    }

  export interface PulseEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PulseEvent'], meta: { name: 'PulseEvent' } }
    /**
     * Find zero or one PulseEvent that matches the filter.
     * @param {PulseEventFindUniqueArgs} args - Arguments to find a PulseEvent
     * @example
     * // Get one PulseEvent
     * const pulseEvent = await prisma.pulseEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PulseEventFindUniqueArgs>(args: SelectSubset<T, PulseEventFindUniqueArgs<ExtArgs>>): Prisma__PulseEventClient<$Result.GetResult<Prisma.$PulseEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PulseEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PulseEventFindUniqueOrThrowArgs} args - Arguments to find a PulseEvent
     * @example
     * // Get one PulseEvent
     * const pulseEvent = await prisma.pulseEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PulseEventFindUniqueOrThrowArgs>(args: SelectSubset<T, PulseEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PulseEventClient<$Result.GetResult<Prisma.$PulseEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PulseEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PulseEventFindFirstArgs} args - Arguments to find a PulseEvent
     * @example
     * // Get one PulseEvent
     * const pulseEvent = await prisma.pulseEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PulseEventFindFirstArgs>(args?: SelectSubset<T, PulseEventFindFirstArgs<ExtArgs>>): Prisma__PulseEventClient<$Result.GetResult<Prisma.$PulseEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PulseEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PulseEventFindFirstOrThrowArgs} args - Arguments to find a PulseEvent
     * @example
     * // Get one PulseEvent
     * const pulseEvent = await prisma.pulseEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PulseEventFindFirstOrThrowArgs>(args?: SelectSubset<T, PulseEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__PulseEventClient<$Result.GetResult<Prisma.$PulseEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PulseEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PulseEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PulseEvents
     * const pulseEvents = await prisma.pulseEvent.findMany()
     * 
     * // Get first 10 PulseEvents
     * const pulseEvents = await prisma.pulseEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pulseEventWithIdOnly = await prisma.pulseEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PulseEventFindManyArgs>(args?: SelectSubset<T, PulseEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PulseEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PulseEvent.
     * @param {PulseEventCreateArgs} args - Arguments to create a PulseEvent.
     * @example
     * // Create one PulseEvent
     * const PulseEvent = await prisma.pulseEvent.create({
     *   data: {
     *     // ... data to create a PulseEvent
     *   }
     * })
     * 
     */
    create<T extends PulseEventCreateArgs>(args: SelectSubset<T, PulseEventCreateArgs<ExtArgs>>): Prisma__PulseEventClient<$Result.GetResult<Prisma.$PulseEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PulseEvents.
     * @param {PulseEventCreateManyArgs} args - Arguments to create many PulseEvents.
     * @example
     * // Create many PulseEvents
     * const pulseEvent = await prisma.pulseEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PulseEventCreateManyArgs>(args?: SelectSubset<T, PulseEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PulseEvents and returns the data saved in the database.
     * @param {PulseEventCreateManyAndReturnArgs} args - Arguments to create many PulseEvents.
     * @example
     * // Create many PulseEvents
     * const pulseEvent = await prisma.pulseEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PulseEvents and only return the `id`
     * const pulseEventWithIdOnly = await prisma.pulseEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PulseEventCreateManyAndReturnArgs>(args?: SelectSubset<T, PulseEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PulseEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PulseEvent.
     * @param {PulseEventDeleteArgs} args - Arguments to delete one PulseEvent.
     * @example
     * // Delete one PulseEvent
     * const PulseEvent = await prisma.pulseEvent.delete({
     *   where: {
     *     // ... filter to delete one PulseEvent
     *   }
     * })
     * 
     */
    delete<T extends PulseEventDeleteArgs>(args: SelectSubset<T, PulseEventDeleteArgs<ExtArgs>>): Prisma__PulseEventClient<$Result.GetResult<Prisma.$PulseEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PulseEvent.
     * @param {PulseEventUpdateArgs} args - Arguments to update one PulseEvent.
     * @example
     * // Update one PulseEvent
     * const pulseEvent = await prisma.pulseEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PulseEventUpdateArgs>(args: SelectSubset<T, PulseEventUpdateArgs<ExtArgs>>): Prisma__PulseEventClient<$Result.GetResult<Prisma.$PulseEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PulseEvents.
     * @param {PulseEventDeleteManyArgs} args - Arguments to filter PulseEvents to delete.
     * @example
     * // Delete a few PulseEvents
     * const { count } = await prisma.pulseEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PulseEventDeleteManyArgs>(args?: SelectSubset<T, PulseEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PulseEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PulseEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PulseEvents
     * const pulseEvent = await prisma.pulseEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PulseEventUpdateManyArgs>(args: SelectSubset<T, PulseEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PulseEvents and returns the data updated in the database.
     * @param {PulseEventUpdateManyAndReturnArgs} args - Arguments to update many PulseEvents.
     * @example
     * // Update many PulseEvents
     * const pulseEvent = await prisma.pulseEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PulseEvents and only return the `id`
     * const pulseEventWithIdOnly = await prisma.pulseEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PulseEventUpdateManyAndReturnArgs>(args: SelectSubset<T, PulseEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PulseEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PulseEvent.
     * @param {PulseEventUpsertArgs} args - Arguments to update or create a PulseEvent.
     * @example
     * // Update or create a PulseEvent
     * const pulseEvent = await prisma.pulseEvent.upsert({
     *   create: {
     *     // ... data to create a PulseEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PulseEvent we want to update
     *   }
     * })
     */
    upsert<T extends PulseEventUpsertArgs>(args: SelectSubset<T, PulseEventUpsertArgs<ExtArgs>>): Prisma__PulseEventClient<$Result.GetResult<Prisma.$PulseEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PulseEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PulseEventCountArgs} args - Arguments to filter PulseEvents to count.
     * @example
     * // Count the number of PulseEvents
     * const count = await prisma.pulseEvent.count({
     *   where: {
     *     // ... the filter for the PulseEvents we want to count
     *   }
     * })
    **/
    count<T extends PulseEventCountArgs>(
      args?: Subset<T, PulseEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PulseEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PulseEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PulseEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PulseEventAggregateArgs>(args: Subset<T, PulseEventAggregateArgs>): Prisma.PrismaPromise<GetPulseEventAggregateType<T>>

    /**
     * Group by PulseEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PulseEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PulseEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PulseEventGroupByArgs['orderBy'] }
        : { orderBy?: PulseEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PulseEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPulseEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PulseEvent model
   */
  readonly fields: PulseEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PulseEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PulseEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PulseEvent model
   */
  interface PulseEventFieldRefs {
    readonly id: FieldRef<"PulseEvent", 'String'>
    readonly userId: FieldRef<"PulseEvent", 'String'>
    readonly title: FieldRef<"PulseEvent", 'String'>
    readonly message: FieldRef<"PulseEvent", 'String'>
    readonly type: FieldRef<"PulseEvent", 'String'>
    readonly isRead: FieldRef<"PulseEvent", 'Boolean'>
    readonly createdAt: FieldRef<"PulseEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PulseEvent findUnique
   */
  export type PulseEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PulseEvent
     */
    select?: PulseEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PulseEvent
     */
    omit?: PulseEventOmit<ExtArgs> | null
    /**
     * Filter, which PulseEvent to fetch.
     */
    where: PulseEventWhereUniqueInput
  }

  /**
   * PulseEvent findUniqueOrThrow
   */
  export type PulseEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PulseEvent
     */
    select?: PulseEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PulseEvent
     */
    omit?: PulseEventOmit<ExtArgs> | null
    /**
     * Filter, which PulseEvent to fetch.
     */
    where: PulseEventWhereUniqueInput
  }

  /**
   * PulseEvent findFirst
   */
  export type PulseEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PulseEvent
     */
    select?: PulseEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PulseEvent
     */
    omit?: PulseEventOmit<ExtArgs> | null
    /**
     * Filter, which PulseEvent to fetch.
     */
    where?: PulseEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PulseEvents to fetch.
     */
    orderBy?: PulseEventOrderByWithRelationInput | PulseEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PulseEvents.
     */
    cursor?: PulseEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PulseEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PulseEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PulseEvents.
     */
    distinct?: PulseEventScalarFieldEnum | PulseEventScalarFieldEnum[]
  }

  /**
   * PulseEvent findFirstOrThrow
   */
  export type PulseEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PulseEvent
     */
    select?: PulseEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PulseEvent
     */
    omit?: PulseEventOmit<ExtArgs> | null
    /**
     * Filter, which PulseEvent to fetch.
     */
    where?: PulseEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PulseEvents to fetch.
     */
    orderBy?: PulseEventOrderByWithRelationInput | PulseEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PulseEvents.
     */
    cursor?: PulseEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PulseEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PulseEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PulseEvents.
     */
    distinct?: PulseEventScalarFieldEnum | PulseEventScalarFieldEnum[]
  }

  /**
   * PulseEvent findMany
   */
  export type PulseEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PulseEvent
     */
    select?: PulseEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PulseEvent
     */
    omit?: PulseEventOmit<ExtArgs> | null
    /**
     * Filter, which PulseEvents to fetch.
     */
    where?: PulseEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PulseEvents to fetch.
     */
    orderBy?: PulseEventOrderByWithRelationInput | PulseEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PulseEvents.
     */
    cursor?: PulseEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PulseEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PulseEvents.
     */
    skip?: number
    distinct?: PulseEventScalarFieldEnum | PulseEventScalarFieldEnum[]
  }

  /**
   * PulseEvent create
   */
  export type PulseEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PulseEvent
     */
    select?: PulseEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PulseEvent
     */
    omit?: PulseEventOmit<ExtArgs> | null
    /**
     * The data needed to create a PulseEvent.
     */
    data: XOR<PulseEventCreateInput, PulseEventUncheckedCreateInput>
  }

  /**
   * PulseEvent createMany
   */
  export type PulseEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PulseEvents.
     */
    data: PulseEventCreateManyInput | PulseEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PulseEvent createManyAndReturn
   */
  export type PulseEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PulseEvent
     */
    select?: PulseEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PulseEvent
     */
    omit?: PulseEventOmit<ExtArgs> | null
    /**
     * The data used to create many PulseEvents.
     */
    data: PulseEventCreateManyInput | PulseEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PulseEvent update
   */
  export type PulseEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PulseEvent
     */
    select?: PulseEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PulseEvent
     */
    omit?: PulseEventOmit<ExtArgs> | null
    /**
     * The data needed to update a PulseEvent.
     */
    data: XOR<PulseEventUpdateInput, PulseEventUncheckedUpdateInput>
    /**
     * Choose, which PulseEvent to update.
     */
    where: PulseEventWhereUniqueInput
  }

  /**
   * PulseEvent updateMany
   */
  export type PulseEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PulseEvents.
     */
    data: XOR<PulseEventUpdateManyMutationInput, PulseEventUncheckedUpdateManyInput>
    /**
     * Filter which PulseEvents to update
     */
    where?: PulseEventWhereInput
    /**
     * Limit how many PulseEvents to update.
     */
    limit?: number
  }

  /**
   * PulseEvent updateManyAndReturn
   */
  export type PulseEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PulseEvent
     */
    select?: PulseEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PulseEvent
     */
    omit?: PulseEventOmit<ExtArgs> | null
    /**
     * The data used to update PulseEvents.
     */
    data: XOR<PulseEventUpdateManyMutationInput, PulseEventUncheckedUpdateManyInput>
    /**
     * Filter which PulseEvents to update
     */
    where?: PulseEventWhereInput
    /**
     * Limit how many PulseEvents to update.
     */
    limit?: number
  }

  /**
   * PulseEvent upsert
   */
  export type PulseEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PulseEvent
     */
    select?: PulseEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PulseEvent
     */
    omit?: PulseEventOmit<ExtArgs> | null
    /**
     * The filter to search for the PulseEvent to update in case it exists.
     */
    where: PulseEventWhereUniqueInput
    /**
     * In case the PulseEvent found by the `where` argument doesn't exist, create a new PulseEvent with this data.
     */
    create: XOR<PulseEventCreateInput, PulseEventUncheckedCreateInput>
    /**
     * In case the PulseEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PulseEventUpdateInput, PulseEventUncheckedUpdateInput>
  }

  /**
   * PulseEvent delete
   */
  export type PulseEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PulseEvent
     */
    select?: PulseEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PulseEvent
     */
    omit?: PulseEventOmit<ExtArgs> | null
    /**
     * Filter which PulseEvent to delete.
     */
    where: PulseEventWhereUniqueInput
  }

  /**
   * PulseEvent deleteMany
   */
  export type PulseEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PulseEvents to delete
     */
    where?: PulseEventWhereInput
    /**
     * Limit how many PulseEvents to delete.
     */
    limit?: number
  }

  /**
   * PulseEvent without action
   */
  export type PulseEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PulseEvent
     */
    select?: PulseEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PulseEvent
     */
    omit?: PulseEventOmit<ExtArgs> | null
  }


  /**
   * Model InboxMessage
   */

  export type AggregateInboxMessage = {
    _count: InboxMessageCountAggregateOutputType | null
    _min: InboxMessageMinAggregateOutputType | null
    _max: InboxMessageMaxAggregateOutputType | null
  }

  export type InboxMessageMinAggregateOutputType = {
    id: string | null
    userId: string | null
    sender: string | null
    subject: string | null
    body: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type InboxMessageMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    sender: string | null
    subject: string | null
    body: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type InboxMessageCountAggregateOutputType = {
    id: number
    userId: number
    sender: number
    subject: number
    body: number
    isRead: number
    createdAt: number
    _all: number
  }


  export type InboxMessageMinAggregateInputType = {
    id?: true
    userId?: true
    sender?: true
    subject?: true
    body?: true
    isRead?: true
    createdAt?: true
  }

  export type InboxMessageMaxAggregateInputType = {
    id?: true
    userId?: true
    sender?: true
    subject?: true
    body?: true
    isRead?: true
    createdAt?: true
  }

  export type InboxMessageCountAggregateInputType = {
    id?: true
    userId?: true
    sender?: true
    subject?: true
    body?: true
    isRead?: true
    createdAt?: true
    _all?: true
  }

  export type InboxMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InboxMessage to aggregate.
     */
    where?: InboxMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InboxMessages to fetch.
     */
    orderBy?: InboxMessageOrderByWithRelationInput | InboxMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InboxMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InboxMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InboxMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InboxMessages
    **/
    _count?: true | InboxMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InboxMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InboxMessageMaxAggregateInputType
  }

  export type GetInboxMessageAggregateType<T extends InboxMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateInboxMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInboxMessage[P]>
      : GetScalarType<T[P], AggregateInboxMessage[P]>
  }




  export type InboxMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InboxMessageWhereInput
    orderBy?: InboxMessageOrderByWithAggregationInput | InboxMessageOrderByWithAggregationInput[]
    by: InboxMessageScalarFieldEnum[] | InboxMessageScalarFieldEnum
    having?: InboxMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InboxMessageCountAggregateInputType | true
    _min?: InboxMessageMinAggregateInputType
    _max?: InboxMessageMaxAggregateInputType
  }

  export type InboxMessageGroupByOutputType = {
    id: string
    userId: string
    sender: string
    subject: string
    body: string
    isRead: boolean
    createdAt: Date
    _count: InboxMessageCountAggregateOutputType | null
    _min: InboxMessageMinAggregateOutputType | null
    _max: InboxMessageMaxAggregateOutputType | null
  }

  type GetInboxMessageGroupByPayload<T extends InboxMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InboxMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InboxMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InboxMessageGroupByOutputType[P]>
            : GetScalarType<T[P], InboxMessageGroupByOutputType[P]>
        }
      >
    >


  export type InboxMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sender?: boolean
    subject?: boolean
    body?: boolean
    isRead?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["inboxMessage"]>

  export type InboxMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sender?: boolean
    subject?: boolean
    body?: boolean
    isRead?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["inboxMessage"]>

  export type InboxMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sender?: boolean
    subject?: boolean
    body?: boolean
    isRead?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["inboxMessage"]>

  export type InboxMessageSelectScalar = {
    id?: boolean
    userId?: boolean
    sender?: boolean
    subject?: boolean
    body?: boolean
    isRead?: boolean
    createdAt?: boolean
  }

  export type InboxMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "sender" | "subject" | "body" | "isRead" | "createdAt", ExtArgs["result"]["inboxMessage"]>

  export type $InboxMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InboxMessage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      sender: string
      subject: string
      body: string
      isRead: boolean
      createdAt: Date
    }, ExtArgs["result"]["inboxMessage"]>
    composites: {}
  }

  type InboxMessageGetPayload<S extends boolean | null | undefined | InboxMessageDefaultArgs> = $Result.GetResult<Prisma.$InboxMessagePayload, S>

  type InboxMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InboxMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InboxMessageCountAggregateInputType | true
    }

  export interface InboxMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InboxMessage'], meta: { name: 'InboxMessage' } }
    /**
     * Find zero or one InboxMessage that matches the filter.
     * @param {InboxMessageFindUniqueArgs} args - Arguments to find a InboxMessage
     * @example
     * // Get one InboxMessage
     * const inboxMessage = await prisma.inboxMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InboxMessageFindUniqueArgs>(args: SelectSubset<T, InboxMessageFindUniqueArgs<ExtArgs>>): Prisma__InboxMessageClient<$Result.GetResult<Prisma.$InboxMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InboxMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InboxMessageFindUniqueOrThrowArgs} args - Arguments to find a InboxMessage
     * @example
     * // Get one InboxMessage
     * const inboxMessage = await prisma.inboxMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InboxMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, InboxMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InboxMessageClient<$Result.GetResult<Prisma.$InboxMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InboxMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InboxMessageFindFirstArgs} args - Arguments to find a InboxMessage
     * @example
     * // Get one InboxMessage
     * const inboxMessage = await prisma.inboxMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InboxMessageFindFirstArgs>(args?: SelectSubset<T, InboxMessageFindFirstArgs<ExtArgs>>): Prisma__InboxMessageClient<$Result.GetResult<Prisma.$InboxMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InboxMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InboxMessageFindFirstOrThrowArgs} args - Arguments to find a InboxMessage
     * @example
     * // Get one InboxMessage
     * const inboxMessage = await prisma.inboxMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InboxMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, InboxMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__InboxMessageClient<$Result.GetResult<Prisma.$InboxMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InboxMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InboxMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InboxMessages
     * const inboxMessages = await prisma.inboxMessage.findMany()
     * 
     * // Get first 10 InboxMessages
     * const inboxMessages = await prisma.inboxMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inboxMessageWithIdOnly = await prisma.inboxMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InboxMessageFindManyArgs>(args?: SelectSubset<T, InboxMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InboxMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InboxMessage.
     * @param {InboxMessageCreateArgs} args - Arguments to create a InboxMessage.
     * @example
     * // Create one InboxMessage
     * const InboxMessage = await prisma.inboxMessage.create({
     *   data: {
     *     // ... data to create a InboxMessage
     *   }
     * })
     * 
     */
    create<T extends InboxMessageCreateArgs>(args: SelectSubset<T, InboxMessageCreateArgs<ExtArgs>>): Prisma__InboxMessageClient<$Result.GetResult<Prisma.$InboxMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InboxMessages.
     * @param {InboxMessageCreateManyArgs} args - Arguments to create many InboxMessages.
     * @example
     * // Create many InboxMessages
     * const inboxMessage = await prisma.inboxMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InboxMessageCreateManyArgs>(args?: SelectSubset<T, InboxMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InboxMessages and returns the data saved in the database.
     * @param {InboxMessageCreateManyAndReturnArgs} args - Arguments to create many InboxMessages.
     * @example
     * // Create many InboxMessages
     * const inboxMessage = await prisma.inboxMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InboxMessages and only return the `id`
     * const inboxMessageWithIdOnly = await prisma.inboxMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InboxMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, InboxMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InboxMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a InboxMessage.
     * @param {InboxMessageDeleteArgs} args - Arguments to delete one InboxMessage.
     * @example
     * // Delete one InboxMessage
     * const InboxMessage = await prisma.inboxMessage.delete({
     *   where: {
     *     // ... filter to delete one InboxMessage
     *   }
     * })
     * 
     */
    delete<T extends InboxMessageDeleteArgs>(args: SelectSubset<T, InboxMessageDeleteArgs<ExtArgs>>): Prisma__InboxMessageClient<$Result.GetResult<Prisma.$InboxMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InboxMessage.
     * @param {InboxMessageUpdateArgs} args - Arguments to update one InboxMessage.
     * @example
     * // Update one InboxMessage
     * const inboxMessage = await prisma.inboxMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InboxMessageUpdateArgs>(args: SelectSubset<T, InboxMessageUpdateArgs<ExtArgs>>): Prisma__InboxMessageClient<$Result.GetResult<Prisma.$InboxMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InboxMessages.
     * @param {InboxMessageDeleteManyArgs} args - Arguments to filter InboxMessages to delete.
     * @example
     * // Delete a few InboxMessages
     * const { count } = await prisma.inboxMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InboxMessageDeleteManyArgs>(args?: SelectSubset<T, InboxMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InboxMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InboxMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InboxMessages
     * const inboxMessage = await prisma.inboxMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InboxMessageUpdateManyArgs>(args: SelectSubset<T, InboxMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InboxMessages and returns the data updated in the database.
     * @param {InboxMessageUpdateManyAndReturnArgs} args - Arguments to update many InboxMessages.
     * @example
     * // Update many InboxMessages
     * const inboxMessage = await prisma.inboxMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InboxMessages and only return the `id`
     * const inboxMessageWithIdOnly = await prisma.inboxMessage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InboxMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, InboxMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InboxMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one InboxMessage.
     * @param {InboxMessageUpsertArgs} args - Arguments to update or create a InboxMessage.
     * @example
     * // Update or create a InboxMessage
     * const inboxMessage = await prisma.inboxMessage.upsert({
     *   create: {
     *     // ... data to create a InboxMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InboxMessage we want to update
     *   }
     * })
     */
    upsert<T extends InboxMessageUpsertArgs>(args: SelectSubset<T, InboxMessageUpsertArgs<ExtArgs>>): Prisma__InboxMessageClient<$Result.GetResult<Prisma.$InboxMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InboxMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InboxMessageCountArgs} args - Arguments to filter InboxMessages to count.
     * @example
     * // Count the number of InboxMessages
     * const count = await prisma.inboxMessage.count({
     *   where: {
     *     // ... the filter for the InboxMessages we want to count
     *   }
     * })
    **/
    count<T extends InboxMessageCountArgs>(
      args?: Subset<T, InboxMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InboxMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InboxMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InboxMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InboxMessageAggregateArgs>(args: Subset<T, InboxMessageAggregateArgs>): Prisma.PrismaPromise<GetInboxMessageAggregateType<T>>

    /**
     * Group by InboxMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InboxMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InboxMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InboxMessageGroupByArgs['orderBy'] }
        : { orderBy?: InboxMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InboxMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInboxMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InboxMessage model
   */
  readonly fields: InboxMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InboxMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InboxMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InboxMessage model
   */
  interface InboxMessageFieldRefs {
    readonly id: FieldRef<"InboxMessage", 'String'>
    readonly userId: FieldRef<"InboxMessage", 'String'>
    readonly sender: FieldRef<"InboxMessage", 'String'>
    readonly subject: FieldRef<"InboxMessage", 'String'>
    readonly body: FieldRef<"InboxMessage", 'String'>
    readonly isRead: FieldRef<"InboxMessage", 'Boolean'>
    readonly createdAt: FieldRef<"InboxMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InboxMessage findUnique
   */
  export type InboxMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
    /**
     * Filter, which InboxMessage to fetch.
     */
    where: InboxMessageWhereUniqueInput
  }

  /**
   * InboxMessage findUniqueOrThrow
   */
  export type InboxMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
    /**
     * Filter, which InboxMessage to fetch.
     */
    where: InboxMessageWhereUniqueInput
  }

  /**
   * InboxMessage findFirst
   */
  export type InboxMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
    /**
     * Filter, which InboxMessage to fetch.
     */
    where?: InboxMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InboxMessages to fetch.
     */
    orderBy?: InboxMessageOrderByWithRelationInput | InboxMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InboxMessages.
     */
    cursor?: InboxMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InboxMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InboxMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InboxMessages.
     */
    distinct?: InboxMessageScalarFieldEnum | InboxMessageScalarFieldEnum[]
  }

  /**
   * InboxMessage findFirstOrThrow
   */
  export type InboxMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
    /**
     * Filter, which InboxMessage to fetch.
     */
    where?: InboxMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InboxMessages to fetch.
     */
    orderBy?: InboxMessageOrderByWithRelationInput | InboxMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InboxMessages.
     */
    cursor?: InboxMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InboxMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InboxMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InboxMessages.
     */
    distinct?: InboxMessageScalarFieldEnum | InboxMessageScalarFieldEnum[]
  }

  /**
   * InboxMessage findMany
   */
  export type InboxMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
    /**
     * Filter, which InboxMessages to fetch.
     */
    where?: InboxMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InboxMessages to fetch.
     */
    orderBy?: InboxMessageOrderByWithRelationInput | InboxMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InboxMessages.
     */
    cursor?: InboxMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InboxMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InboxMessages.
     */
    skip?: number
    distinct?: InboxMessageScalarFieldEnum | InboxMessageScalarFieldEnum[]
  }

  /**
   * InboxMessage create
   */
  export type InboxMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
    /**
     * The data needed to create a InboxMessage.
     */
    data: XOR<InboxMessageCreateInput, InboxMessageUncheckedCreateInput>
  }

  /**
   * InboxMessage createMany
   */
  export type InboxMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InboxMessages.
     */
    data: InboxMessageCreateManyInput | InboxMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InboxMessage createManyAndReturn
   */
  export type InboxMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
    /**
     * The data used to create many InboxMessages.
     */
    data: InboxMessageCreateManyInput | InboxMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InboxMessage update
   */
  export type InboxMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
    /**
     * The data needed to update a InboxMessage.
     */
    data: XOR<InboxMessageUpdateInput, InboxMessageUncheckedUpdateInput>
    /**
     * Choose, which InboxMessage to update.
     */
    where: InboxMessageWhereUniqueInput
  }

  /**
   * InboxMessage updateMany
   */
  export type InboxMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InboxMessages.
     */
    data: XOR<InboxMessageUpdateManyMutationInput, InboxMessageUncheckedUpdateManyInput>
    /**
     * Filter which InboxMessages to update
     */
    where?: InboxMessageWhereInput
    /**
     * Limit how many InboxMessages to update.
     */
    limit?: number
  }

  /**
   * InboxMessage updateManyAndReturn
   */
  export type InboxMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
    /**
     * The data used to update InboxMessages.
     */
    data: XOR<InboxMessageUpdateManyMutationInput, InboxMessageUncheckedUpdateManyInput>
    /**
     * Filter which InboxMessages to update
     */
    where?: InboxMessageWhereInput
    /**
     * Limit how many InboxMessages to update.
     */
    limit?: number
  }

  /**
   * InboxMessage upsert
   */
  export type InboxMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
    /**
     * The filter to search for the InboxMessage to update in case it exists.
     */
    where: InboxMessageWhereUniqueInput
    /**
     * In case the InboxMessage found by the `where` argument doesn't exist, create a new InboxMessage with this data.
     */
    create: XOR<InboxMessageCreateInput, InboxMessageUncheckedCreateInput>
    /**
     * In case the InboxMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InboxMessageUpdateInput, InboxMessageUncheckedUpdateInput>
  }

  /**
   * InboxMessage delete
   */
  export type InboxMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
    /**
     * Filter which InboxMessage to delete.
     */
    where: InboxMessageWhereUniqueInput
  }

  /**
   * InboxMessage deleteMany
   */
  export type InboxMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InboxMessages to delete
     */
    where?: InboxMessageWhereInput
    /**
     * Limit how many InboxMessages to delete.
     */
    limit?: number
  }

  /**
   * InboxMessage without action
   */
  export type InboxMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
  }


  /**
   * Model ProcessedStripeEvent
   */

  export type AggregateProcessedStripeEvent = {
    _count: ProcessedStripeEventCountAggregateOutputType | null
    _min: ProcessedStripeEventMinAggregateOutputType | null
    _max: ProcessedStripeEventMaxAggregateOutputType | null
  }

  export type ProcessedStripeEventMinAggregateOutputType = {
    id: string | null
    eventId: string | null
    createdAt: Date | null
  }

  export type ProcessedStripeEventMaxAggregateOutputType = {
    id: string | null
    eventId: string | null
    createdAt: Date | null
  }

  export type ProcessedStripeEventCountAggregateOutputType = {
    id: number
    eventId: number
    createdAt: number
    _all: number
  }


  export type ProcessedStripeEventMinAggregateInputType = {
    id?: true
    eventId?: true
    createdAt?: true
  }

  export type ProcessedStripeEventMaxAggregateInputType = {
    id?: true
    eventId?: true
    createdAt?: true
  }

  export type ProcessedStripeEventCountAggregateInputType = {
    id?: true
    eventId?: true
    createdAt?: true
    _all?: true
  }

  export type ProcessedStripeEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessedStripeEvent to aggregate.
     */
    where?: ProcessedStripeEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedStripeEvents to fetch.
     */
    orderBy?: ProcessedStripeEventOrderByWithRelationInput | ProcessedStripeEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProcessedStripeEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedStripeEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedStripeEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProcessedStripeEvents
    **/
    _count?: true | ProcessedStripeEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProcessedStripeEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProcessedStripeEventMaxAggregateInputType
  }

  export type GetProcessedStripeEventAggregateType<T extends ProcessedStripeEventAggregateArgs> = {
        [P in keyof T & keyof AggregateProcessedStripeEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProcessedStripeEvent[P]>
      : GetScalarType<T[P], AggregateProcessedStripeEvent[P]>
  }




  export type ProcessedStripeEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProcessedStripeEventWhereInput
    orderBy?: ProcessedStripeEventOrderByWithAggregationInput | ProcessedStripeEventOrderByWithAggregationInput[]
    by: ProcessedStripeEventScalarFieldEnum[] | ProcessedStripeEventScalarFieldEnum
    having?: ProcessedStripeEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProcessedStripeEventCountAggregateInputType | true
    _min?: ProcessedStripeEventMinAggregateInputType
    _max?: ProcessedStripeEventMaxAggregateInputType
  }

  export type ProcessedStripeEventGroupByOutputType = {
    id: string
    eventId: string
    createdAt: Date
    _count: ProcessedStripeEventCountAggregateOutputType | null
    _min: ProcessedStripeEventMinAggregateOutputType | null
    _max: ProcessedStripeEventMaxAggregateOutputType | null
  }

  type GetProcessedStripeEventGroupByPayload<T extends ProcessedStripeEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProcessedStripeEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProcessedStripeEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProcessedStripeEventGroupByOutputType[P]>
            : GetScalarType<T[P], ProcessedStripeEventGroupByOutputType[P]>
        }
      >
    >


  export type ProcessedStripeEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["processedStripeEvent"]>

  export type ProcessedStripeEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["processedStripeEvent"]>

  export type ProcessedStripeEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["processedStripeEvent"]>

  export type ProcessedStripeEventSelectScalar = {
    id?: boolean
    eventId?: boolean
    createdAt?: boolean
  }

  export type ProcessedStripeEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "eventId" | "createdAt", ExtArgs["result"]["processedStripeEvent"]>

  export type $ProcessedStripeEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProcessedStripeEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      eventId: string
      createdAt: Date
    }, ExtArgs["result"]["processedStripeEvent"]>
    composites: {}
  }

  type ProcessedStripeEventGetPayload<S extends boolean | null | undefined | ProcessedStripeEventDefaultArgs> = $Result.GetResult<Prisma.$ProcessedStripeEventPayload, S>

  type ProcessedStripeEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProcessedStripeEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProcessedStripeEventCountAggregateInputType | true
    }

  export interface ProcessedStripeEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProcessedStripeEvent'], meta: { name: 'ProcessedStripeEvent' } }
    /**
     * Find zero or one ProcessedStripeEvent that matches the filter.
     * @param {ProcessedStripeEventFindUniqueArgs} args - Arguments to find a ProcessedStripeEvent
     * @example
     * // Get one ProcessedStripeEvent
     * const processedStripeEvent = await prisma.processedStripeEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProcessedStripeEventFindUniqueArgs>(args: SelectSubset<T, ProcessedStripeEventFindUniqueArgs<ExtArgs>>): Prisma__ProcessedStripeEventClient<$Result.GetResult<Prisma.$ProcessedStripeEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProcessedStripeEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProcessedStripeEventFindUniqueOrThrowArgs} args - Arguments to find a ProcessedStripeEvent
     * @example
     * // Get one ProcessedStripeEvent
     * const processedStripeEvent = await prisma.processedStripeEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProcessedStripeEventFindUniqueOrThrowArgs>(args: SelectSubset<T, ProcessedStripeEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProcessedStripeEventClient<$Result.GetResult<Prisma.$ProcessedStripeEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProcessedStripeEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedStripeEventFindFirstArgs} args - Arguments to find a ProcessedStripeEvent
     * @example
     * // Get one ProcessedStripeEvent
     * const processedStripeEvent = await prisma.processedStripeEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProcessedStripeEventFindFirstArgs>(args?: SelectSubset<T, ProcessedStripeEventFindFirstArgs<ExtArgs>>): Prisma__ProcessedStripeEventClient<$Result.GetResult<Prisma.$ProcessedStripeEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProcessedStripeEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedStripeEventFindFirstOrThrowArgs} args - Arguments to find a ProcessedStripeEvent
     * @example
     * // Get one ProcessedStripeEvent
     * const processedStripeEvent = await prisma.processedStripeEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProcessedStripeEventFindFirstOrThrowArgs>(args?: SelectSubset<T, ProcessedStripeEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProcessedStripeEventClient<$Result.GetResult<Prisma.$ProcessedStripeEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProcessedStripeEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedStripeEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProcessedStripeEvents
     * const processedStripeEvents = await prisma.processedStripeEvent.findMany()
     * 
     * // Get first 10 ProcessedStripeEvents
     * const processedStripeEvents = await prisma.processedStripeEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const processedStripeEventWithIdOnly = await prisma.processedStripeEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProcessedStripeEventFindManyArgs>(args?: SelectSubset<T, ProcessedStripeEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedStripeEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProcessedStripeEvent.
     * @param {ProcessedStripeEventCreateArgs} args - Arguments to create a ProcessedStripeEvent.
     * @example
     * // Create one ProcessedStripeEvent
     * const ProcessedStripeEvent = await prisma.processedStripeEvent.create({
     *   data: {
     *     // ... data to create a ProcessedStripeEvent
     *   }
     * })
     * 
     */
    create<T extends ProcessedStripeEventCreateArgs>(args: SelectSubset<T, ProcessedStripeEventCreateArgs<ExtArgs>>): Prisma__ProcessedStripeEventClient<$Result.GetResult<Prisma.$ProcessedStripeEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProcessedStripeEvents.
     * @param {ProcessedStripeEventCreateManyArgs} args - Arguments to create many ProcessedStripeEvents.
     * @example
     * // Create many ProcessedStripeEvents
     * const processedStripeEvent = await prisma.processedStripeEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProcessedStripeEventCreateManyArgs>(args?: SelectSubset<T, ProcessedStripeEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProcessedStripeEvents and returns the data saved in the database.
     * @param {ProcessedStripeEventCreateManyAndReturnArgs} args - Arguments to create many ProcessedStripeEvents.
     * @example
     * // Create many ProcessedStripeEvents
     * const processedStripeEvent = await prisma.processedStripeEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProcessedStripeEvents and only return the `id`
     * const processedStripeEventWithIdOnly = await prisma.processedStripeEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProcessedStripeEventCreateManyAndReturnArgs>(args?: SelectSubset<T, ProcessedStripeEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedStripeEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProcessedStripeEvent.
     * @param {ProcessedStripeEventDeleteArgs} args - Arguments to delete one ProcessedStripeEvent.
     * @example
     * // Delete one ProcessedStripeEvent
     * const ProcessedStripeEvent = await prisma.processedStripeEvent.delete({
     *   where: {
     *     // ... filter to delete one ProcessedStripeEvent
     *   }
     * })
     * 
     */
    delete<T extends ProcessedStripeEventDeleteArgs>(args: SelectSubset<T, ProcessedStripeEventDeleteArgs<ExtArgs>>): Prisma__ProcessedStripeEventClient<$Result.GetResult<Prisma.$ProcessedStripeEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProcessedStripeEvent.
     * @param {ProcessedStripeEventUpdateArgs} args - Arguments to update one ProcessedStripeEvent.
     * @example
     * // Update one ProcessedStripeEvent
     * const processedStripeEvent = await prisma.processedStripeEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProcessedStripeEventUpdateArgs>(args: SelectSubset<T, ProcessedStripeEventUpdateArgs<ExtArgs>>): Prisma__ProcessedStripeEventClient<$Result.GetResult<Prisma.$ProcessedStripeEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProcessedStripeEvents.
     * @param {ProcessedStripeEventDeleteManyArgs} args - Arguments to filter ProcessedStripeEvents to delete.
     * @example
     * // Delete a few ProcessedStripeEvents
     * const { count } = await prisma.processedStripeEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProcessedStripeEventDeleteManyArgs>(args?: SelectSubset<T, ProcessedStripeEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProcessedStripeEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedStripeEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProcessedStripeEvents
     * const processedStripeEvent = await prisma.processedStripeEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProcessedStripeEventUpdateManyArgs>(args: SelectSubset<T, ProcessedStripeEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProcessedStripeEvents and returns the data updated in the database.
     * @param {ProcessedStripeEventUpdateManyAndReturnArgs} args - Arguments to update many ProcessedStripeEvents.
     * @example
     * // Update many ProcessedStripeEvents
     * const processedStripeEvent = await prisma.processedStripeEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProcessedStripeEvents and only return the `id`
     * const processedStripeEventWithIdOnly = await prisma.processedStripeEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProcessedStripeEventUpdateManyAndReturnArgs>(args: SelectSubset<T, ProcessedStripeEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedStripeEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProcessedStripeEvent.
     * @param {ProcessedStripeEventUpsertArgs} args - Arguments to update or create a ProcessedStripeEvent.
     * @example
     * // Update or create a ProcessedStripeEvent
     * const processedStripeEvent = await prisma.processedStripeEvent.upsert({
     *   create: {
     *     // ... data to create a ProcessedStripeEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProcessedStripeEvent we want to update
     *   }
     * })
     */
    upsert<T extends ProcessedStripeEventUpsertArgs>(args: SelectSubset<T, ProcessedStripeEventUpsertArgs<ExtArgs>>): Prisma__ProcessedStripeEventClient<$Result.GetResult<Prisma.$ProcessedStripeEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProcessedStripeEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedStripeEventCountArgs} args - Arguments to filter ProcessedStripeEvents to count.
     * @example
     * // Count the number of ProcessedStripeEvents
     * const count = await prisma.processedStripeEvent.count({
     *   where: {
     *     // ... the filter for the ProcessedStripeEvents we want to count
     *   }
     * })
    **/
    count<T extends ProcessedStripeEventCountArgs>(
      args?: Subset<T, ProcessedStripeEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProcessedStripeEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProcessedStripeEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedStripeEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProcessedStripeEventAggregateArgs>(args: Subset<T, ProcessedStripeEventAggregateArgs>): Prisma.PrismaPromise<GetProcessedStripeEventAggregateType<T>>

    /**
     * Group by ProcessedStripeEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedStripeEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProcessedStripeEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProcessedStripeEventGroupByArgs['orderBy'] }
        : { orderBy?: ProcessedStripeEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProcessedStripeEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProcessedStripeEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProcessedStripeEvent model
   */
  readonly fields: ProcessedStripeEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProcessedStripeEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProcessedStripeEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProcessedStripeEvent model
   */
  interface ProcessedStripeEventFieldRefs {
    readonly id: FieldRef<"ProcessedStripeEvent", 'String'>
    readonly eventId: FieldRef<"ProcessedStripeEvent", 'String'>
    readonly createdAt: FieldRef<"ProcessedStripeEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProcessedStripeEvent findUnique
   */
  export type ProcessedStripeEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedStripeEvent
     */
    select?: ProcessedStripeEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedStripeEvent
     */
    omit?: ProcessedStripeEventOmit<ExtArgs> | null
    /**
     * Filter, which ProcessedStripeEvent to fetch.
     */
    where: ProcessedStripeEventWhereUniqueInput
  }

  /**
   * ProcessedStripeEvent findUniqueOrThrow
   */
  export type ProcessedStripeEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedStripeEvent
     */
    select?: ProcessedStripeEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedStripeEvent
     */
    omit?: ProcessedStripeEventOmit<ExtArgs> | null
    /**
     * Filter, which ProcessedStripeEvent to fetch.
     */
    where: ProcessedStripeEventWhereUniqueInput
  }

  /**
   * ProcessedStripeEvent findFirst
   */
  export type ProcessedStripeEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedStripeEvent
     */
    select?: ProcessedStripeEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedStripeEvent
     */
    omit?: ProcessedStripeEventOmit<ExtArgs> | null
    /**
     * Filter, which ProcessedStripeEvent to fetch.
     */
    where?: ProcessedStripeEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedStripeEvents to fetch.
     */
    orderBy?: ProcessedStripeEventOrderByWithRelationInput | ProcessedStripeEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessedStripeEvents.
     */
    cursor?: ProcessedStripeEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedStripeEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedStripeEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessedStripeEvents.
     */
    distinct?: ProcessedStripeEventScalarFieldEnum | ProcessedStripeEventScalarFieldEnum[]
  }

  /**
   * ProcessedStripeEvent findFirstOrThrow
   */
  export type ProcessedStripeEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedStripeEvent
     */
    select?: ProcessedStripeEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedStripeEvent
     */
    omit?: ProcessedStripeEventOmit<ExtArgs> | null
    /**
     * Filter, which ProcessedStripeEvent to fetch.
     */
    where?: ProcessedStripeEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedStripeEvents to fetch.
     */
    orderBy?: ProcessedStripeEventOrderByWithRelationInput | ProcessedStripeEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessedStripeEvents.
     */
    cursor?: ProcessedStripeEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedStripeEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedStripeEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessedStripeEvents.
     */
    distinct?: ProcessedStripeEventScalarFieldEnum | ProcessedStripeEventScalarFieldEnum[]
  }

  /**
   * ProcessedStripeEvent findMany
   */
  export type ProcessedStripeEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedStripeEvent
     */
    select?: ProcessedStripeEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedStripeEvent
     */
    omit?: ProcessedStripeEventOmit<ExtArgs> | null
    /**
     * Filter, which ProcessedStripeEvents to fetch.
     */
    where?: ProcessedStripeEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedStripeEvents to fetch.
     */
    orderBy?: ProcessedStripeEventOrderByWithRelationInput | ProcessedStripeEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProcessedStripeEvents.
     */
    cursor?: ProcessedStripeEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedStripeEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedStripeEvents.
     */
    skip?: number
    distinct?: ProcessedStripeEventScalarFieldEnum | ProcessedStripeEventScalarFieldEnum[]
  }

  /**
   * ProcessedStripeEvent create
   */
  export type ProcessedStripeEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedStripeEvent
     */
    select?: ProcessedStripeEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedStripeEvent
     */
    omit?: ProcessedStripeEventOmit<ExtArgs> | null
    /**
     * The data needed to create a ProcessedStripeEvent.
     */
    data: XOR<ProcessedStripeEventCreateInput, ProcessedStripeEventUncheckedCreateInput>
  }

  /**
   * ProcessedStripeEvent createMany
   */
  export type ProcessedStripeEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProcessedStripeEvents.
     */
    data: ProcessedStripeEventCreateManyInput | ProcessedStripeEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProcessedStripeEvent createManyAndReturn
   */
  export type ProcessedStripeEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedStripeEvent
     */
    select?: ProcessedStripeEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedStripeEvent
     */
    omit?: ProcessedStripeEventOmit<ExtArgs> | null
    /**
     * The data used to create many ProcessedStripeEvents.
     */
    data: ProcessedStripeEventCreateManyInput | ProcessedStripeEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProcessedStripeEvent update
   */
  export type ProcessedStripeEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedStripeEvent
     */
    select?: ProcessedStripeEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedStripeEvent
     */
    omit?: ProcessedStripeEventOmit<ExtArgs> | null
    /**
     * The data needed to update a ProcessedStripeEvent.
     */
    data: XOR<ProcessedStripeEventUpdateInput, ProcessedStripeEventUncheckedUpdateInput>
    /**
     * Choose, which ProcessedStripeEvent to update.
     */
    where: ProcessedStripeEventWhereUniqueInput
  }

  /**
   * ProcessedStripeEvent updateMany
   */
  export type ProcessedStripeEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProcessedStripeEvents.
     */
    data: XOR<ProcessedStripeEventUpdateManyMutationInput, ProcessedStripeEventUncheckedUpdateManyInput>
    /**
     * Filter which ProcessedStripeEvents to update
     */
    where?: ProcessedStripeEventWhereInput
    /**
     * Limit how many ProcessedStripeEvents to update.
     */
    limit?: number
  }

  /**
   * ProcessedStripeEvent updateManyAndReturn
   */
  export type ProcessedStripeEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedStripeEvent
     */
    select?: ProcessedStripeEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedStripeEvent
     */
    omit?: ProcessedStripeEventOmit<ExtArgs> | null
    /**
     * The data used to update ProcessedStripeEvents.
     */
    data: XOR<ProcessedStripeEventUpdateManyMutationInput, ProcessedStripeEventUncheckedUpdateManyInput>
    /**
     * Filter which ProcessedStripeEvents to update
     */
    where?: ProcessedStripeEventWhereInput
    /**
     * Limit how many ProcessedStripeEvents to update.
     */
    limit?: number
  }

  /**
   * ProcessedStripeEvent upsert
   */
  export type ProcessedStripeEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedStripeEvent
     */
    select?: ProcessedStripeEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedStripeEvent
     */
    omit?: ProcessedStripeEventOmit<ExtArgs> | null
    /**
     * The filter to search for the ProcessedStripeEvent to update in case it exists.
     */
    where: ProcessedStripeEventWhereUniqueInput
    /**
     * In case the ProcessedStripeEvent found by the `where` argument doesn't exist, create a new ProcessedStripeEvent with this data.
     */
    create: XOR<ProcessedStripeEventCreateInput, ProcessedStripeEventUncheckedCreateInput>
    /**
     * In case the ProcessedStripeEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProcessedStripeEventUpdateInput, ProcessedStripeEventUncheckedUpdateInput>
  }

  /**
   * ProcessedStripeEvent delete
   */
  export type ProcessedStripeEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedStripeEvent
     */
    select?: ProcessedStripeEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedStripeEvent
     */
    omit?: ProcessedStripeEventOmit<ExtArgs> | null
    /**
     * Filter which ProcessedStripeEvent to delete.
     */
    where: ProcessedStripeEventWhereUniqueInput
  }

  /**
   * ProcessedStripeEvent deleteMany
   */
  export type ProcessedStripeEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessedStripeEvents to delete
     */
    where?: ProcessedStripeEventWhereInput
    /**
     * Limit how many ProcessedStripeEvents to delete.
     */
    limit?: number
  }

  /**
   * ProcessedStripeEvent without action
   */
  export type ProcessedStripeEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedStripeEvent
     */
    select?: ProcessedStripeEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedStripeEvent
     */
    omit?: ProcessedStripeEventOmit<ExtArgs> | null
  }


  /**
   * Model ExecutionRecord
   */

  export type AggregateExecutionRecord = {
    _count: ExecutionRecordCountAggregateOutputType | null
    _min: ExecutionRecordMinAggregateOutputType | null
    _max: ExecutionRecordMaxAggregateOutputType | null
  }

  export type ExecutionRecordMinAggregateOutputType = {
    id: string | null
    userId: string | null
    status: string | null
    timestamp: Date | null
    isAutonomous: boolean | null
  }

  export type ExecutionRecordMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    status: string | null
    timestamp: Date | null
    isAutonomous: boolean | null
  }

  export type ExecutionRecordCountAggregateOutputType = {
    id: number
    userId: number
    status: number
    timestamp: number
    isAutonomous: number
    _all: number
  }


  export type ExecutionRecordMinAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    timestamp?: true
    isAutonomous?: true
  }

  export type ExecutionRecordMaxAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    timestamp?: true
    isAutonomous?: true
  }

  export type ExecutionRecordCountAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    timestamp?: true
    isAutonomous?: true
    _all?: true
  }

  export type ExecutionRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExecutionRecord to aggregate.
     */
    where?: ExecutionRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExecutionRecords to fetch.
     */
    orderBy?: ExecutionRecordOrderByWithRelationInput | ExecutionRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExecutionRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExecutionRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExecutionRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExecutionRecords
    **/
    _count?: true | ExecutionRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExecutionRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExecutionRecordMaxAggregateInputType
  }

  export type GetExecutionRecordAggregateType<T extends ExecutionRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateExecutionRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExecutionRecord[P]>
      : GetScalarType<T[P], AggregateExecutionRecord[P]>
  }




  export type ExecutionRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExecutionRecordWhereInput
    orderBy?: ExecutionRecordOrderByWithAggregationInput | ExecutionRecordOrderByWithAggregationInput[]
    by: ExecutionRecordScalarFieldEnum[] | ExecutionRecordScalarFieldEnum
    having?: ExecutionRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExecutionRecordCountAggregateInputType | true
    _min?: ExecutionRecordMinAggregateInputType
    _max?: ExecutionRecordMaxAggregateInputType
  }

  export type ExecutionRecordGroupByOutputType = {
    id: string
    userId: string
    status: string
    timestamp: Date
    isAutonomous: boolean
    _count: ExecutionRecordCountAggregateOutputType | null
    _min: ExecutionRecordMinAggregateOutputType | null
    _max: ExecutionRecordMaxAggregateOutputType | null
  }

  type GetExecutionRecordGroupByPayload<T extends ExecutionRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExecutionRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExecutionRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExecutionRecordGroupByOutputType[P]>
            : GetScalarType<T[P], ExecutionRecordGroupByOutputType[P]>
        }
      >
    >


  export type ExecutionRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    status?: boolean
    timestamp?: boolean
    isAutonomous?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["executionRecord"]>

  export type ExecutionRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    status?: boolean
    timestamp?: boolean
    isAutonomous?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["executionRecord"]>

  export type ExecutionRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    status?: boolean
    timestamp?: boolean
    isAutonomous?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["executionRecord"]>

  export type ExecutionRecordSelectScalar = {
    id?: boolean
    userId?: boolean
    status?: boolean
    timestamp?: boolean
    isAutonomous?: boolean
  }

  export type ExecutionRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "status" | "timestamp" | "isAutonomous", ExtArgs["result"]["executionRecord"]>
  export type ExecutionRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ExecutionRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ExecutionRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ExecutionRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExecutionRecord"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      status: string
      timestamp: Date
      isAutonomous: boolean
    }, ExtArgs["result"]["executionRecord"]>
    composites: {}
  }

  type ExecutionRecordGetPayload<S extends boolean | null | undefined | ExecutionRecordDefaultArgs> = $Result.GetResult<Prisma.$ExecutionRecordPayload, S>

  type ExecutionRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExecutionRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExecutionRecordCountAggregateInputType | true
    }

  export interface ExecutionRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExecutionRecord'], meta: { name: 'ExecutionRecord' } }
    /**
     * Find zero or one ExecutionRecord that matches the filter.
     * @param {ExecutionRecordFindUniqueArgs} args - Arguments to find a ExecutionRecord
     * @example
     * // Get one ExecutionRecord
     * const executionRecord = await prisma.executionRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExecutionRecordFindUniqueArgs>(args: SelectSubset<T, ExecutionRecordFindUniqueArgs<ExtArgs>>): Prisma__ExecutionRecordClient<$Result.GetResult<Prisma.$ExecutionRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExecutionRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExecutionRecordFindUniqueOrThrowArgs} args - Arguments to find a ExecutionRecord
     * @example
     * // Get one ExecutionRecord
     * const executionRecord = await prisma.executionRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExecutionRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, ExecutionRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExecutionRecordClient<$Result.GetResult<Prisma.$ExecutionRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExecutionRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionRecordFindFirstArgs} args - Arguments to find a ExecutionRecord
     * @example
     * // Get one ExecutionRecord
     * const executionRecord = await prisma.executionRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExecutionRecordFindFirstArgs>(args?: SelectSubset<T, ExecutionRecordFindFirstArgs<ExtArgs>>): Prisma__ExecutionRecordClient<$Result.GetResult<Prisma.$ExecutionRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExecutionRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionRecordFindFirstOrThrowArgs} args - Arguments to find a ExecutionRecord
     * @example
     * // Get one ExecutionRecord
     * const executionRecord = await prisma.executionRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExecutionRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, ExecutionRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExecutionRecordClient<$Result.GetResult<Prisma.$ExecutionRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExecutionRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExecutionRecords
     * const executionRecords = await prisma.executionRecord.findMany()
     * 
     * // Get first 10 ExecutionRecords
     * const executionRecords = await prisma.executionRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const executionRecordWithIdOnly = await prisma.executionRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExecutionRecordFindManyArgs>(args?: SelectSubset<T, ExecutionRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExecutionRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExecutionRecord.
     * @param {ExecutionRecordCreateArgs} args - Arguments to create a ExecutionRecord.
     * @example
     * // Create one ExecutionRecord
     * const ExecutionRecord = await prisma.executionRecord.create({
     *   data: {
     *     // ... data to create a ExecutionRecord
     *   }
     * })
     * 
     */
    create<T extends ExecutionRecordCreateArgs>(args: SelectSubset<T, ExecutionRecordCreateArgs<ExtArgs>>): Prisma__ExecutionRecordClient<$Result.GetResult<Prisma.$ExecutionRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExecutionRecords.
     * @param {ExecutionRecordCreateManyArgs} args - Arguments to create many ExecutionRecords.
     * @example
     * // Create many ExecutionRecords
     * const executionRecord = await prisma.executionRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExecutionRecordCreateManyArgs>(args?: SelectSubset<T, ExecutionRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExecutionRecords and returns the data saved in the database.
     * @param {ExecutionRecordCreateManyAndReturnArgs} args - Arguments to create many ExecutionRecords.
     * @example
     * // Create many ExecutionRecords
     * const executionRecord = await prisma.executionRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExecutionRecords and only return the `id`
     * const executionRecordWithIdOnly = await prisma.executionRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExecutionRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, ExecutionRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExecutionRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExecutionRecord.
     * @param {ExecutionRecordDeleteArgs} args - Arguments to delete one ExecutionRecord.
     * @example
     * // Delete one ExecutionRecord
     * const ExecutionRecord = await prisma.executionRecord.delete({
     *   where: {
     *     // ... filter to delete one ExecutionRecord
     *   }
     * })
     * 
     */
    delete<T extends ExecutionRecordDeleteArgs>(args: SelectSubset<T, ExecutionRecordDeleteArgs<ExtArgs>>): Prisma__ExecutionRecordClient<$Result.GetResult<Prisma.$ExecutionRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExecutionRecord.
     * @param {ExecutionRecordUpdateArgs} args - Arguments to update one ExecutionRecord.
     * @example
     * // Update one ExecutionRecord
     * const executionRecord = await prisma.executionRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExecutionRecordUpdateArgs>(args: SelectSubset<T, ExecutionRecordUpdateArgs<ExtArgs>>): Prisma__ExecutionRecordClient<$Result.GetResult<Prisma.$ExecutionRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExecutionRecords.
     * @param {ExecutionRecordDeleteManyArgs} args - Arguments to filter ExecutionRecords to delete.
     * @example
     * // Delete a few ExecutionRecords
     * const { count } = await prisma.executionRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExecutionRecordDeleteManyArgs>(args?: SelectSubset<T, ExecutionRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExecutionRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExecutionRecords
     * const executionRecord = await prisma.executionRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExecutionRecordUpdateManyArgs>(args: SelectSubset<T, ExecutionRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExecutionRecords and returns the data updated in the database.
     * @param {ExecutionRecordUpdateManyAndReturnArgs} args - Arguments to update many ExecutionRecords.
     * @example
     * // Update many ExecutionRecords
     * const executionRecord = await prisma.executionRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExecutionRecords and only return the `id`
     * const executionRecordWithIdOnly = await prisma.executionRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExecutionRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, ExecutionRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExecutionRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExecutionRecord.
     * @param {ExecutionRecordUpsertArgs} args - Arguments to update or create a ExecutionRecord.
     * @example
     * // Update or create a ExecutionRecord
     * const executionRecord = await prisma.executionRecord.upsert({
     *   create: {
     *     // ... data to create a ExecutionRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExecutionRecord we want to update
     *   }
     * })
     */
    upsert<T extends ExecutionRecordUpsertArgs>(args: SelectSubset<T, ExecutionRecordUpsertArgs<ExtArgs>>): Prisma__ExecutionRecordClient<$Result.GetResult<Prisma.$ExecutionRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExecutionRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionRecordCountArgs} args - Arguments to filter ExecutionRecords to count.
     * @example
     * // Count the number of ExecutionRecords
     * const count = await prisma.executionRecord.count({
     *   where: {
     *     // ... the filter for the ExecutionRecords we want to count
     *   }
     * })
    **/
    count<T extends ExecutionRecordCountArgs>(
      args?: Subset<T, ExecutionRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExecutionRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExecutionRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExecutionRecordAggregateArgs>(args: Subset<T, ExecutionRecordAggregateArgs>): Prisma.PrismaPromise<GetExecutionRecordAggregateType<T>>

    /**
     * Group by ExecutionRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExecutionRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExecutionRecordGroupByArgs['orderBy'] }
        : { orderBy?: ExecutionRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExecutionRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExecutionRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExecutionRecord model
   */
  readonly fields: ExecutionRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExecutionRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExecutionRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExecutionRecord model
   */
  interface ExecutionRecordFieldRefs {
    readonly id: FieldRef<"ExecutionRecord", 'String'>
    readonly userId: FieldRef<"ExecutionRecord", 'String'>
    readonly status: FieldRef<"ExecutionRecord", 'String'>
    readonly timestamp: FieldRef<"ExecutionRecord", 'DateTime'>
    readonly isAutonomous: FieldRef<"ExecutionRecord", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ExecutionRecord findUnique
   */
  export type ExecutionRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionRecord
     */
    select?: ExecutionRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExecutionRecord
     */
    omit?: ExecutionRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionRecordInclude<ExtArgs> | null
    /**
     * Filter, which ExecutionRecord to fetch.
     */
    where: ExecutionRecordWhereUniqueInput
  }

  /**
   * ExecutionRecord findUniqueOrThrow
   */
  export type ExecutionRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionRecord
     */
    select?: ExecutionRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExecutionRecord
     */
    omit?: ExecutionRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionRecordInclude<ExtArgs> | null
    /**
     * Filter, which ExecutionRecord to fetch.
     */
    where: ExecutionRecordWhereUniqueInput
  }

  /**
   * ExecutionRecord findFirst
   */
  export type ExecutionRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionRecord
     */
    select?: ExecutionRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExecutionRecord
     */
    omit?: ExecutionRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionRecordInclude<ExtArgs> | null
    /**
     * Filter, which ExecutionRecord to fetch.
     */
    where?: ExecutionRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExecutionRecords to fetch.
     */
    orderBy?: ExecutionRecordOrderByWithRelationInput | ExecutionRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExecutionRecords.
     */
    cursor?: ExecutionRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExecutionRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExecutionRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExecutionRecords.
     */
    distinct?: ExecutionRecordScalarFieldEnum | ExecutionRecordScalarFieldEnum[]
  }

  /**
   * ExecutionRecord findFirstOrThrow
   */
  export type ExecutionRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionRecord
     */
    select?: ExecutionRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExecutionRecord
     */
    omit?: ExecutionRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionRecordInclude<ExtArgs> | null
    /**
     * Filter, which ExecutionRecord to fetch.
     */
    where?: ExecutionRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExecutionRecords to fetch.
     */
    orderBy?: ExecutionRecordOrderByWithRelationInput | ExecutionRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExecutionRecords.
     */
    cursor?: ExecutionRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExecutionRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExecutionRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExecutionRecords.
     */
    distinct?: ExecutionRecordScalarFieldEnum | ExecutionRecordScalarFieldEnum[]
  }

  /**
   * ExecutionRecord findMany
   */
  export type ExecutionRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionRecord
     */
    select?: ExecutionRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExecutionRecord
     */
    omit?: ExecutionRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionRecordInclude<ExtArgs> | null
    /**
     * Filter, which ExecutionRecords to fetch.
     */
    where?: ExecutionRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExecutionRecords to fetch.
     */
    orderBy?: ExecutionRecordOrderByWithRelationInput | ExecutionRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExecutionRecords.
     */
    cursor?: ExecutionRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExecutionRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExecutionRecords.
     */
    skip?: number
    distinct?: ExecutionRecordScalarFieldEnum | ExecutionRecordScalarFieldEnum[]
  }

  /**
   * ExecutionRecord create
   */
  export type ExecutionRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionRecord
     */
    select?: ExecutionRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExecutionRecord
     */
    omit?: ExecutionRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a ExecutionRecord.
     */
    data: XOR<ExecutionRecordCreateInput, ExecutionRecordUncheckedCreateInput>
  }

  /**
   * ExecutionRecord createMany
   */
  export type ExecutionRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExecutionRecords.
     */
    data: ExecutionRecordCreateManyInput | ExecutionRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExecutionRecord createManyAndReturn
   */
  export type ExecutionRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionRecord
     */
    select?: ExecutionRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExecutionRecord
     */
    omit?: ExecutionRecordOmit<ExtArgs> | null
    /**
     * The data used to create many ExecutionRecords.
     */
    data: ExecutionRecordCreateManyInput | ExecutionRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExecutionRecord update
   */
  export type ExecutionRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionRecord
     */
    select?: ExecutionRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExecutionRecord
     */
    omit?: ExecutionRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a ExecutionRecord.
     */
    data: XOR<ExecutionRecordUpdateInput, ExecutionRecordUncheckedUpdateInput>
    /**
     * Choose, which ExecutionRecord to update.
     */
    where: ExecutionRecordWhereUniqueInput
  }

  /**
   * ExecutionRecord updateMany
   */
  export type ExecutionRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExecutionRecords.
     */
    data: XOR<ExecutionRecordUpdateManyMutationInput, ExecutionRecordUncheckedUpdateManyInput>
    /**
     * Filter which ExecutionRecords to update
     */
    where?: ExecutionRecordWhereInput
    /**
     * Limit how many ExecutionRecords to update.
     */
    limit?: number
  }

  /**
   * ExecutionRecord updateManyAndReturn
   */
  export type ExecutionRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionRecord
     */
    select?: ExecutionRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExecutionRecord
     */
    omit?: ExecutionRecordOmit<ExtArgs> | null
    /**
     * The data used to update ExecutionRecords.
     */
    data: XOR<ExecutionRecordUpdateManyMutationInput, ExecutionRecordUncheckedUpdateManyInput>
    /**
     * Filter which ExecutionRecords to update
     */
    where?: ExecutionRecordWhereInput
    /**
     * Limit how many ExecutionRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExecutionRecord upsert
   */
  export type ExecutionRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionRecord
     */
    select?: ExecutionRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExecutionRecord
     */
    omit?: ExecutionRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the ExecutionRecord to update in case it exists.
     */
    where: ExecutionRecordWhereUniqueInput
    /**
     * In case the ExecutionRecord found by the `where` argument doesn't exist, create a new ExecutionRecord with this data.
     */
    create: XOR<ExecutionRecordCreateInput, ExecutionRecordUncheckedCreateInput>
    /**
     * In case the ExecutionRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExecutionRecordUpdateInput, ExecutionRecordUncheckedUpdateInput>
  }

  /**
   * ExecutionRecord delete
   */
  export type ExecutionRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionRecord
     */
    select?: ExecutionRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExecutionRecord
     */
    omit?: ExecutionRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionRecordInclude<ExtArgs> | null
    /**
     * Filter which ExecutionRecord to delete.
     */
    where: ExecutionRecordWhereUniqueInput
  }

  /**
   * ExecutionRecord deleteMany
   */
  export type ExecutionRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExecutionRecords to delete
     */
    where?: ExecutionRecordWhereInput
    /**
     * Limit how many ExecutionRecords to delete.
     */
    limit?: number
  }

  /**
   * ExecutionRecord without action
   */
  export type ExecutionRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionRecord
     */
    select?: ExecutionRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExecutionRecord
     */
    omit?: ExecutionRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionRecordInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    clerkId: 'clerkId',
    stripeCustomerId: 'stripeCustomerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    activeTaskCount: 'activeTaskCount',
    dailyUsageCount: 'dailyUsageCount',
    lastUsageReset: 'lastUsageReset',
    overageBalance: 'overageBalance',
    tier: 'tier',
    creditsTotal: 'creditsTotal',
    creditsUsed: 'creditsUsed',
    plan: 'plan'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const BotScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    type: 'type',
    status: 'status',
    isRunning: 'isRunning',
    desc: 'desc',
    lastRun: 'lastRun',
    createdAt: 'createdAt'
  };

  export type BotScalarFieldEnum = (typeof BotScalarFieldEnum)[keyof typeof BotScalarFieldEnum]


  export const AgentPersonaScalarFieldEnum: {
    id: 'id',
    botId: 'botId',
    systemPrompt: 'systemPrompt',
    riskLevel: 'riskLevel',
    capabilities: 'capabilities',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AgentPersonaScalarFieldEnum = (typeof AgentPersonaScalarFieldEnum)[keyof typeof AgentPersonaScalarFieldEnum]


  export const SubscriptionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    stripeSubscriptionId: 'stripeSubscriptionId',
    stripeCustomerId: 'stripeCustomerId',
    stripePriceId: 'stripePriceId',
    plan: 'plan',
    status: 'status',
    currentPeriodEnd: 'currentPeriodEnd',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    discountApplied: 'discountApplied'
  };

  export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum]


  export const ActivityScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    botId: 'botId',
    action: 'action',
    type: 'type',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type ActivityScalarFieldEnum = (typeof ActivityScalarFieldEnum)[keyof typeof ActivityScalarFieldEnum]


  export const LeadScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    businessName: 'businessName',
    website: 'website',
    email: 'email',
    phone: 'phone',
    industry: 'industry',
    location: 'location',
    source: 'source',
    createdAt: 'createdAt'
  };

  export type LeadScalarFieldEnum = (typeof LeadScalarFieldEnum)[keyof typeof LeadScalarFieldEnum]


  export const EmailLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    text: 'text',
    createdAt: 'createdAt'
  };

  export type EmailLogScalarFieldEnum = (typeof EmailLogScalarFieldEnum)[keyof typeof EmailLogScalarFieldEnum]


  export const VideoJobScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    status: 'status',
    videoUrl: 'videoUrl',
    prompt: 'prompt',
    settings: 'settings',
    createdAt: 'createdAt'
  };

  export type VideoJobScalarFieldEnum = (typeof VideoJobScalarFieldEnum)[keyof typeof VideoJobScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const PulseEventScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    message: 'message',
    type: 'type',
    isRead: 'isRead',
    createdAt: 'createdAt'
  };

  export type PulseEventScalarFieldEnum = (typeof PulseEventScalarFieldEnum)[keyof typeof PulseEventScalarFieldEnum]


  export const InboxMessageScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    sender: 'sender',
    subject: 'subject',
    body: 'body',
    isRead: 'isRead',
    createdAt: 'createdAt'
  };

  export type InboxMessageScalarFieldEnum = (typeof InboxMessageScalarFieldEnum)[keyof typeof InboxMessageScalarFieldEnum]


  export const ProcessedStripeEventScalarFieldEnum: {
    id: 'id',
    eventId: 'eventId',
    createdAt: 'createdAt'
  };

  export type ProcessedStripeEventScalarFieldEnum = (typeof ProcessedStripeEventScalarFieldEnum)[keyof typeof ProcessedStripeEventScalarFieldEnum]


  export const ExecutionRecordScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    status: 'status',
    timestamp: 'timestamp',
    isAutonomous: 'isAutonomous'
  };

  export type ExecutionRecordScalarFieldEnum = (typeof ExecutionRecordScalarFieldEnum)[keyof typeof ExecutionRecordScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    clerkId?: StringFilter<"User"> | string
    stripeCustomerId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    activeTaskCount?: IntFilter<"User"> | number
    dailyUsageCount?: IntFilter<"User"> | number
    lastUsageReset?: DateTimeFilter<"User"> | Date | string
    overageBalance?: IntFilter<"User"> | number
    tier?: StringFilter<"User"> | string
    creditsTotal?: IntFilter<"User"> | number
    creditsUsed?: IntFilter<"User"> | number
    plan?: StringFilter<"User"> | string
    activities?: ActivityListRelationFilter
    bots?: BotListRelationFilter
    emailLogs?: EmailLogListRelationFilter
    leads?: LeadListRelationFilter
    subscriptions?: XOR<SubscriptionNullableScalarRelationFilter, SubscriptionWhereInput> | null
    tasks?: TaskListRelationFilter
    videoJobs?: VideoJobListRelationFilter
    executionRecords?: ExecutionRecordListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    clerkId?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    activeTaskCount?: SortOrder
    dailyUsageCount?: SortOrder
    lastUsageReset?: SortOrder
    overageBalance?: SortOrder
    tier?: SortOrder
    creditsTotal?: SortOrder
    creditsUsed?: SortOrder
    plan?: SortOrder
    activities?: ActivityOrderByRelationAggregateInput
    bots?: BotOrderByRelationAggregateInput
    emailLogs?: EmailLogOrderByRelationAggregateInput
    leads?: LeadOrderByRelationAggregateInput
    subscriptions?: SubscriptionOrderByWithRelationInput
    tasks?: TaskOrderByRelationAggregateInput
    videoJobs?: VideoJobOrderByRelationAggregateInput
    executionRecords?: ExecutionRecordOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    clerkId?: string
    stripeCustomerId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    activeTaskCount?: IntFilter<"User"> | number
    dailyUsageCount?: IntFilter<"User"> | number
    lastUsageReset?: DateTimeFilter<"User"> | Date | string
    overageBalance?: IntFilter<"User"> | number
    tier?: StringFilter<"User"> | string
    creditsTotal?: IntFilter<"User"> | number
    creditsUsed?: IntFilter<"User"> | number
    plan?: StringFilter<"User"> | string
    activities?: ActivityListRelationFilter
    bots?: BotListRelationFilter
    emailLogs?: EmailLogListRelationFilter
    leads?: LeadListRelationFilter
    subscriptions?: XOR<SubscriptionNullableScalarRelationFilter, SubscriptionWhereInput> | null
    tasks?: TaskListRelationFilter
    videoJobs?: VideoJobListRelationFilter
    executionRecords?: ExecutionRecordListRelationFilter
  }, "id" | "email" | "clerkId" | "stripeCustomerId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    clerkId?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    activeTaskCount?: SortOrder
    dailyUsageCount?: SortOrder
    lastUsageReset?: SortOrder
    overageBalance?: SortOrder
    tier?: SortOrder
    creditsTotal?: SortOrder
    creditsUsed?: SortOrder
    plan?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    clerkId?: StringWithAggregatesFilter<"User"> | string
    stripeCustomerId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    activeTaskCount?: IntWithAggregatesFilter<"User"> | number
    dailyUsageCount?: IntWithAggregatesFilter<"User"> | number
    lastUsageReset?: DateTimeWithAggregatesFilter<"User"> | Date | string
    overageBalance?: IntWithAggregatesFilter<"User"> | number
    tier?: StringWithAggregatesFilter<"User"> | string
    creditsTotal?: IntWithAggregatesFilter<"User"> | number
    creditsUsed?: IntWithAggregatesFilter<"User"> | number
    plan?: StringWithAggregatesFilter<"User"> | string
  }

  export type BotWhereInput = {
    AND?: BotWhereInput | BotWhereInput[]
    OR?: BotWhereInput[]
    NOT?: BotWhereInput | BotWhereInput[]
    id?: StringFilter<"Bot"> | string
    userId?: StringFilter<"Bot"> | string
    name?: StringFilter<"Bot"> | string
    type?: StringFilter<"Bot"> | string
    status?: StringFilter<"Bot"> | string
    isRunning?: BoolFilter<"Bot"> | boolean
    desc?: StringFilter<"Bot"> | string
    lastRun?: DateTimeFilter<"Bot"> | Date | string
    createdAt?: DateTimeFilter<"Bot"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    activities?: ActivityListRelationFilter
    persona?: XOR<AgentPersonaNullableScalarRelationFilter, AgentPersonaWhereInput> | null
  }

  export type BotOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    status?: SortOrder
    isRunning?: SortOrder
    desc?: SortOrder
    lastRun?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    activities?: ActivityOrderByRelationAggregateInput
    persona?: AgentPersonaOrderByWithRelationInput
  }

  export type BotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BotWhereInput | BotWhereInput[]
    OR?: BotWhereInput[]
    NOT?: BotWhereInput | BotWhereInput[]
    userId?: StringFilter<"Bot"> | string
    name?: StringFilter<"Bot"> | string
    type?: StringFilter<"Bot"> | string
    status?: StringFilter<"Bot"> | string
    isRunning?: BoolFilter<"Bot"> | boolean
    desc?: StringFilter<"Bot"> | string
    lastRun?: DateTimeFilter<"Bot"> | Date | string
    createdAt?: DateTimeFilter<"Bot"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    activities?: ActivityListRelationFilter
    persona?: XOR<AgentPersonaNullableScalarRelationFilter, AgentPersonaWhereInput> | null
  }, "id">

  export type BotOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    status?: SortOrder
    isRunning?: SortOrder
    desc?: SortOrder
    lastRun?: SortOrder
    createdAt?: SortOrder
    _count?: BotCountOrderByAggregateInput
    _max?: BotMaxOrderByAggregateInput
    _min?: BotMinOrderByAggregateInput
  }

  export type BotScalarWhereWithAggregatesInput = {
    AND?: BotScalarWhereWithAggregatesInput | BotScalarWhereWithAggregatesInput[]
    OR?: BotScalarWhereWithAggregatesInput[]
    NOT?: BotScalarWhereWithAggregatesInput | BotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Bot"> | string
    userId?: StringWithAggregatesFilter<"Bot"> | string
    name?: StringWithAggregatesFilter<"Bot"> | string
    type?: StringWithAggregatesFilter<"Bot"> | string
    status?: StringWithAggregatesFilter<"Bot"> | string
    isRunning?: BoolWithAggregatesFilter<"Bot"> | boolean
    desc?: StringWithAggregatesFilter<"Bot"> | string
    lastRun?: DateTimeWithAggregatesFilter<"Bot"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Bot"> | Date | string
  }

  export type AgentPersonaWhereInput = {
    AND?: AgentPersonaWhereInput | AgentPersonaWhereInput[]
    OR?: AgentPersonaWhereInput[]
    NOT?: AgentPersonaWhereInput | AgentPersonaWhereInput[]
    id?: StringFilter<"AgentPersona"> | string
    botId?: StringFilter<"AgentPersona"> | string
    systemPrompt?: StringFilter<"AgentPersona"> | string
    riskLevel?: StringFilter<"AgentPersona"> | string
    capabilities?: StringNullableListFilter<"AgentPersona">
    createdAt?: DateTimeFilter<"AgentPersona"> | Date | string
    updatedAt?: DateTimeFilter<"AgentPersona"> | Date | string
    bot?: XOR<BotScalarRelationFilter, BotWhereInput>
  }

  export type AgentPersonaOrderByWithRelationInput = {
    id?: SortOrder
    botId?: SortOrder
    systemPrompt?: SortOrder
    riskLevel?: SortOrder
    capabilities?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bot?: BotOrderByWithRelationInput
  }

  export type AgentPersonaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    botId?: string
    AND?: AgentPersonaWhereInput | AgentPersonaWhereInput[]
    OR?: AgentPersonaWhereInput[]
    NOT?: AgentPersonaWhereInput | AgentPersonaWhereInput[]
    systemPrompt?: StringFilter<"AgentPersona"> | string
    riskLevel?: StringFilter<"AgentPersona"> | string
    capabilities?: StringNullableListFilter<"AgentPersona">
    createdAt?: DateTimeFilter<"AgentPersona"> | Date | string
    updatedAt?: DateTimeFilter<"AgentPersona"> | Date | string
    bot?: XOR<BotScalarRelationFilter, BotWhereInput>
  }, "id" | "botId">

  export type AgentPersonaOrderByWithAggregationInput = {
    id?: SortOrder
    botId?: SortOrder
    systemPrompt?: SortOrder
    riskLevel?: SortOrder
    capabilities?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AgentPersonaCountOrderByAggregateInput
    _max?: AgentPersonaMaxOrderByAggregateInput
    _min?: AgentPersonaMinOrderByAggregateInput
  }

  export type AgentPersonaScalarWhereWithAggregatesInput = {
    AND?: AgentPersonaScalarWhereWithAggregatesInput | AgentPersonaScalarWhereWithAggregatesInput[]
    OR?: AgentPersonaScalarWhereWithAggregatesInput[]
    NOT?: AgentPersonaScalarWhereWithAggregatesInput | AgentPersonaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AgentPersona"> | string
    botId?: StringWithAggregatesFilter<"AgentPersona"> | string
    systemPrompt?: StringWithAggregatesFilter<"AgentPersona"> | string
    riskLevel?: StringWithAggregatesFilter<"AgentPersona"> | string
    capabilities?: StringNullableListFilter<"AgentPersona">
    createdAt?: DateTimeWithAggregatesFilter<"AgentPersona"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AgentPersona"> | Date | string
  }

  export type SubscriptionWhereInput = {
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    id?: StringFilter<"Subscription"> | string
    userId?: StringFilter<"Subscription"> | string
    stripeSubscriptionId?: StringNullableFilter<"Subscription"> | string | null
    stripeCustomerId?: StringNullableFilter<"Subscription"> | string | null
    stripePriceId?: StringNullableFilter<"Subscription"> | string | null
    plan?: StringNullableFilter<"Subscription"> | string | null
    status?: StringNullableFilter<"Subscription"> | string | null
    currentPeriodEnd?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    discountApplied?: BoolFilter<"Subscription"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    stripePriceId?: SortOrderInput | SortOrder
    plan?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    currentPeriodEnd?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    discountApplied?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    stripeSubscriptionId?: string
    stripeCustomerId?: string
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    stripePriceId?: StringNullableFilter<"Subscription"> | string | null
    plan?: StringNullableFilter<"Subscription"> | string | null
    status?: StringNullableFilter<"Subscription"> | string | null
    currentPeriodEnd?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    discountApplied?: BoolFilter<"Subscription"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId" | "stripeSubscriptionId" | "stripeCustomerId">

  export type SubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    stripePriceId?: SortOrderInput | SortOrder
    plan?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    currentPeriodEnd?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    discountApplied?: SortOrder
    _count?: SubscriptionCountOrderByAggregateInput
    _max?: SubscriptionMaxOrderByAggregateInput
    _min?: SubscriptionMinOrderByAggregateInput
  }

  export type SubscriptionScalarWhereWithAggregatesInput = {
    AND?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    OR?: SubscriptionScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Subscription"> | string
    userId?: StringWithAggregatesFilter<"Subscription"> | string
    stripeSubscriptionId?: StringNullableWithAggregatesFilter<"Subscription"> | string | null
    stripeCustomerId?: StringNullableWithAggregatesFilter<"Subscription"> | string | null
    stripePriceId?: StringNullableWithAggregatesFilter<"Subscription"> | string | null
    plan?: StringNullableWithAggregatesFilter<"Subscription"> | string | null
    status?: StringNullableWithAggregatesFilter<"Subscription"> | string | null
    currentPeriodEnd?: DateTimeNullableWithAggregatesFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    discountApplied?: BoolWithAggregatesFilter<"Subscription"> | boolean
  }

  export type ActivityWhereInput = {
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    id?: StringFilter<"Activity"> | string
    userId?: StringFilter<"Activity"> | string
    botId?: StringNullableFilter<"Activity"> | string | null
    action?: StringFilter<"Activity"> | string
    type?: StringFilter<"Activity"> | string
    metadata?: JsonNullableFilter<"Activity">
    createdAt?: DateTimeFilter<"Activity"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    bot?: XOR<BotNullableScalarRelationFilter, BotWhereInput> | null
  }

  export type ActivityOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    botId?: SortOrderInput | SortOrder
    action?: SortOrder
    type?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    bot?: BotOrderByWithRelationInput
  }

  export type ActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    userId?: StringFilter<"Activity"> | string
    botId?: StringNullableFilter<"Activity"> | string | null
    action?: StringFilter<"Activity"> | string
    type?: StringFilter<"Activity"> | string
    metadata?: JsonNullableFilter<"Activity">
    createdAt?: DateTimeFilter<"Activity"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    bot?: XOR<BotNullableScalarRelationFilter, BotWhereInput> | null
  }, "id">

  export type ActivityOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    botId?: SortOrderInput | SortOrder
    action?: SortOrder
    type?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ActivityCountOrderByAggregateInput
    _max?: ActivityMaxOrderByAggregateInput
    _min?: ActivityMinOrderByAggregateInput
  }

  export type ActivityScalarWhereWithAggregatesInput = {
    AND?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    OR?: ActivityScalarWhereWithAggregatesInput[]
    NOT?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Activity"> | string
    userId?: StringWithAggregatesFilter<"Activity"> | string
    botId?: StringNullableWithAggregatesFilter<"Activity"> | string | null
    action?: StringWithAggregatesFilter<"Activity"> | string
    type?: StringWithAggregatesFilter<"Activity"> | string
    metadata?: JsonNullableWithAggregatesFilter<"Activity">
    createdAt?: DateTimeWithAggregatesFilter<"Activity"> | Date | string
  }

  export type LeadWhereInput = {
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    id?: StringFilter<"Lead"> | string
    userId?: StringFilter<"Lead"> | string
    businessName?: StringFilter<"Lead"> | string
    website?: StringNullableFilter<"Lead"> | string | null
    email?: StringNullableFilter<"Lead"> | string | null
    phone?: StringNullableFilter<"Lead"> | string | null
    industry?: StringNullableFilter<"Lead"> | string | null
    location?: StringNullableFilter<"Lead"> | string | null
    source?: StringFilter<"Lead"> | string
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type LeadOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrder
    website?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type LeadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    userId?: StringFilter<"Lead"> | string
    businessName?: StringFilter<"Lead"> | string
    website?: StringNullableFilter<"Lead"> | string | null
    email?: StringNullableFilter<"Lead"> | string | null
    phone?: StringNullableFilter<"Lead"> | string | null
    industry?: StringNullableFilter<"Lead"> | string | null
    location?: StringNullableFilter<"Lead"> | string | null
    source?: StringFilter<"Lead"> | string
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type LeadOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrder
    website?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    _count?: LeadCountOrderByAggregateInput
    _max?: LeadMaxOrderByAggregateInput
    _min?: LeadMinOrderByAggregateInput
  }

  export type LeadScalarWhereWithAggregatesInput = {
    AND?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    OR?: LeadScalarWhereWithAggregatesInput[]
    NOT?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Lead"> | string
    userId?: StringWithAggregatesFilter<"Lead"> | string
    businessName?: StringWithAggregatesFilter<"Lead"> | string
    website?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    email?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    industry?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    location?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    source?: StringWithAggregatesFilter<"Lead"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
  }

  export type EmailLogWhereInput = {
    AND?: EmailLogWhereInput | EmailLogWhereInput[]
    OR?: EmailLogWhereInput[]
    NOT?: EmailLogWhereInput | EmailLogWhereInput[]
    id?: StringFilter<"EmailLog"> | string
    userId?: StringFilter<"EmailLog"> | string
    text?: StringFilter<"EmailLog"> | string
    createdAt?: DateTimeFilter<"EmailLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type EmailLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type EmailLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmailLogWhereInput | EmailLogWhereInput[]
    OR?: EmailLogWhereInput[]
    NOT?: EmailLogWhereInput | EmailLogWhereInput[]
    userId?: StringFilter<"EmailLog"> | string
    text?: StringFilter<"EmailLog"> | string
    createdAt?: DateTimeFilter<"EmailLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type EmailLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
    _count?: EmailLogCountOrderByAggregateInput
    _max?: EmailLogMaxOrderByAggregateInput
    _min?: EmailLogMinOrderByAggregateInput
  }

  export type EmailLogScalarWhereWithAggregatesInput = {
    AND?: EmailLogScalarWhereWithAggregatesInput | EmailLogScalarWhereWithAggregatesInput[]
    OR?: EmailLogScalarWhereWithAggregatesInput[]
    NOT?: EmailLogScalarWhereWithAggregatesInput | EmailLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmailLog"> | string
    userId?: StringWithAggregatesFilter<"EmailLog"> | string
    text?: StringWithAggregatesFilter<"EmailLog"> | string
    createdAt?: DateTimeWithAggregatesFilter<"EmailLog"> | Date | string
  }

  export type VideoJobWhereInput = {
    AND?: VideoJobWhereInput | VideoJobWhereInput[]
    OR?: VideoJobWhereInput[]
    NOT?: VideoJobWhereInput | VideoJobWhereInput[]
    id?: StringFilter<"VideoJob"> | string
    userId?: StringFilter<"VideoJob"> | string
    status?: StringFilter<"VideoJob"> | string
    videoUrl?: StringNullableFilter<"VideoJob"> | string | null
    prompt?: StringNullableFilter<"VideoJob"> | string | null
    settings?: JsonNullableFilter<"VideoJob">
    createdAt?: DateTimeFilter<"VideoJob"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type VideoJobOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    videoUrl?: SortOrderInput | SortOrder
    prompt?: SortOrderInput | SortOrder
    settings?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type VideoJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VideoJobWhereInput | VideoJobWhereInput[]
    OR?: VideoJobWhereInput[]
    NOT?: VideoJobWhereInput | VideoJobWhereInput[]
    userId?: StringFilter<"VideoJob"> | string
    status?: StringFilter<"VideoJob"> | string
    videoUrl?: StringNullableFilter<"VideoJob"> | string | null
    prompt?: StringNullableFilter<"VideoJob"> | string | null
    settings?: JsonNullableFilter<"VideoJob">
    createdAt?: DateTimeFilter<"VideoJob"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type VideoJobOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    videoUrl?: SortOrderInput | SortOrder
    prompt?: SortOrderInput | SortOrder
    settings?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: VideoJobCountOrderByAggregateInput
    _max?: VideoJobMaxOrderByAggregateInput
    _min?: VideoJobMinOrderByAggregateInput
  }

  export type VideoJobScalarWhereWithAggregatesInput = {
    AND?: VideoJobScalarWhereWithAggregatesInput | VideoJobScalarWhereWithAggregatesInput[]
    OR?: VideoJobScalarWhereWithAggregatesInput[]
    NOT?: VideoJobScalarWhereWithAggregatesInput | VideoJobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VideoJob"> | string
    userId?: StringWithAggregatesFilter<"VideoJob"> | string
    status?: StringWithAggregatesFilter<"VideoJob"> | string
    videoUrl?: StringNullableWithAggregatesFilter<"VideoJob"> | string | null
    prompt?: StringNullableWithAggregatesFilter<"VideoJob"> | string | null
    settings?: JsonNullableWithAggregatesFilter<"VideoJob">
    createdAt?: DateTimeWithAggregatesFilter<"VideoJob"> | Date | string
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: StringFilter<"Task"> | string
    userId?: StringFilter<"Task"> | string
    type?: StringFilter<"Task"> | string
    status?: StringFilter<"Task"> | string
    createdAt?: DateTimeFilter<"Task"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    userId?: StringFilter<"Task"> | string
    type?: StringFilter<"Task"> | string
    status?: StringFilter<"Task"> | string
    createdAt?: DateTimeFilter<"Task"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Task"> | string
    userId?: StringWithAggregatesFilter<"Task"> | string
    type?: StringWithAggregatesFilter<"Task"> | string
    status?: StringWithAggregatesFilter<"Task"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
  }

  export type PulseEventWhereInput = {
    AND?: PulseEventWhereInput | PulseEventWhereInput[]
    OR?: PulseEventWhereInput[]
    NOT?: PulseEventWhereInput | PulseEventWhereInput[]
    id?: StringFilter<"PulseEvent"> | string
    userId?: StringFilter<"PulseEvent"> | string
    title?: StringFilter<"PulseEvent"> | string
    message?: StringFilter<"PulseEvent"> | string
    type?: StringFilter<"PulseEvent"> | string
    isRead?: BoolFilter<"PulseEvent"> | boolean
    createdAt?: DateTimeFilter<"PulseEvent"> | Date | string
  }

  export type PulseEventOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type PulseEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PulseEventWhereInput | PulseEventWhereInput[]
    OR?: PulseEventWhereInput[]
    NOT?: PulseEventWhereInput | PulseEventWhereInput[]
    userId?: StringFilter<"PulseEvent"> | string
    title?: StringFilter<"PulseEvent"> | string
    message?: StringFilter<"PulseEvent"> | string
    type?: StringFilter<"PulseEvent"> | string
    isRead?: BoolFilter<"PulseEvent"> | boolean
    createdAt?: DateTimeFilter<"PulseEvent"> | Date | string
  }, "id">

  export type PulseEventOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    _count?: PulseEventCountOrderByAggregateInput
    _max?: PulseEventMaxOrderByAggregateInput
    _min?: PulseEventMinOrderByAggregateInput
  }

  export type PulseEventScalarWhereWithAggregatesInput = {
    AND?: PulseEventScalarWhereWithAggregatesInput | PulseEventScalarWhereWithAggregatesInput[]
    OR?: PulseEventScalarWhereWithAggregatesInput[]
    NOT?: PulseEventScalarWhereWithAggregatesInput | PulseEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PulseEvent"> | string
    userId?: StringWithAggregatesFilter<"PulseEvent"> | string
    title?: StringWithAggregatesFilter<"PulseEvent"> | string
    message?: StringWithAggregatesFilter<"PulseEvent"> | string
    type?: StringWithAggregatesFilter<"PulseEvent"> | string
    isRead?: BoolWithAggregatesFilter<"PulseEvent"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"PulseEvent"> | Date | string
  }

  export type InboxMessageWhereInput = {
    AND?: InboxMessageWhereInput | InboxMessageWhereInput[]
    OR?: InboxMessageWhereInput[]
    NOT?: InboxMessageWhereInput | InboxMessageWhereInput[]
    id?: StringFilter<"InboxMessage"> | string
    userId?: StringFilter<"InboxMessage"> | string
    sender?: StringFilter<"InboxMessage"> | string
    subject?: StringFilter<"InboxMessage"> | string
    body?: StringFilter<"InboxMessage"> | string
    isRead?: BoolFilter<"InboxMessage"> | boolean
    createdAt?: DateTimeFilter<"InboxMessage"> | Date | string
  }

  export type InboxMessageOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    sender?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type InboxMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InboxMessageWhereInput | InboxMessageWhereInput[]
    OR?: InboxMessageWhereInput[]
    NOT?: InboxMessageWhereInput | InboxMessageWhereInput[]
    userId?: StringFilter<"InboxMessage"> | string
    sender?: StringFilter<"InboxMessage"> | string
    subject?: StringFilter<"InboxMessage"> | string
    body?: StringFilter<"InboxMessage"> | string
    isRead?: BoolFilter<"InboxMessage"> | boolean
    createdAt?: DateTimeFilter<"InboxMessage"> | Date | string
  }, "id">

  export type InboxMessageOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    sender?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    _count?: InboxMessageCountOrderByAggregateInput
    _max?: InboxMessageMaxOrderByAggregateInput
    _min?: InboxMessageMinOrderByAggregateInput
  }

  export type InboxMessageScalarWhereWithAggregatesInput = {
    AND?: InboxMessageScalarWhereWithAggregatesInput | InboxMessageScalarWhereWithAggregatesInput[]
    OR?: InboxMessageScalarWhereWithAggregatesInput[]
    NOT?: InboxMessageScalarWhereWithAggregatesInput | InboxMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InboxMessage"> | string
    userId?: StringWithAggregatesFilter<"InboxMessage"> | string
    sender?: StringWithAggregatesFilter<"InboxMessage"> | string
    subject?: StringWithAggregatesFilter<"InboxMessage"> | string
    body?: StringWithAggregatesFilter<"InboxMessage"> | string
    isRead?: BoolWithAggregatesFilter<"InboxMessage"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"InboxMessage"> | Date | string
  }

  export type ProcessedStripeEventWhereInput = {
    AND?: ProcessedStripeEventWhereInput | ProcessedStripeEventWhereInput[]
    OR?: ProcessedStripeEventWhereInput[]
    NOT?: ProcessedStripeEventWhereInput | ProcessedStripeEventWhereInput[]
    id?: StringFilter<"ProcessedStripeEvent"> | string
    eventId?: StringFilter<"ProcessedStripeEvent"> | string
    createdAt?: DateTimeFilter<"ProcessedStripeEvent"> | Date | string
  }

  export type ProcessedStripeEventOrderByWithRelationInput = {
    id?: SortOrder
    eventId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProcessedStripeEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    eventId?: string
    AND?: ProcessedStripeEventWhereInput | ProcessedStripeEventWhereInput[]
    OR?: ProcessedStripeEventWhereInput[]
    NOT?: ProcessedStripeEventWhereInput | ProcessedStripeEventWhereInput[]
    createdAt?: DateTimeFilter<"ProcessedStripeEvent"> | Date | string
  }, "id" | "eventId">

  export type ProcessedStripeEventOrderByWithAggregationInput = {
    id?: SortOrder
    eventId?: SortOrder
    createdAt?: SortOrder
    _count?: ProcessedStripeEventCountOrderByAggregateInput
    _max?: ProcessedStripeEventMaxOrderByAggregateInput
    _min?: ProcessedStripeEventMinOrderByAggregateInput
  }

  export type ProcessedStripeEventScalarWhereWithAggregatesInput = {
    AND?: ProcessedStripeEventScalarWhereWithAggregatesInput | ProcessedStripeEventScalarWhereWithAggregatesInput[]
    OR?: ProcessedStripeEventScalarWhereWithAggregatesInput[]
    NOT?: ProcessedStripeEventScalarWhereWithAggregatesInput | ProcessedStripeEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProcessedStripeEvent"> | string
    eventId?: StringWithAggregatesFilter<"ProcessedStripeEvent"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ProcessedStripeEvent"> | Date | string
  }

  export type ExecutionRecordWhereInput = {
    AND?: ExecutionRecordWhereInput | ExecutionRecordWhereInput[]
    OR?: ExecutionRecordWhereInput[]
    NOT?: ExecutionRecordWhereInput | ExecutionRecordWhereInput[]
    id?: StringFilter<"ExecutionRecord"> | string
    userId?: StringFilter<"ExecutionRecord"> | string
    status?: StringFilter<"ExecutionRecord"> | string
    timestamp?: DateTimeFilter<"ExecutionRecord"> | Date | string
    isAutonomous?: BoolFilter<"ExecutionRecord"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ExecutionRecordOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    isAutonomous?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ExecutionRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExecutionRecordWhereInput | ExecutionRecordWhereInput[]
    OR?: ExecutionRecordWhereInput[]
    NOT?: ExecutionRecordWhereInput | ExecutionRecordWhereInput[]
    userId?: StringFilter<"ExecutionRecord"> | string
    status?: StringFilter<"ExecutionRecord"> | string
    timestamp?: DateTimeFilter<"ExecutionRecord"> | Date | string
    isAutonomous?: BoolFilter<"ExecutionRecord"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ExecutionRecordOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    isAutonomous?: SortOrder
    _count?: ExecutionRecordCountOrderByAggregateInput
    _max?: ExecutionRecordMaxOrderByAggregateInput
    _min?: ExecutionRecordMinOrderByAggregateInput
  }

  export type ExecutionRecordScalarWhereWithAggregatesInput = {
    AND?: ExecutionRecordScalarWhereWithAggregatesInput | ExecutionRecordScalarWhereWithAggregatesInput[]
    OR?: ExecutionRecordScalarWhereWithAggregatesInput[]
    NOT?: ExecutionRecordScalarWhereWithAggregatesInput | ExecutionRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExecutionRecord"> | string
    userId?: StringWithAggregatesFilter<"ExecutionRecord"> | string
    status?: StringWithAggregatesFilter<"ExecutionRecord"> | string
    timestamp?: DateTimeWithAggregatesFilter<"ExecutionRecord"> | Date | string
    isAutonomous?: BoolWithAggregatesFilter<"ExecutionRecord"> | boolean
  }

  export type UserCreateInput = {
    id?: string
    email: string
    clerkId: string
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activeTaskCount?: number
    dailyUsageCount?: number
    lastUsageReset?: Date | string
    overageBalance?: number
    tier?: string
    creditsTotal?: number
    creditsUsed?: number
    plan?: string
    activities?: ActivityCreateNestedManyWithoutUserInput
    bots?: BotCreateNestedManyWithoutUserInput
    emailLogs?: EmailLogCreateNestedManyWithoutUserInput
    leads?: LeadCreateNestedManyWithoutUserInput
    subscriptions?: SubscriptionCreateNestedOneWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    videoJobs?: VideoJobCreateNestedManyWithoutUserInput
    executionRecords?: ExecutionRecordCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    clerkId: string
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activeTaskCount?: number
    dailyUsageCount?: number
    lastUsageReset?: Date | string
    overageBalance?: number
    tier?: string
    creditsTotal?: number
    creditsUsed?: number
    plan?: string
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    bots?: BotUncheckedCreateNestedManyWithoutUserInput
    emailLogs?: EmailLogUncheckedCreateNestedManyWithoutUserInput
    leads?: LeadUncheckedCreateNestedManyWithoutUserInput
    subscriptions?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    videoJobs?: VideoJobUncheckedCreateNestedManyWithoutUserInput
    executionRecords?: ExecutionRecordUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeTaskCount?: IntFieldUpdateOperationsInput | number
    dailyUsageCount?: IntFieldUpdateOperationsInput | number
    lastUsageReset?: DateTimeFieldUpdateOperationsInput | Date | string
    overageBalance?: IntFieldUpdateOperationsInput | number
    tier?: StringFieldUpdateOperationsInput | string
    creditsTotal?: IntFieldUpdateOperationsInput | number
    creditsUsed?: IntFieldUpdateOperationsInput | number
    plan?: StringFieldUpdateOperationsInput | string
    activities?: ActivityUpdateManyWithoutUserNestedInput
    bots?: BotUpdateManyWithoutUserNestedInput
    emailLogs?: EmailLogUpdateManyWithoutUserNestedInput
    leads?: LeadUpdateManyWithoutUserNestedInput
    subscriptions?: SubscriptionUpdateOneWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    videoJobs?: VideoJobUpdateManyWithoutUserNestedInput
    executionRecords?: ExecutionRecordUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeTaskCount?: IntFieldUpdateOperationsInput | number
    dailyUsageCount?: IntFieldUpdateOperationsInput | number
    lastUsageReset?: DateTimeFieldUpdateOperationsInput | Date | string
    overageBalance?: IntFieldUpdateOperationsInput | number
    tier?: StringFieldUpdateOperationsInput | string
    creditsTotal?: IntFieldUpdateOperationsInput | number
    creditsUsed?: IntFieldUpdateOperationsInput | number
    plan?: StringFieldUpdateOperationsInput | string
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    bots?: BotUncheckedUpdateManyWithoutUserNestedInput
    emailLogs?: EmailLogUncheckedUpdateManyWithoutUserNestedInput
    leads?: LeadUncheckedUpdateManyWithoutUserNestedInput
    subscriptions?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    videoJobs?: VideoJobUncheckedUpdateManyWithoutUserNestedInput
    executionRecords?: ExecutionRecordUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    clerkId: string
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activeTaskCount?: number
    dailyUsageCount?: number
    lastUsageReset?: Date | string
    overageBalance?: number
    tier?: string
    creditsTotal?: number
    creditsUsed?: number
    plan?: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeTaskCount?: IntFieldUpdateOperationsInput | number
    dailyUsageCount?: IntFieldUpdateOperationsInput | number
    lastUsageReset?: DateTimeFieldUpdateOperationsInput | Date | string
    overageBalance?: IntFieldUpdateOperationsInput | number
    tier?: StringFieldUpdateOperationsInput | string
    creditsTotal?: IntFieldUpdateOperationsInput | number
    creditsUsed?: IntFieldUpdateOperationsInput | number
    plan?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeTaskCount?: IntFieldUpdateOperationsInput | number
    dailyUsageCount?: IntFieldUpdateOperationsInput | number
    lastUsageReset?: DateTimeFieldUpdateOperationsInput | Date | string
    overageBalance?: IntFieldUpdateOperationsInput | number
    tier?: StringFieldUpdateOperationsInput | string
    creditsTotal?: IntFieldUpdateOperationsInput | number
    creditsUsed?: IntFieldUpdateOperationsInput | number
    plan?: StringFieldUpdateOperationsInput | string
  }

  export type BotCreateInput = {
    id?: string
    name: string
    type: string
    status?: string
    isRunning?: boolean
    desc: string
    lastRun?: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutBotsInput
    activities?: ActivityCreateNestedManyWithoutBotInput
    persona?: AgentPersonaCreateNestedOneWithoutBotInput
  }

  export type BotUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    type: string
    status?: string
    isRunning?: boolean
    desc: string
    lastRun?: Date | string
    createdAt?: Date | string
    activities?: ActivityUncheckedCreateNestedManyWithoutBotInput
    persona?: AgentPersonaUncheckedCreateNestedOneWithoutBotInput
  }

  export type BotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    isRunning?: BoolFieldUpdateOperationsInput | boolean
    desc?: StringFieldUpdateOperationsInput | string
    lastRun?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBotsNestedInput
    activities?: ActivityUpdateManyWithoutBotNestedInput
    persona?: AgentPersonaUpdateOneWithoutBotNestedInput
  }

  export type BotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    isRunning?: BoolFieldUpdateOperationsInput | boolean
    desc?: StringFieldUpdateOperationsInput | string
    lastRun?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUncheckedUpdateManyWithoutBotNestedInput
    persona?: AgentPersonaUncheckedUpdateOneWithoutBotNestedInput
  }

  export type BotCreateManyInput = {
    id?: string
    userId: string
    name: string
    type: string
    status?: string
    isRunning?: boolean
    desc: string
    lastRun?: Date | string
    createdAt?: Date | string
  }

  export type BotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    isRunning?: BoolFieldUpdateOperationsInput | boolean
    desc?: StringFieldUpdateOperationsInput | string
    lastRun?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    isRunning?: BoolFieldUpdateOperationsInput | boolean
    desc?: StringFieldUpdateOperationsInput | string
    lastRun?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentPersonaCreateInput = {
    id?: string
    systemPrompt: string
    riskLevel?: string
    capabilities?: AgentPersonaCreatecapabilitiesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    bot: BotCreateNestedOneWithoutPersonaInput
  }

  export type AgentPersonaUncheckedCreateInput = {
    id?: string
    botId: string
    systemPrompt: string
    riskLevel?: string
    capabilities?: AgentPersonaCreatecapabilitiesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentPersonaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    systemPrompt?: StringFieldUpdateOperationsInput | string
    riskLevel?: StringFieldUpdateOperationsInput | string
    capabilities?: AgentPersonaUpdatecapabilitiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bot?: BotUpdateOneRequiredWithoutPersonaNestedInput
  }

  export type AgentPersonaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    botId?: StringFieldUpdateOperationsInput | string
    systemPrompt?: StringFieldUpdateOperationsInput | string
    riskLevel?: StringFieldUpdateOperationsInput | string
    capabilities?: AgentPersonaUpdatecapabilitiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentPersonaCreateManyInput = {
    id?: string
    botId: string
    systemPrompt: string
    riskLevel?: string
    capabilities?: AgentPersonaCreatecapabilitiesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentPersonaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    systemPrompt?: StringFieldUpdateOperationsInput | string
    riskLevel?: StringFieldUpdateOperationsInput | string
    capabilities?: AgentPersonaUpdatecapabilitiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentPersonaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    botId?: StringFieldUpdateOperationsInput | string
    systemPrompt?: StringFieldUpdateOperationsInput | string
    riskLevel?: StringFieldUpdateOperationsInput | string
    capabilities?: AgentPersonaUpdatecapabilitiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateInput = {
    id?: string
    stripeSubscriptionId?: string | null
    stripeCustomerId?: string | null
    stripePriceId?: string | null
    plan?: string | null
    status?: string | null
    currentPeriodEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    discountApplied?: boolean
    user: UserCreateNestedOneWithoutSubscriptionsInput
  }

  export type SubscriptionUncheckedCreateInput = {
    id?: string
    userId: string
    stripeSubscriptionId?: string | null
    stripeCustomerId?: string | null
    stripePriceId?: string | null
    plan?: string | null
    status?: string | null
    currentPeriodEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    discountApplied?: boolean
  }

  export type SubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discountApplied?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutSubscriptionsNestedInput
  }

  export type SubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discountApplied?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SubscriptionCreateManyInput = {
    id?: string
    userId: string
    stripeSubscriptionId?: string | null
    stripeCustomerId?: string | null
    stripePriceId?: string | null
    plan?: string | null
    status?: string | null
    currentPeriodEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    discountApplied?: boolean
  }

  export type SubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discountApplied?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discountApplied?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivityCreateInput = {
    id?: string
    action: string
    type?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutActivitiesInput
    bot?: BotCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityUncheckedCreateInput = {
    id?: string
    userId: string
    botId?: string | null
    action: string
    type?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ActivityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutActivitiesNestedInput
    bot?: BotUpdateOneWithoutActivitiesNestedInput
  }

  export type ActivityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    botId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCreateManyInput = {
    id?: string
    userId: string
    botId?: string | null
    action: string
    type?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ActivityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    botId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadCreateInput = {
    id?: string
    businessName: string
    website?: string | null
    email?: string | null
    phone?: string | null
    industry?: string | null
    location?: string | null
    source?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutLeadsInput
  }

  export type LeadUncheckedCreateInput = {
    id?: string
    userId: string
    businessName: string
    website?: string | null
    email?: string | null
    phone?: string | null
    industry?: string | null
    location?: string | null
    source?: string
    createdAt?: Date | string
  }

  export type LeadUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLeadsNestedInput
  }

  export type LeadUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadCreateManyInput = {
    id?: string
    userId: string
    businessName: string
    website?: string | null
    email?: string | null
    phone?: string | null
    industry?: string | null
    location?: string | null
    source?: string
    createdAt?: Date | string
  }

  export type LeadUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailLogCreateInput = {
    id?: string
    text: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutEmailLogsInput
  }

  export type EmailLogUncheckedCreateInput = {
    id?: string
    userId: string
    text: string
    createdAt?: Date | string
  }

  export type EmailLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmailLogsNestedInput
  }

  export type EmailLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailLogCreateManyInput = {
    id?: string
    userId: string
    text: string
    createdAt?: Date | string
  }

  export type EmailLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoJobCreateInput = {
    id?: string
    status?: string
    videoUrl?: string | null
    prompt?: string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutVideoJobsInput
  }

  export type VideoJobUncheckedCreateInput = {
    id?: string
    userId: string
    status?: string
    videoUrl?: string | null
    prompt?: string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type VideoJobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    prompt?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutVideoJobsNestedInput
  }

  export type VideoJobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    prompt?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoJobCreateManyInput = {
    id?: string
    userId: string
    status?: string
    videoUrl?: string | null
    prompt?: string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type VideoJobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    prompt?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoJobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    prompt?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateInput = {
    id?: string
    type: string
    status?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    status?: string
    createdAt?: Date | string
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateManyInput = {
    id?: string
    userId: string
    type: string
    status?: string
    createdAt?: Date | string
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PulseEventCreateInput = {
    id?: string
    userId: string
    title: string
    message: string
    type?: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type PulseEventUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    message: string
    type?: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type PulseEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PulseEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PulseEventCreateManyInput = {
    id?: string
    userId: string
    title: string
    message: string
    type?: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type PulseEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PulseEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InboxMessageCreateInput = {
    id?: string
    userId: string
    sender: string
    subject: string
    body: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type InboxMessageUncheckedCreateInput = {
    id?: string
    userId: string
    sender: string
    subject: string
    body: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type InboxMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InboxMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InboxMessageCreateManyInput = {
    id?: string
    userId: string
    sender: string
    subject: string
    body: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type InboxMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InboxMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedStripeEventCreateInput = {
    id?: string
    eventId: string
    createdAt?: Date | string
  }

  export type ProcessedStripeEventUncheckedCreateInput = {
    id?: string
    eventId: string
    createdAt?: Date | string
  }

  export type ProcessedStripeEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedStripeEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedStripeEventCreateManyInput = {
    id?: string
    eventId: string
    createdAt?: Date | string
  }

  export type ProcessedStripeEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedStripeEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExecutionRecordCreateInput = {
    id?: string
    status?: string
    timestamp?: Date | string
    isAutonomous?: boolean
    user: UserCreateNestedOneWithoutExecutionRecordsInput
  }

  export type ExecutionRecordUncheckedCreateInput = {
    id?: string
    userId: string
    status?: string
    timestamp?: Date | string
    isAutonomous?: boolean
  }

  export type ExecutionRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    isAutonomous?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutExecutionRecordsNestedInput
  }

  export type ExecutionRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    isAutonomous?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ExecutionRecordCreateManyInput = {
    id?: string
    userId: string
    status?: string
    timestamp?: Date | string
    isAutonomous?: boolean
  }

  export type ExecutionRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    isAutonomous?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ExecutionRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    isAutonomous?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ActivityListRelationFilter = {
    every?: ActivityWhereInput
    some?: ActivityWhereInput
    none?: ActivityWhereInput
  }

  export type BotListRelationFilter = {
    every?: BotWhereInput
    some?: BotWhereInput
    none?: BotWhereInput
  }

  export type EmailLogListRelationFilter = {
    every?: EmailLogWhereInput
    some?: EmailLogWhereInput
    none?: EmailLogWhereInput
  }

  export type LeadListRelationFilter = {
    every?: LeadWhereInput
    some?: LeadWhereInput
    none?: LeadWhereInput
  }

  export type SubscriptionNullableScalarRelationFilter = {
    is?: SubscriptionWhereInput | null
    isNot?: SubscriptionWhereInput | null
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type VideoJobListRelationFilter = {
    every?: VideoJobWhereInput
    some?: VideoJobWhereInput
    none?: VideoJobWhereInput
  }

  export type ExecutionRecordListRelationFilter = {
    every?: ExecutionRecordWhereInput
    some?: ExecutionRecordWhereInput
    none?: ExecutionRecordWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ActivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmailLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VideoJobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExecutionRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    clerkId?: SortOrder
    stripeCustomerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    activeTaskCount?: SortOrder
    dailyUsageCount?: SortOrder
    lastUsageReset?: SortOrder
    overageBalance?: SortOrder
    tier?: SortOrder
    creditsTotal?: SortOrder
    creditsUsed?: SortOrder
    plan?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    activeTaskCount?: SortOrder
    dailyUsageCount?: SortOrder
    overageBalance?: SortOrder
    creditsTotal?: SortOrder
    creditsUsed?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    clerkId?: SortOrder
    stripeCustomerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    activeTaskCount?: SortOrder
    dailyUsageCount?: SortOrder
    lastUsageReset?: SortOrder
    overageBalance?: SortOrder
    tier?: SortOrder
    creditsTotal?: SortOrder
    creditsUsed?: SortOrder
    plan?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    clerkId?: SortOrder
    stripeCustomerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    activeTaskCount?: SortOrder
    dailyUsageCount?: SortOrder
    lastUsageReset?: SortOrder
    overageBalance?: SortOrder
    tier?: SortOrder
    creditsTotal?: SortOrder
    creditsUsed?: SortOrder
    plan?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    activeTaskCount?: SortOrder
    dailyUsageCount?: SortOrder
    overageBalance?: SortOrder
    creditsTotal?: SortOrder
    creditsUsed?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AgentPersonaNullableScalarRelationFilter = {
    is?: AgentPersonaWhereInput | null
    isNot?: AgentPersonaWhereInput | null
  }

  export type BotCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    status?: SortOrder
    isRunning?: SortOrder
    desc?: SortOrder
    lastRun?: SortOrder
    createdAt?: SortOrder
  }

  export type BotMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    status?: SortOrder
    isRunning?: SortOrder
    desc?: SortOrder
    lastRun?: SortOrder
    createdAt?: SortOrder
  }

  export type BotMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    status?: SortOrder
    isRunning?: SortOrder
    desc?: SortOrder
    lastRun?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BotScalarRelationFilter = {
    is?: BotWhereInput
    isNot?: BotWhereInput
  }

  export type AgentPersonaCountOrderByAggregateInput = {
    id?: SortOrder
    botId?: SortOrder
    systemPrompt?: SortOrder
    riskLevel?: SortOrder
    capabilities?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentPersonaMaxOrderByAggregateInput = {
    id?: SortOrder
    botId?: SortOrder
    systemPrompt?: SortOrder
    riskLevel?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentPersonaMinOrderByAggregateInput = {
    id?: SortOrder
    botId?: SortOrder
    systemPrompt?: SortOrder
    riskLevel?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripeCustomerId?: SortOrder
    stripePriceId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    currentPeriodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    discountApplied?: SortOrder
  }

  export type SubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripeCustomerId?: SortOrder
    stripePriceId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    currentPeriodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    discountApplied?: SortOrder
  }

  export type SubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripeCustomerId?: SortOrder
    stripePriceId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    currentPeriodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    discountApplied?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BotNullableScalarRelationFilter = {
    is?: BotWhereInput | null
    isNot?: BotWhereInput | null
  }

  export type ActivityCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    botId?: SortOrder
    action?: SortOrder
    type?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    botId?: SortOrder
    action?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    botId?: SortOrder
    action?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type LeadCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrder
    website?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    industry?: SortOrder
    location?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
  }

  export type LeadMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrder
    website?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    industry?: SortOrder
    location?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
  }

  export type LeadMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrder
    website?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    industry?: SortOrder
    location?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
  }

  export type EmailLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
  }

  export type EmailLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
  }

  export type EmailLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
  }

  export type VideoJobCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    videoUrl?: SortOrder
    prompt?: SortOrder
    settings?: SortOrder
    createdAt?: SortOrder
  }

  export type VideoJobMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    videoUrl?: SortOrder
    prompt?: SortOrder
    createdAt?: SortOrder
  }

  export type VideoJobMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    videoUrl?: SortOrder
    prompt?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type PulseEventCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type PulseEventMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type PulseEventMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type InboxMessageCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sender?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type InboxMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sender?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type InboxMessageMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sender?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type ProcessedStripeEventCountOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProcessedStripeEventMaxOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProcessedStripeEventMinOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    createdAt?: SortOrder
  }

  export type ExecutionRecordCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    isAutonomous?: SortOrder
  }

  export type ExecutionRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    isAutonomous?: SortOrder
  }

  export type ExecutionRecordMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    isAutonomous?: SortOrder
  }

  export type ActivityCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type BotCreateNestedManyWithoutUserInput = {
    create?: XOR<BotCreateWithoutUserInput, BotUncheckedCreateWithoutUserInput> | BotCreateWithoutUserInput[] | BotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BotCreateOrConnectWithoutUserInput | BotCreateOrConnectWithoutUserInput[]
    createMany?: BotCreateManyUserInputEnvelope
    connect?: BotWhereUniqueInput | BotWhereUniqueInput[]
  }

  export type EmailLogCreateNestedManyWithoutUserInput = {
    create?: XOR<EmailLogCreateWithoutUserInput, EmailLogUncheckedCreateWithoutUserInput> | EmailLogCreateWithoutUserInput[] | EmailLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailLogCreateOrConnectWithoutUserInput | EmailLogCreateOrConnectWithoutUserInput[]
    createMany?: EmailLogCreateManyUserInputEnvelope
    connect?: EmailLogWhereUniqueInput | EmailLogWhereUniqueInput[]
  }

  export type LeadCreateNestedManyWithoutUserInput = {
    create?: XOR<LeadCreateWithoutUserInput, LeadUncheckedCreateWithoutUserInput> | LeadCreateWithoutUserInput[] | LeadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutUserInput | LeadCreateOrConnectWithoutUserInput[]
    createMany?: LeadCreateManyUserInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type SubscriptionCreateNestedOneWithoutUserInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput
    connect?: SubscriptionWhereUniqueInput
  }

  export type TaskCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type VideoJobCreateNestedManyWithoutUserInput = {
    create?: XOR<VideoJobCreateWithoutUserInput, VideoJobUncheckedCreateWithoutUserInput> | VideoJobCreateWithoutUserInput[] | VideoJobUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VideoJobCreateOrConnectWithoutUserInput | VideoJobCreateOrConnectWithoutUserInput[]
    createMany?: VideoJobCreateManyUserInputEnvelope
    connect?: VideoJobWhereUniqueInput | VideoJobWhereUniqueInput[]
  }

  export type ExecutionRecordCreateNestedManyWithoutUserInput = {
    create?: XOR<ExecutionRecordCreateWithoutUserInput, ExecutionRecordUncheckedCreateWithoutUserInput> | ExecutionRecordCreateWithoutUserInput[] | ExecutionRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExecutionRecordCreateOrConnectWithoutUserInput | ExecutionRecordCreateOrConnectWithoutUserInput[]
    createMany?: ExecutionRecordCreateManyUserInputEnvelope
    connect?: ExecutionRecordWhereUniqueInput | ExecutionRecordWhereUniqueInput[]
  }

  export type ActivityUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type BotUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BotCreateWithoutUserInput, BotUncheckedCreateWithoutUserInput> | BotCreateWithoutUserInput[] | BotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BotCreateOrConnectWithoutUserInput | BotCreateOrConnectWithoutUserInput[]
    createMany?: BotCreateManyUserInputEnvelope
    connect?: BotWhereUniqueInput | BotWhereUniqueInput[]
  }

  export type EmailLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EmailLogCreateWithoutUserInput, EmailLogUncheckedCreateWithoutUserInput> | EmailLogCreateWithoutUserInput[] | EmailLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailLogCreateOrConnectWithoutUserInput | EmailLogCreateOrConnectWithoutUserInput[]
    createMany?: EmailLogCreateManyUserInputEnvelope
    connect?: EmailLogWhereUniqueInput | EmailLogWhereUniqueInput[]
  }

  export type LeadUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LeadCreateWithoutUserInput, LeadUncheckedCreateWithoutUserInput> | LeadCreateWithoutUserInput[] | LeadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutUserInput | LeadCreateOrConnectWithoutUserInput[]
    createMany?: LeadCreateManyUserInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type SubscriptionUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput
    connect?: SubscriptionWhereUniqueInput
  }

  export type TaskUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type VideoJobUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<VideoJobCreateWithoutUserInput, VideoJobUncheckedCreateWithoutUserInput> | VideoJobCreateWithoutUserInput[] | VideoJobUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VideoJobCreateOrConnectWithoutUserInput | VideoJobCreateOrConnectWithoutUserInput[]
    createMany?: VideoJobCreateManyUserInputEnvelope
    connect?: VideoJobWhereUniqueInput | VideoJobWhereUniqueInput[]
  }

  export type ExecutionRecordUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ExecutionRecordCreateWithoutUserInput, ExecutionRecordUncheckedCreateWithoutUserInput> | ExecutionRecordCreateWithoutUserInput[] | ExecutionRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExecutionRecordCreateOrConnectWithoutUserInput | ExecutionRecordCreateOrConnectWithoutUserInput[]
    createMany?: ExecutionRecordCreateManyUserInputEnvelope
    connect?: ExecutionRecordWhereUniqueInput | ExecutionRecordWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ActivityUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutUserInput | ActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutUserInput | ActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutUserInput | ActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type BotUpdateManyWithoutUserNestedInput = {
    create?: XOR<BotCreateWithoutUserInput, BotUncheckedCreateWithoutUserInput> | BotCreateWithoutUserInput[] | BotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BotCreateOrConnectWithoutUserInput | BotCreateOrConnectWithoutUserInput[]
    upsert?: BotUpsertWithWhereUniqueWithoutUserInput | BotUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BotCreateManyUserInputEnvelope
    set?: BotWhereUniqueInput | BotWhereUniqueInput[]
    disconnect?: BotWhereUniqueInput | BotWhereUniqueInput[]
    delete?: BotWhereUniqueInput | BotWhereUniqueInput[]
    connect?: BotWhereUniqueInput | BotWhereUniqueInput[]
    update?: BotUpdateWithWhereUniqueWithoutUserInput | BotUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BotUpdateManyWithWhereWithoutUserInput | BotUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BotScalarWhereInput | BotScalarWhereInput[]
  }

  export type EmailLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmailLogCreateWithoutUserInput, EmailLogUncheckedCreateWithoutUserInput> | EmailLogCreateWithoutUserInput[] | EmailLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailLogCreateOrConnectWithoutUserInput | EmailLogCreateOrConnectWithoutUserInput[]
    upsert?: EmailLogUpsertWithWhereUniqueWithoutUserInput | EmailLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmailLogCreateManyUserInputEnvelope
    set?: EmailLogWhereUniqueInput | EmailLogWhereUniqueInput[]
    disconnect?: EmailLogWhereUniqueInput | EmailLogWhereUniqueInput[]
    delete?: EmailLogWhereUniqueInput | EmailLogWhereUniqueInput[]
    connect?: EmailLogWhereUniqueInput | EmailLogWhereUniqueInput[]
    update?: EmailLogUpdateWithWhereUniqueWithoutUserInput | EmailLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmailLogUpdateManyWithWhereWithoutUserInput | EmailLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmailLogScalarWhereInput | EmailLogScalarWhereInput[]
  }

  export type LeadUpdateManyWithoutUserNestedInput = {
    create?: XOR<LeadCreateWithoutUserInput, LeadUncheckedCreateWithoutUserInput> | LeadCreateWithoutUserInput[] | LeadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutUserInput | LeadCreateOrConnectWithoutUserInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutUserInput | LeadUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LeadCreateManyUserInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutUserInput | LeadUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutUserInput | LeadUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type SubscriptionUpdateOneWithoutUserNestedInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput
    upsert?: SubscriptionUpsertWithoutUserInput
    disconnect?: SubscriptionWhereInput | boolean
    delete?: SubscriptionWhereInput | boolean
    connect?: SubscriptionWhereUniqueInput
    update?: XOR<XOR<SubscriptionUpdateToOneWithWhereWithoutUserInput, SubscriptionUpdateWithoutUserInput>, SubscriptionUncheckedUpdateWithoutUserInput>
  }

  export type TaskUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutUserInput | TaskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutUserInput | TaskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutUserInput | TaskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type VideoJobUpdateManyWithoutUserNestedInput = {
    create?: XOR<VideoJobCreateWithoutUserInput, VideoJobUncheckedCreateWithoutUserInput> | VideoJobCreateWithoutUserInput[] | VideoJobUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VideoJobCreateOrConnectWithoutUserInput | VideoJobCreateOrConnectWithoutUserInput[]
    upsert?: VideoJobUpsertWithWhereUniqueWithoutUserInput | VideoJobUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VideoJobCreateManyUserInputEnvelope
    set?: VideoJobWhereUniqueInput | VideoJobWhereUniqueInput[]
    disconnect?: VideoJobWhereUniqueInput | VideoJobWhereUniqueInput[]
    delete?: VideoJobWhereUniqueInput | VideoJobWhereUniqueInput[]
    connect?: VideoJobWhereUniqueInput | VideoJobWhereUniqueInput[]
    update?: VideoJobUpdateWithWhereUniqueWithoutUserInput | VideoJobUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VideoJobUpdateManyWithWhereWithoutUserInput | VideoJobUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VideoJobScalarWhereInput | VideoJobScalarWhereInput[]
  }

  export type ExecutionRecordUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExecutionRecordCreateWithoutUserInput, ExecutionRecordUncheckedCreateWithoutUserInput> | ExecutionRecordCreateWithoutUserInput[] | ExecutionRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExecutionRecordCreateOrConnectWithoutUserInput | ExecutionRecordCreateOrConnectWithoutUserInput[]
    upsert?: ExecutionRecordUpsertWithWhereUniqueWithoutUserInput | ExecutionRecordUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExecutionRecordCreateManyUserInputEnvelope
    set?: ExecutionRecordWhereUniqueInput | ExecutionRecordWhereUniqueInput[]
    disconnect?: ExecutionRecordWhereUniqueInput | ExecutionRecordWhereUniqueInput[]
    delete?: ExecutionRecordWhereUniqueInput | ExecutionRecordWhereUniqueInput[]
    connect?: ExecutionRecordWhereUniqueInput | ExecutionRecordWhereUniqueInput[]
    update?: ExecutionRecordUpdateWithWhereUniqueWithoutUserInput | ExecutionRecordUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExecutionRecordUpdateManyWithWhereWithoutUserInput | ExecutionRecordUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExecutionRecordScalarWhereInput | ExecutionRecordScalarWhereInput[]
  }

  export type ActivityUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutUserInput | ActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutUserInput | ActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutUserInput | ActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type BotUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BotCreateWithoutUserInput, BotUncheckedCreateWithoutUserInput> | BotCreateWithoutUserInput[] | BotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BotCreateOrConnectWithoutUserInput | BotCreateOrConnectWithoutUserInput[]
    upsert?: BotUpsertWithWhereUniqueWithoutUserInput | BotUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BotCreateManyUserInputEnvelope
    set?: BotWhereUniqueInput | BotWhereUniqueInput[]
    disconnect?: BotWhereUniqueInput | BotWhereUniqueInput[]
    delete?: BotWhereUniqueInput | BotWhereUniqueInput[]
    connect?: BotWhereUniqueInput | BotWhereUniqueInput[]
    update?: BotUpdateWithWhereUniqueWithoutUserInput | BotUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BotUpdateManyWithWhereWithoutUserInput | BotUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BotScalarWhereInput | BotScalarWhereInput[]
  }

  export type EmailLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmailLogCreateWithoutUserInput, EmailLogUncheckedCreateWithoutUserInput> | EmailLogCreateWithoutUserInput[] | EmailLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailLogCreateOrConnectWithoutUserInput | EmailLogCreateOrConnectWithoutUserInput[]
    upsert?: EmailLogUpsertWithWhereUniqueWithoutUserInput | EmailLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmailLogCreateManyUserInputEnvelope
    set?: EmailLogWhereUniqueInput | EmailLogWhereUniqueInput[]
    disconnect?: EmailLogWhereUniqueInput | EmailLogWhereUniqueInput[]
    delete?: EmailLogWhereUniqueInput | EmailLogWhereUniqueInput[]
    connect?: EmailLogWhereUniqueInput | EmailLogWhereUniqueInput[]
    update?: EmailLogUpdateWithWhereUniqueWithoutUserInput | EmailLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmailLogUpdateManyWithWhereWithoutUserInput | EmailLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmailLogScalarWhereInput | EmailLogScalarWhereInput[]
  }

  export type LeadUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LeadCreateWithoutUserInput, LeadUncheckedCreateWithoutUserInput> | LeadCreateWithoutUserInput[] | LeadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutUserInput | LeadCreateOrConnectWithoutUserInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutUserInput | LeadUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LeadCreateManyUserInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutUserInput | LeadUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutUserInput | LeadUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type SubscriptionUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput
    upsert?: SubscriptionUpsertWithoutUserInput
    disconnect?: SubscriptionWhereInput | boolean
    delete?: SubscriptionWhereInput | boolean
    connect?: SubscriptionWhereUniqueInput
    update?: XOR<XOR<SubscriptionUpdateToOneWithWhereWithoutUserInput, SubscriptionUpdateWithoutUserInput>, SubscriptionUncheckedUpdateWithoutUserInput>
  }

  export type TaskUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutUserInput | TaskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutUserInput | TaskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutUserInput | TaskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type VideoJobUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<VideoJobCreateWithoutUserInput, VideoJobUncheckedCreateWithoutUserInput> | VideoJobCreateWithoutUserInput[] | VideoJobUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VideoJobCreateOrConnectWithoutUserInput | VideoJobCreateOrConnectWithoutUserInput[]
    upsert?: VideoJobUpsertWithWhereUniqueWithoutUserInput | VideoJobUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VideoJobCreateManyUserInputEnvelope
    set?: VideoJobWhereUniqueInput | VideoJobWhereUniqueInput[]
    disconnect?: VideoJobWhereUniqueInput | VideoJobWhereUniqueInput[]
    delete?: VideoJobWhereUniqueInput | VideoJobWhereUniqueInput[]
    connect?: VideoJobWhereUniqueInput | VideoJobWhereUniqueInput[]
    update?: VideoJobUpdateWithWhereUniqueWithoutUserInput | VideoJobUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VideoJobUpdateManyWithWhereWithoutUserInput | VideoJobUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VideoJobScalarWhereInput | VideoJobScalarWhereInput[]
  }

  export type ExecutionRecordUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExecutionRecordCreateWithoutUserInput, ExecutionRecordUncheckedCreateWithoutUserInput> | ExecutionRecordCreateWithoutUserInput[] | ExecutionRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExecutionRecordCreateOrConnectWithoutUserInput | ExecutionRecordCreateOrConnectWithoutUserInput[]
    upsert?: ExecutionRecordUpsertWithWhereUniqueWithoutUserInput | ExecutionRecordUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExecutionRecordCreateManyUserInputEnvelope
    set?: ExecutionRecordWhereUniqueInput | ExecutionRecordWhereUniqueInput[]
    disconnect?: ExecutionRecordWhereUniqueInput | ExecutionRecordWhereUniqueInput[]
    delete?: ExecutionRecordWhereUniqueInput | ExecutionRecordWhereUniqueInput[]
    connect?: ExecutionRecordWhereUniqueInput | ExecutionRecordWhereUniqueInput[]
    update?: ExecutionRecordUpdateWithWhereUniqueWithoutUserInput | ExecutionRecordUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExecutionRecordUpdateManyWithWhereWithoutUserInput | ExecutionRecordUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExecutionRecordScalarWhereInput | ExecutionRecordScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutBotsInput = {
    create?: XOR<UserCreateWithoutBotsInput, UserUncheckedCreateWithoutBotsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBotsInput
    connect?: UserWhereUniqueInput
  }

  export type ActivityCreateNestedManyWithoutBotInput = {
    create?: XOR<ActivityCreateWithoutBotInput, ActivityUncheckedCreateWithoutBotInput> | ActivityCreateWithoutBotInput[] | ActivityUncheckedCreateWithoutBotInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutBotInput | ActivityCreateOrConnectWithoutBotInput[]
    createMany?: ActivityCreateManyBotInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type AgentPersonaCreateNestedOneWithoutBotInput = {
    create?: XOR<AgentPersonaCreateWithoutBotInput, AgentPersonaUncheckedCreateWithoutBotInput>
    connectOrCreate?: AgentPersonaCreateOrConnectWithoutBotInput
    connect?: AgentPersonaWhereUniqueInput
  }

  export type ActivityUncheckedCreateNestedManyWithoutBotInput = {
    create?: XOR<ActivityCreateWithoutBotInput, ActivityUncheckedCreateWithoutBotInput> | ActivityCreateWithoutBotInput[] | ActivityUncheckedCreateWithoutBotInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutBotInput | ActivityCreateOrConnectWithoutBotInput[]
    createMany?: ActivityCreateManyBotInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type AgentPersonaUncheckedCreateNestedOneWithoutBotInput = {
    create?: XOR<AgentPersonaCreateWithoutBotInput, AgentPersonaUncheckedCreateWithoutBotInput>
    connectOrCreate?: AgentPersonaCreateOrConnectWithoutBotInput
    connect?: AgentPersonaWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutBotsNestedInput = {
    create?: XOR<UserCreateWithoutBotsInput, UserUncheckedCreateWithoutBotsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBotsInput
    upsert?: UserUpsertWithoutBotsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBotsInput, UserUpdateWithoutBotsInput>, UserUncheckedUpdateWithoutBotsInput>
  }

  export type ActivityUpdateManyWithoutBotNestedInput = {
    create?: XOR<ActivityCreateWithoutBotInput, ActivityUncheckedCreateWithoutBotInput> | ActivityCreateWithoutBotInput[] | ActivityUncheckedCreateWithoutBotInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutBotInput | ActivityCreateOrConnectWithoutBotInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutBotInput | ActivityUpsertWithWhereUniqueWithoutBotInput[]
    createMany?: ActivityCreateManyBotInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutBotInput | ActivityUpdateWithWhereUniqueWithoutBotInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutBotInput | ActivityUpdateManyWithWhereWithoutBotInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type AgentPersonaUpdateOneWithoutBotNestedInput = {
    create?: XOR<AgentPersonaCreateWithoutBotInput, AgentPersonaUncheckedCreateWithoutBotInput>
    connectOrCreate?: AgentPersonaCreateOrConnectWithoutBotInput
    upsert?: AgentPersonaUpsertWithoutBotInput
    disconnect?: AgentPersonaWhereInput | boolean
    delete?: AgentPersonaWhereInput | boolean
    connect?: AgentPersonaWhereUniqueInput
    update?: XOR<XOR<AgentPersonaUpdateToOneWithWhereWithoutBotInput, AgentPersonaUpdateWithoutBotInput>, AgentPersonaUncheckedUpdateWithoutBotInput>
  }

  export type ActivityUncheckedUpdateManyWithoutBotNestedInput = {
    create?: XOR<ActivityCreateWithoutBotInput, ActivityUncheckedCreateWithoutBotInput> | ActivityCreateWithoutBotInput[] | ActivityUncheckedCreateWithoutBotInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutBotInput | ActivityCreateOrConnectWithoutBotInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutBotInput | ActivityUpsertWithWhereUniqueWithoutBotInput[]
    createMany?: ActivityCreateManyBotInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutBotInput | ActivityUpdateWithWhereUniqueWithoutBotInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutBotInput | ActivityUpdateManyWithWhereWithoutBotInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type AgentPersonaUncheckedUpdateOneWithoutBotNestedInput = {
    create?: XOR<AgentPersonaCreateWithoutBotInput, AgentPersonaUncheckedCreateWithoutBotInput>
    connectOrCreate?: AgentPersonaCreateOrConnectWithoutBotInput
    upsert?: AgentPersonaUpsertWithoutBotInput
    disconnect?: AgentPersonaWhereInput | boolean
    delete?: AgentPersonaWhereInput | boolean
    connect?: AgentPersonaWhereUniqueInput
    update?: XOR<XOR<AgentPersonaUpdateToOneWithWhereWithoutBotInput, AgentPersonaUpdateWithoutBotInput>, AgentPersonaUncheckedUpdateWithoutBotInput>
  }

  export type AgentPersonaCreatecapabilitiesInput = {
    set: string[]
  }

  export type BotCreateNestedOneWithoutPersonaInput = {
    create?: XOR<BotCreateWithoutPersonaInput, BotUncheckedCreateWithoutPersonaInput>
    connectOrCreate?: BotCreateOrConnectWithoutPersonaInput
    connect?: BotWhereUniqueInput
  }

  export type AgentPersonaUpdatecapabilitiesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BotUpdateOneRequiredWithoutPersonaNestedInput = {
    create?: XOR<BotCreateWithoutPersonaInput, BotUncheckedCreateWithoutPersonaInput>
    connectOrCreate?: BotCreateOrConnectWithoutPersonaInput
    upsert?: BotUpsertWithoutPersonaInput
    connect?: BotWhereUniqueInput
    update?: XOR<XOR<BotUpdateToOneWithWhereWithoutPersonaInput, BotUpdateWithoutPersonaInput>, BotUncheckedUpdateWithoutPersonaInput>
  }

  export type UserCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<UserCreateWithoutSubscriptionsInput, UserUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubscriptionsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutSubscriptionsNestedInput = {
    create?: XOR<UserCreateWithoutSubscriptionsInput, UserUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubscriptionsInput
    upsert?: UserUpsertWithoutSubscriptionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubscriptionsInput, UserUpdateWithoutSubscriptionsInput>, UserUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type UserCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivitiesInput
    connect?: UserWhereUniqueInput
  }

  export type BotCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<BotCreateWithoutActivitiesInput, BotUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: BotCreateOrConnectWithoutActivitiesInput
    connect?: BotWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutActivitiesNestedInput = {
    create?: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivitiesInput
    upsert?: UserUpsertWithoutActivitiesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActivitiesInput, UserUpdateWithoutActivitiesInput>, UserUncheckedUpdateWithoutActivitiesInput>
  }

  export type BotUpdateOneWithoutActivitiesNestedInput = {
    create?: XOR<BotCreateWithoutActivitiesInput, BotUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: BotCreateOrConnectWithoutActivitiesInput
    upsert?: BotUpsertWithoutActivitiesInput
    disconnect?: BotWhereInput | boolean
    delete?: BotWhereInput | boolean
    connect?: BotWhereUniqueInput
    update?: XOR<XOR<BotUpdateToOneWithWhereWithoutActivitiesInput, BotUpdateWithoutActivitiesInput>, BotUncheckedUpdateWithoutActivitiesInput>
  }

  export type UserCreateNestedOneWithoutLeadsInput = {
    create?: XOR<UserCreateWithoutLeadsInput, UserUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLeadsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutLeadsNestedInput = {
    create?: XOR<UserCreateWithoutLeadsInput, UserUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLeadsInput
    upsert?: UserUpsertWithoutLeadsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLeadsInput, UserUpdateWithoutLeadsInput>, UserUncheckedUpdateWithoutLeadsInput>
  }

  export type UserCreateNestedOneWithoutEmailLogsInput = {
    create?: XOR<UserCreateWithoutEmailLogsInput, UserUncheckedCreateWithoutEmailLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmailLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutEmailLogsNestedInput = {
    create?: XOR<UserCreateWithoutEmailLogsInput, UserUncheckedCreateWithoutEmailLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmailLogsInput
    upsert?: UserUpsertWithoutEmailLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEmailLogsInput, UserUpdateWithoutEmailLogsInput>, UserUncheckedUpdateWithoutEmailLogsInput>
  }

  export type UserCreateNestedOneWithoutVideoJobsInput = {
    create?: XOR<UserCreateWithoutVideoJobsInput, UserUncheckedCreateWithoutVideoJobsInput>
    connectOrCreate?: UserCreateOrConnectWithoutVideoJobsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutVideoJobsNestedInput = {
    create?: XOR<UserCreateWithoutVideoJobsInput, UserUncheckedCreateWithoutVideoJobsInput>
    connectOrCreate?: UserCreateOrConnectWithoutVideoJobsInput
    upsert?: UserUpsertWithoutVideoJobsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVideoJobsInput, UserUpdateWithoutVideoJobsInput>, UserUncheckedUpdateWithoutVideoJobsInput>
  }

  export type UserCreateNestedOneWithoutTasksInput = {
    create?: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksInput
    upsert?: UserUpsertWithoutTasksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTasksInput, UserUpdateWithoutTasksInput>, UserUncheckedUpdateWithoutTasksInput>
  }

  export type UserCreateNestedOneWithoutExecutionRecordsInput = {
    create?: XOR<UserCreateWithoutExecutionRecordsInput, UserUncheckedCreateWithoutExecutionRecordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutExecutionRecordsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutExecutionRecordsNestedInput = {
    create?: XOR<UserCreateWithoutExecutionRecordsInput, UserUncheckedCreateWithoutExecutionRecordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutExecutionRecordsInput
    upsert?: UserUpsertWithoutExecutionRecordsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutExecutionRecordsInput, UserUpdateWithoutExecutionRecordsInput>, UserUncheckedUpdateWithoutExecutionRecordsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ActivityCreateWithoutUserInput = {
    id?: string
    action: string
    type?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    bot?: BotCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityUncheckedCreateWithoutUserInput = {
    id?: string
    botId?: string | null
    action: string
    type?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ActivityCreateOrConnectWithoutUserInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput>
  }

  export type ActivityCreateManyUserInputEnvelope = {
    data: ActivityCreateManyUserInput | ActivityCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BotCreateWithoutUserInput = {
    id?: string
    name: string
    type: string
    status?: string
    isRunning?: boolean
    desc: string
    lastRun?: Date | string
    createdAt?: Date | string
    activities?: ActivityCreateNestedManyWithoutBotInput
    persona?: AgentPersonaCreateNestedOneWithoutBotInput
  }

  export type BotUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    type: string
    status?: string
    isRunning?: boolean
    desc: string
    lastRun?: Date | string
    createdAt?: Date | string
    activities?: ActivityUncheckedCreateNestedManyWithoutBotInput
    persona?: AgentPersonaUncheckedCreateNestedOneWithoutBotInput
  }

  export type BotCreateOrConnectWithoutUserInput = {
    where: BotWhereUniqueInput
    create: XOR<BotCreateWithoutUserInput, BotUncheckedCreateWithoutUserInput>
  }

  export type BotCreateManyUserInputEnvelope = {
    data: BotCreateManyUserInput | BotCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type EmailLogCreateWithoutUserInput = {
    id?: string
    text: string
    createdAt?: Date | string
  }

  export type EmailLogUncheckedCreateWithoutUserInput = {
    id?: string
    text: string
    createdAt?: Date | string
  }

  export type EmailLogCreateOrConnectWithoutUserInput = {
    where: EmailLogWhereUniqueInput
    create: XOR<EmailLogCreateWithoutUserInput, EmailLogUncheckedCreateWithoutUserInput>
  }

  export type EmailLogCreateManyUserInputEnvelope = {
    data: EmailLogCreateManyUserInput | EmailLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type LeadCreateWithoutUserInput = {
    id?: string
    businessName: string
    website?: string | null
    email?: string | null
    phone?: string | null
    industry?: string | null
    location?: string | null
    source?: string
    createdAt?: Date | string
  }

  export type LeadUncheckedCreateWithoutUserInput = {
    id?: string
    businessName: string
    website?: string | null
    email?: string | null
    phone?: string | null
    industry?: string | null
    location?: string | null
    source?: string
    createdAt?: Date | string
  }

  export type LeadCreateOrConnectWithoutUserInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutUserInput, LeadUncheckedCreateWithoutUserInput>
  }

  export type LeadCreateManyUserInputEnvelope = {
    data: LeadCreateManyUserInput | LeadCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SubscriptionCreateWithoutUserInput = {
    id?: string
    stripeSubscriptionId?: string | null
    stripeCustomerId?: string | null
    stripePriceId?: string | null
    plan?: string | null
    status?: string | null
    currentPeriodEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    discountApplied?: boolean
  }

  export type SubscriptionUncheckedCreateWithoutUserInput = {
    id?: string
    stripeSubscriptionId?: string | null
    stripeCustomerId?: string | null
    stripePriceId?: string | null
    plan?: string | null
    status?: string | null
    currentPeriodEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    discountApplied?: boolean
  }

  export type SubscriptionCreateOrConnectWithoutUserInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
  }

  export type TaskCreateWithoutUserInput = {
    id?: string
    type: string
    status?: string
    createdAt?: Date | string
  }

  export type TaskUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    status?: string
    createdAt?: Date | string
  }

  export type TaskCreateOrConnectWithoutUserInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput>
  }

  export type TaskCreateManyUserInputEnvelope = {
    data: TaskCreateManyUserInput | TaskCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type VideoJobCreateWithoutUserInput = {
    id?: string
    status?: string
    videoUrl?: string | null
    prompt?: string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type VideoJobUncheckedCreateWithoutUserInput = {
    id?: string
    status?: string
    videoUrl?: string | null
    prompt?: string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type VideoJobCreateOrConnectWithoutUserInput = {
    where: VideoJobWhereUniqueInput
    create: XOR<VideoJobCreateWithoutUserInput, VideoJobUncheckedCreateWithoutUserInput>
  }

  export type VideoJobCreateManyUserInputEnvelope = {
    data: VideoJobCreateManyUserInput | VideoJobCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ExecutionRecordCreateWithoutUserInput = {
    id?: string
    status?: string
    timestamp?: Date | string
    isAutonomous?: boolean
  }

  export type ExecutionRecordUncheckedCreateWithoutUserInput = {
    id?: string
    status?: string
    timestamp?: Date | string
    isAutonomous?: boolean
  }

  export type ExecutionRecordCreateOrConnectWithoutUserInput = {
    where: ExecutionRecordWhereUniqueInput
    create: XOR<ExecutionRecordCreateWithoutUserInput, ExecutionRecordUncheckedCreateWithoutUserInput>
  }

  export type ExecutionRecordCreateManyUserInputEnvelope = {
    data: ExecutionRecordCreateManyUserInput | ExecutionRecordCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ActivityUpsertWithWhereUniqueWithoutUserInput = {
    where: ActivityWhereUniqueInput
    update: XOR<ActivityUpdateWithoutUserInput, ActivityUncheckedUpdateWithoutUserInput>
    create: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput>
  }

  export type ActivityUpdateWithWhereUniqueWithoutUserInput = {
    where: ActivityWhereUniqueInput
    data: XOR<ActivityUpdateWithoutUserInput, ActivityUncheckedUpdateWithoutUserInput>
  }

  export type ActivityUpdateManyWithWhereWithoutUserInput = {
    where: ActivityScalarWhereInput
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyWithoutUserInput>
  }

  export type ActivityScalarWhereInput = {
    AND?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    OR?: ActivityScalarWhereInput[]
    NOT?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    id?: StringFilter<"Activity"> | string
    userId?: StringFilter<"Activity"> | string
    botId?: StringNullableFilter<"Activity"> | string | null
    action?: StringFilter<"Activity"> | string
    type?: StringFilter<"Activity"> | string
    metadata?: JsonNullableFilter<"Activity">
    createdAt?: DateTimeFilter<"Activity"> | Date | string
  }

  export type BotUpsertWithWhereUniqueWithoutUserInput = {
    where: BotWhereUniqueInput
    update: XOR<BotUpdateWithoutUserInput, BotUncheckedUpdateWithoutUserInput>
    create: XOR<BotCreateWithoutUserInput, BotUncheckedCreateWithoutUserInput>
  }

  export type BotUpdateWithWhereUniqueWithoutUserInput = {
    where: BotWhereUniqueInput
    data: XOR<BotUpdateWithoutUserInput, BotUncheckedUpdateWithoutUserInput>
  }

  export type BotUpdateManyWithWhereWithoutUserInput = {
    where: BotScalarWhereInput
    data: XOR<BotUpdateManyMutationInput, BotUncheckedUpdateManyWithoutUserInput>
  }

  export type BotScalarWhereInput = {
    AND?: BotScalarWhereInput | BotScalarWhereInput[]
    OR?: BotScalarWhereInput[]
    NOT?: BotScalarWhereInput | BotScalarWhereInput[]
    id?: StringFilter<"Bot"> | string
    userId?: StringFilter<"Bot"> | string
    name?: StringFilter<"Bot"> | string
    type?: StringFilter<"Bot"> | string
    status?: StringFilter<"Bot"> | string
    isRunning?: BoolFilter<"Bot"> | boolean
    desc?: StringFilter<"Bot"> | string
    lastRun?: DateTimeFilter<"Bot"> | Date | string
    createdAt?: DateTimeFilter<"Bot"> | Date | string
  }

  export type EmailLogUpsertWithWhereUniqueWithoutUserInput = {
    where: EmailLogWhereUniqueInput
    update: XOR<EmailLogUpdateWithoutUserInput, EmailLogUncheckedUpdateWithoutUserInput>
    create: XOR<EmailLogCreateWithoutUserInput, EmailLogUncheckedCreateWithoutUserInput>
  }

  export type EmailLogUpdateWithWhereUniqueWithoutUserInput = {
    where: EmailLogWhereUniqueInput
    data: XOR<EmailLogUpdateWithoutUserInput, EmailLogUncheckedUpdateWithoutUserInput>
  }

  export type EmailLogUpdateManyWithWhereWithoutUserInput = {
    where: EmailLogScalarWhereInput
    data: XOR<EmailLogUpdateManyMutationInput, EmailLogUncheckedUpdateManyWithoutUserInput>
  }

  export type EmailLogScalarWhereInput = {
    AND?: EmailLogScalarWhereInput | EmailLogScalarWhereInput[]
    OR?: EmailLogScalarWhereInput[]
    NOT?: EmailLogScalarWhereInput | EmailLogScalarWhereInput[]
    id?: StringFilter<"EmailLog"> | string
    userId?: StringFilter<"EmailLog"> | string
    text?: StringFilter<"EmailLog"> | string
    createdAt?: DateTimeFilter<"EmailLog"> | Date | string
  }

  export type LeadUpsertWithWhereUniqueWithoutUserInput = {
    where: LeadWhereUniqueInput
    update: XOR<LeadUpdateWithoutUserInput, LeadUncheckedUpdateWithoutUserInput>
    create: XOR<LeadCreateWithoutUserInput, LeadUncheckedCreateWithoutUserInput>
  }

  export type LeadUpdateWithWhereUniqueWithoutUserInput = {
    where: LeadWhereUniqueInput
    data: XOR<LeadUpdateWithoutUserInput, LeadUncheckedUpdateWithoutUserInput>
  }

  export type LeadUpdateManyWithWhereWithoutUserInput = {
    where: LeadScalarWhereInput
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyWithoutUserInput>
  }

  export type LeadScalarWhereInput = {
    AND?: LeadScalarWhereInput | LeadScalarWhereInput[]
    OR?: LeadScalarWhereInput[]
    NOT?: LeadScalarWhereInput | LeadScalarWhereInput[]
    id?: StringFilter<"Lead"> | string
    userId?: StringFilter<"Lead"> | string
    businessName?: StringFilter<"Lead"> | string
    website?: StringNullableFilter<"Lead"> | string | null
    email?: StringNullableFilter<"Lead"> | string | null
    phone?: StringNullableFilter<"Lead"> | string | null
    industry?: StringNullableFilter<"Lead"> | string | null
    location?: StringNullableFilter<"Lead"> | string | null
    source?: StringFilter<"Lead"> | string
    createdAt?: DateTimeFilter<"Lead"> | Date | string
  }

  export type SubscriptionUpsertWithoutUserInput = {
    update: XOR<SubscriptionUpdateWithoutUserInput, SubscriptionUncheckedUpdateWithoutUserInput>
    create: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
    where?: SubscriptionWhereInput
  }

  export type SubscriptionUpdateToOneWithWhereWithoutUserInput = {
    where?: SubscriptionWhereInput
    data: XOR<SubscriptionUpdateWithoutUserInput, SubscriptionUncheckedUpdateWithoutUserInput>
  }

  export type SubscriptionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discountApplied?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SubscriptionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discountApplied?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskUpsertWithWhereUniqueWithoutUserInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutUserInput, TaskUncheckedUpdateWithoutUserInput>
    create: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutUserInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutUserInput, TaskUncheckedUpdateWithoutUserInput>
  }

  export type TaskUpdateManyWithWhereWithoutUserInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutUserInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: StringFilter<"Task"> | string
    userId?: StringFilter<"Task"> | string
    type?: StringFilter<"Task"> | string
    status?: StringFilter<"Task"> | string
    createdAt?: DateTimeFilter<"Task"> | Date | string
  }

  export type VideoJobUpsertWithWhereUniqueWithoutUserInput = {
    where: VideoJobWhereUniqueInput
    update: XOR<VideoJobUpdateWithoutUserInput, VideoJobUncheckedUpdateWithoutUserInput>
    create: XOR<VideoJobCreateWithoutUserInput, VideoJobUncheckedCreateWithoutUserInput>
  }

  export type VideoJobUpdateWithWhereUniqueWithoutUserInput = {
    where: VideoJobWhereUniqueInput
    data: XOR<VideoJobUpdateWithoutUserInput, VideoJobUncheckedUpdateWithoutUserInput>
  }

  export type VideoJobUpdateManyWithWhereWithoutUserInput = {
    where: VideoJobScalarWhereInput
    data: XOR<VideoJobUpdateManyMutationInput, VideoJobUncheckedUpdateManyWithoutUserInput>
  }

  export type VideoJobScalarWhereInput = {
    AND?: VideoJobScalarWhereInput | VideoJobScalarWhereInput[]
    OR?: VideoJobScalarWhereInput[]
    NOT?: VideoJobScalarWhereInput | VideoJobScalarWhereInput[]
    id?: StringFilter<"VideoJob"> | string
    userId?: StringFilter<"VideoJob"> | string
    status?: StringFilter<"VideoJob"> | string
    videoUrl?: StringNullableFilter<"VideoJob"> | string | null
    prompt?: StringNullableFilter<"VideoJob"> | string | null
    settings?: JsonNullableFilter<"VideoJob">
    createdAt?: DateTimeFilter<"VideoJob"> | Date | string
  }

  export type ExecutionRecordUpsertWithWhereUniqueWithoutUserInput = {
    where: ExecutionRecordWhereUniqueInput
    update: XOR<ExecutionRecordUpdateWithoutUserInput, ExecutionRecordUncheckedUpdateWithoutUserInput>
    create: XOR<ExecutionRecordCreateWithoutUserInput, ExecutionRecordUncheckedCreateWithoutUserInput>
  }

  export type ExecutionRecordUpdateWithWhereUniqueWithoutUserInput = {
    where: ExecutionRecordWhereUniqueInput
    data: XOR<ExecutionRecordUpdateWithoutUserInput, ExecutionRecordUncheckedUpdateWithoutUserInput>
  }

  export type ExecutionRecordUpdateManyWithWhereWithoutUserInput = {
    where: ExecutionRecordScalarWhereInput
    data: XOR<ExecutionRecordUpdateManyMutationInput, ExecutionRecordUncheckedUpdateManyWithoutUserInput>
  }

  export type ExecutionRecordScalarWhereInput = {
    AND?: ExecutionRecordScalarWhereInput | ExecutionRecordScalarWhereInput[]
    OR?: ExecutionRecordScalarWhereInput[]
    NOT?: ExecutionRecordScalarWhereInput | ExecutionRecordScalarWhereInput[]
    id?: StringFilter<"ExecutionRecord"> | string
    userId?: StringFilter<"ExecutionRecord"> | string
    status?: StringFilter<"ExecutionRecord"> | string
    timestamp?: DateTimeFilter<"ExecutionRecord"> | Date | string
    isAutonomous?: BoolFilter<"ExecutionRecord"> | boolean
  }

  export type UserCreateWithoutBotsInput = {
    id?: string
    email: string
    clerkId: string
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activeTaskCount?: number
    dailyUsageCount?: number
    lastUsageReset?: Date | string
    overageBalance?: number
    tier?: string
    creditsTotal?: number
    creditsUsed?: number
    plan?: string
    activities?: ActivityCreateNestedManyWithoutUserInput
    emailLogs?: EmailLogCreateNestedManyWithoutUserInput
    leads?: LeadCreateNestedManyWithoutUserInput
    subscriptions?: SubscriptionCreateNestedOneWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    videoJobs?: VideoJobCreateNestedManyWithoutUserInput
    executionRecords?: ExecutionRecordCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBotsInput = {
    id?: string
    email: string
    clerkId: string
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activeTaskCount?: number
    dailyUsageCount?: number
    lastUsageReset?: Date | string
    overageBalance?: number
    tier?: string
    creditsTotal?: number
    creditsUsed?: number
    plan?: string
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    emailLogs?: EmailLogUncheckedCreateNestedManyWithoutUserInput
    leads?: LeadUncheckedCreateNestedManyWithoutUserInput
    subscriptions?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    videoJobs?: VideoJobUncheckedCreateNestedManyWithoutUserInput
    executionRecords?: ExecutionRecordUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBotsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBotsInput, UserUncheckedCreateWithoutBotsInput>
  }

  export type ActivityCreateWithoutBotInput = {
    id?: string
    action: string
    type?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityUncheckedCreateWithoutBotInput = {
    id?: string
    userId: string
    action: string
    type?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ActivityCreateOrConnectWithoutBotInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutBotInput, ActivityUncheckedCreateWithoutBotInput>
  }

  export type ActivityCreateManyBotInputEnvelope = {
    data: ActivityCreateManyBotInput | ActivityCreateManyBotInput[]
    skipDuplicates?: boolean
  }

  export type AgentPersonaCreateWithoutBotInput = {
    id?: string
    systemPrompt: string
    riskLevel?: string
    capabilities?: AgentPersonaCreatecapabilitiesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentPersonaUncheckedCreateWithoutBotInput = {
    id?: string
    systemPrompt: string
    riskLevel?: string
    capabilities?: AgentPersonaCreatecapabilitiesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentPersonaCreateOrConnectWithoutBotInput = {
    where: AgentPersonaWhereUniqueInput
    create: XOR<AgentPersonaCreateWithoutBotInput, AgentPersonaUncheckedCreateWithoutBotInput>
  }

  export type UserUpsertWithoutBotsInput = {
    update: XOR<UserUpdateWithoutBotsInput, UserUncheckedUpdateWithoutBotsInput>
    create: XOR<UserCreateWithoutBotsInput, UserUncheckedCreateWithoutBotsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBotsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBotsInput, UserUncheckedUpdateWithoutBotsInput>
  }

  export type UserUpdateWithoutBotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeTaskCount?: IntFieldUpdateOperationsInput | number
    dailyUsageCount?: IntFieldUpdateOperationsInput | number
    lastUsageReset?: DateTimeFieldUpdateOperationsInput | Date | string
    overageBalance?: IntFieldUpdateOperationsInput | number
    tier?: StringFieldUpdateOperationsInput | string
    creditsTotal?: IntFieldUpdateOperationsInput | number
    creditsUsed?: IntFieldUpdateOperationsInput | number
    plan?: StringFieldUpdateOperationsInput | string
    activities?: ActivityUpdateManyWithoutUserNestedInput
    emailLogs?: EmailLogUpdateManyWithoutUserNestedInput
    leads?: LeadUpdateManyWithoutUserNestedInput
    subscriptions?: SubscriptionUpdateOneWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    videoJobs?: VideoJobUpdateManyWithoutUserNestedInput
    executionRecords?: ExecutionRecordUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeTaskCount?: IntFieldUpdateOperationsInput | number
    dailyUsageCount?: IntFieldUpdateOperationsInput | number
    lastUsageReset?: DateTimeFieldUpdateOperationsInput | Date | string
    overageBalance?: IntFieldUpdateOperationsInput | number
    tier?: StringFieldUpdateOperationsInput | string
    creditsTotal?: IntFieldUpdateOperationsInput | number
    creditsUsed?: IntFieldUpdateOperationsInput | number
    plan?: StringFieldUpdateOperationsInput | string
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    emailLogs?: EmailLogUncheckedUpdateManyWithoutUserNestedInput
    leads?: LeadUncheckedUpdateManyWithoutUserNestedInput
    subscriptions?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    videoJobs?: VideoJobUncheckedUpdateManyWithoutUserNestedInput
    executionRecords?: ExecutionRecordUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ActivityUpsertWithWhereUniqueWithoutBotInput = {
    where: ActivityWhereUniqueInput
    update: XOR<ActivityUpdateWithoutBotInput, ActivityUncheckedUpdateWithoutBotInput>
    create: XOR<ActivityCreateWithoutBotInput, ActivityUncheckedCreateWithoutBotInput>
  }

  export type ActivityUpdateWithWhereUniqueWithoutBotInput = {
    where: ActivityWhereUniqueInput
    data: XOR<ActivityUpdateWithoutBotInput, ActivityUncheckedUpdateWithoutBotInput>
  }

  export type ActivityUpdateManyWithWhereWithoutBotInput = {
    where: ActivityScalarWhereInput
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyWithoutBotInput>
  }

  export type AgentPersonaUpsertWithoutBotInput = {
    update: XOR<AgentPersonaUpdateWithoutBotInput, AgentPersonaUncheckedUpdateWithoutBotInput>
    create: XOR<AgentPersonaCreateWithoutBotInput, AgentPersonaUncheckedCreateWithoutBotInput>
    where?: AgentPersonaWhereInput
  }

  export type AgentPersonaUpdateToOneWithWhereWithoutBotInput = {
    where?: AgentPersonaWhereInput
    data: XOR<AgentPersonaUpdateWithoutBotInput, AgentPersonaUncheckedUpdateWithoutBotInput>
  }

  export type AgentPersonaUpdateWithoutBotInput = {
    id?: StringFieldUpdateOperationsInput | string
    systemPrompt?: StringFieldUpdateOperationsInput | string
    riskLevel?: StringFieldUpdateOperationsInput | string
    capabilities?: AgentPersonaUpdatecapabilitiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentPersonaUncheckedUpdateWithoutBotInput = {
    id?: StringFieldUpdateOperationsInput | string
    systemPrompt?: StringFieldUpdateOperationsInput | string
    riskLevel?: StringFieldUpdateOperationsInput | string
    capabilities?: AgentPersonaUpdatecapabilitiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BotCreateWithoutPersonaInput = {
    id?: string
    name: string
    type: string
    status?: string
    isRunning?: boolean
    desc: string
    lastRun?: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutBotsInput
    activities?: ActivityCreateNestedManyWithoutBotInput
  }

  export type BotUncheckedCreateWithoutPersonaInput = {
    id?: string
    userId: string
    name: string
    type: string
    status?: string
    isRunning?: boolean
    desc: string
    lastRun?: Date | string
    createdAt?: Date | string
    activities?: ActivityUncheckedCreateNestedManyWithoutBotInput
  }

  export type BotCreateOrConnectWithoutPersonaInput = {
    where: BotWhereUniqueInput
    create: XOR<BotCreateWithoutPersonaInput, BotUncheckedCreateWithoutPersonaInput>
  }

  export type BotUpsertWithoutPersonaInput = {
    update: XOR<BotUpdateWithoutPersonaInput, BotUncheckedUpdateWithoutPersonaInput>
    create: XOR<BotCreateWithoutPersonaInput, BotUncheckedCreateWithoutPersonaInput>
    where?: BotWhereInput
  }

  export type BotUpdateToOneWithWhereWithoutPersonaInput = {
    where?: BotWhereInput
    data: XOR<BotUpdateWithoutPersonaInput, BotUncheckedUpdateWithoutPersonaInput>
  }

  export type BotUpdateWithoutPersonaInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    isRunning?: BoolFieldUpdateOperationsInput | boolean
    desc?: StringFieldUpdateOperationsInput | string
    lastRun?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBotsNestedInput
    activities?: ActivityUpdateManyWithoutBotNestedInput
  }

  export type BotUncheckedUpdateWithoutPersonaInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    isRunning?: BoolFieldUpdateOperationsInput | boolean
    desc?: StringFieldUpdateOperationsInput | string
    lastRun?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUncheckedUpdateManyWithoutBotNestedInput
  }

  export type UserCreateWithoutSubscriptionsInput = {
    id?: string
    email: string
    clerkId: string
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activeTaskCount?: number
    dailyUsageCount?: number
    lastUsageReset?: Date | string
    overageBalance?: number
    tier?: string
    creditsTotal?: number
    creditsUsed?: number
    plan?: string
    activities?: ActivityCreateNestedManyWithoutUserInput
    bots?: BotCreateNestedManyWithoutUserInput
    emailLogs?: EmailLogCreateNestedManyWithoutUserInput
    leads?: LeadCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    videoJobs?: VideoJobCreateNestedManyWithoutUserInput
    executionRecords?: ExecutionRecordCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSubscriptionsInput = {
    id?: string
    email: string
    clerkId: string
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activeTaskCount?: number
    dailyUsageCount?: number
    lastUsageReset?: Date | string
    overageBalance?: number
    tier?: string
    creditsTotal?: number
    creditsUsed?: number
    plan?: string
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    bots?: BotUncheckedCreateNestedManyWithoutUserInput
    emailLogs?: EmailLogUncheckedCreateNestedManyWithoutUserInput
    leads?: LeadUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    videoJobs?: VideoJobUncheckedCreateNestedManyWithoutUserInput
    executionRecords?: ExecutionRecordUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSubscriptionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubscriptionsInput, UserUncheckedCreateWithoutSubscriptionsInput>
  }

  export type UserUpsertWithoutSubscriptionsInput = {
    update: XOR<UserUpdateWithoutSubscriptionsInput, UserUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<UserCreateWithoutSubscriptionsInput, UserUncheckedCreateWithoutSubscriptionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubscriptionsInput, UserUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type UserUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeTaskCount?: IntFieldUpdateOperationsInput | number
    dailyUsageCount?: IntFieldUpdateOperationsInput | number
    lastUsageReset?: DateTimeFieldUpdateOperationsInput | Date | string
    overageBalance?: IntFieldUpdateOperationsInput | number
    tier?: StringFieldUpdateOperationsInput | string
    creditsTotal?: IntFieldUpdateOperationsInput | number
    creditsUsed?: IntFieldUpdateOperationsInput | number
    plan?: StringFieldUpdateOperationsInput | string
    activities?: ActivityUpdateManyWithoutUserNestedInput
    bots?: BotUpdateManyWithoutUserNestedInput
    emailLogs?: EmailLogUpdateManyWithoutUserNestedInput
    leads?: LeadUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    videoJobs?: VideoJobUpdateManyWithoutUserNestedInput
    executionRecords?: ExecutionRecordUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeTaskCount?: IntFieldUpdateOperationsInput | number
    dailyUsageCount?: IntFieldUpdateOperationsInput | number
    lastUsageReset?: DateTimeFieldUpdateOperationsInput | Date | string
    overageBalance?: IntFieldUpdateOperationsInput | number
    tier?: StringFieldUpdateOperationsInput | string
    creditsTotal?: IntFieldUpdateOperationsInput | number
    creditsUsed?: IntFieldUpdateOperationsInput | number
    plan?: StringFieldUpdateOperationsInput | string
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    bots?: BotUncheckedUpdateManyWithoutUserNestedInput
    emailLogs?: EmailLogUncheckedUpdateManyWithoutUserNestedInput
    leads?: LeadUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    videoJobs?: VideoJobUncheckedUpdateManyWithoutUserNestedInput
    executionRecords?: ExecutionRecordUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutActivitiesInput = {
    id?: string
    email: string
    clerkId: string
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activeTaskCount?: number
    dailyUsageCount?: number
    lastUsageReset?: Date | string
    overageBalance?: number
    tier?: string
    creditsTotal?: number
    creditsUsed?: number
    plan?: string
    bots?: BotCreateNestedManyWithoutUserInput
    emailLogs?: EmailLogCreateNestedManyWithoutUserInput
    leads?: LeadCreateNestedManyWithoutUserInput
    subscriptions?: SubscriptionCreateNestedOneWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    videoJobs?: VideoJobCreateNestedManyWithoutUserInput
    executionRecords?: ExecutionRecordCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutActivitiesInput = {
    id?: string
    email: string
    clerkId: string
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activeTaskCount?: number
    dailyUsageCount?: number
    lastUsageReset?: Date | string
    overageBalance?: number
    tier?: string
    creditsTotal?: number
    creditsUsed?: number
    plan?: string
    bots?: BotUncheckedCreateNestedManyWithoutUserInput
    emailLogs?: EmailLogUncheckedCreateNestedManyWithoutUserInput
    leads?: LeadUncheckedCreateNestedManyWithoutUserInput
    subscriptions?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    videoJobs?: VideoJobUncheckedCreateNestedManyWithoutUserInput
    executionRecords?: ExecutionRecordUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutActivitiesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
  }

  export type BotCreateWithoutActivitiesInput = {
    id?: string
    name: string
    type: string
    status?: string
    isRunning?: boolean
    desc: string
    lastRun?: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutBotsInput
    persona?: AgentPersonaCreateNestedOneWithoutBotInput
  }

  export type BotUncheckedCreateWithoutActivitiesInput = {
    id?: string
    userId: string
    name: string
    type: string
    status?: string
    isRunning?: boolean
    desc: string
    lastRun?: Date | string
    createdAt?: Date | string
    persona?: AgentPersonaUncheckedCreateNestedOneWithoutBotInput
  }

  export type BotCreateOrConnectWithoutActivitiesInput = {
    where: BotWhereUniqueInput
    create: XOR<BotCreateWithoutActivitiesInput, BotUncheckedCreateWithoutActivitiesInput>
  }

  export type UserUpsertWithoutActivitiesInput = {
    update: XOR<UserUpdateWithoutActivitiesInput, UserUncheckedUpdateWithoutActivitiesInput>
    create: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActivitiesInput, UserUncheckedUpdateWithoutActivitiesInput>
  }

  export type UserUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeTaskCount?: IntFieldUpdateOperationsInput | number
    dailyUsageCount?: IntFieldUpdateOperationsInput | number
    lastUsageReset?: DateTimeFieldUpdateOperationsInput | Date | string
    overageBalance?: IntFieldUpdateOperationsInput | number
    tier?: StringFieldUpdateOperationsInput | string
    creditsTotal?: IntFieldUpdateOperationsInput | number
    creditsUsed?: IntFieldUpdateOperationsInput | number
    plan?: StringFieldUpdateOperationsInput | string
    bots?: BotUpdateManyWithoutUserNestedInput
    emailLogs?: EmailLogUpdateManyWithoutUserNestedInput
    leads?: LeadUpdateManyWithoutUserNestedInput
    subscriptions?: SubscriptionUpdateOneWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    videoJobs?: VideoJobUpdateManyWithoutUserNestedInput
    executionRecords?: ExecutionRecordUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeTaskCount?: IntFieldUpdateOperationsInput | number
    dailyUsageCount?: IntFieldUpdateOperationsInput | number
    lastUsageReset?: DateTimeFieldUpdateOperationsInput | Date | string
    overageBalance?: IntFieldUpdateOperationsInput | number
    tier?: StringFieldUpdateOperationsInput | string
    creditsTotal?: IntFieldUpdateOperationsInput | number
    creditsUsed?: IntFieldUpdateOperationsInput | number
    plan?: StringFieldUpdateOperationsInput | string
    bots?: BotUncheckedUpdateManyWithoutUserNestedInput
    emailLogs?: EmailLogUncheckedUpdateManyWithoutUserNestedInput
    leads?: LeadUncheckedUpdateManyWithoutUserNestedInput
    subscriptions?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    videoJobs?: VideoJobUncheckedUpdateManyWithoutUserNestedInput
    executionRecords?: ExecutionRecordUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BotUpsertWithoutActivitiesInput = {
    update: XOR<BotUpdateWithoutActivitiesInput, BotUncheckedUpdateWithoutActivitiesInput>
    create: XOR<BotCreateWithoutActivitiesInput, BotUncheckedCreateWithoutActivitiesInput>
    where?: BotWhereInput
  }

  export type BotUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: BotWhereInput
    data: XOR<BotUpdateWithoutActivitiesInput, BotUncheckedUpdateWithoutActivitiesInput>
  }

  export type BotUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    isRunning?: BoolFieldUpdateOperationsInput | boolean
    desc?: StringFieldUpdateOperationsInput | string
    lastRun?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBotsNestedInput
    persona?: AgentPersonaUpdateOneWithoutBotNestedInput
  }

  export type BotUncheckedUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    isRunning?: BoolFieldUpdateOperationsInput | boolean
    desc?: StringFieldUpdateOperationsInput | string
    lastRun?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    persona?: AgentPersonaUncheckedUpdateOneWithoutBotNestedInput
  }

  export type UserCreateWithoutLeadsInput = {
    id?: string
    email: string
    clerkId: string
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activeTaskCount?: number
    dailyUsageCount?: number
    lastUsageReset?: Date | string
    overageBalance?: number
    tier?: string
    creditsTotal?: number
    creditsUsed?: number
    plan?: string
    activities?: ActivityCreateNestedManyWithoutUserInput
    bots?: BotCreateNestedManyWithoutUserInput
    emailLogs?: EmailLogCreateNestedManyWithoutUserInput
    subscriptions?: SubscriptionCreateNestedOneWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    videoJobs?: VideoJobCreateNestedManyWithoutUserInput
    executionRecords?: ExecutionRecordCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLeadsInput = {
    id?: string
    email: string
    clerkId: string
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activeTaskCount?: number
    dailyUsageCount?: number
    lastUsageReset?: Date | string
    overageBalance?: number
    tier?: string
    creditsTotal?: number
    creditsUsed?: number
    plan?: string
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    bots?: BotUncheckedCreateNestedManyWithoutUserInput
    emailLogs?: EmailLogUncheckedCreateNestedManyWithoutUserInput
    subscriptions?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    videoJobs?: VideoJobUncheckedCreateNestedManyWithoutUserInput
    executionRecords?: ExecutionRecordUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLeadsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLeadsInput, UserUncheckedCreateWithoutLeadsInput>
  }

  export type UserUpsertWithoutLeadsInput = {
    update: XOR<UserUpdateWithoutLeadsInput, UserUncheckedUpdateWithoutLeadsInput>
    create: XOR<UserCreateWithoutLeadsInput, UserUncheckedCreateWithoutLeadsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLeadsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLeadsInput, UserUncheckedUpdateWithoutLeadsInput>
  }

  export type UserUpdateWithoutLeadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeTaskCount?: IntFieldUpdateOperationsInput | number
    dailyUsageCount?: IntFieldUpdateOperationsInput | number
    lastUsageReset?: DateTimeFieldUpdateOperationsInput | Date | string
    overageBalance?: IntFieldUpdateOperationsInput | number
    tier?: StringFieldUpdateOperationsInput | string
    creditsTotal?: IntFieldUpdateOperationsInput | number
    creditsUsed?: IntFieldUpdateOperationsInput | number
    plan?: StringFieldUpdateOperationsInput | string
    activities?: ActivityUpdateManyWithoutUserNestedInput
    bots?: BotUpdateManyWithoutUserNestedInput
    emailLogs?: EmailLogUpdateManyWithoutUserNestedInput
    subscriptions?: SubscriptionUpdateOneWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    videoJobs?: VideoJobUpdateManyWithoutUserNestedInput
    executionRecords?: ExecutionRecordUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLeadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeTaskCount?: IntFieldUpdateOperationsInput | number
    dailyUsageCount?: IntFieldUpdateOperationsInput | number
    lastUsageReset?: DateTimeFieldUpdateOperationsInput | Date | string
    overageBalance?: IntFieldUpdateOperationsInput | number
    tier?: StringFieldUpdateOperationsInput | string
    creditsTotal?: IntFieldUpdateOperationsInput | number
    creditsUsed?: IntFieldUpdateOperationsInput | number
    plan?: StringFieldUpdateOperationsInput | string
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    bots?: BotUncheckedUpdateManyWithoutUserNestedInput
    emailLogs?: EmailLogUncheckedUpdateManyWithoutUserNestedInput
    subscriptions?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    videoJobs?: VideoJobUncheckedUpdateManyWithoutUserNestedInput
    executionRecords?: ExecutionRecordUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutEmailLogsInput = {
    id?: string
    email: string
    clerkId: string
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activeTaskCount?: number
    dailyUsageCount?: number
    lastUsageReset?: Date | string
    overageBalance?: number
    tier?: string
    creditsTotal?: number
    creditsUsed?: number
    plan?: string
    activities?: ActivityCreateNestedManyWithoutUserInput
    bots?: BotCreateNestedManyWithoutUserInput
    leads?: LeadCreateNestedManyWithoutUserInput
    subscriptions?: SubscriptionCreateNestedOneWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    videoJobs?: VideoJobCreateNestedManyWithoutUserInput
    executionRecords?: ExecutionRecordCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEmailLogsInput = {
    id?: string
    email: string
    clerkId: string
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activeTaskCount?: number
    dailyUsageCount?: number
    lastUsageReset?: Date | string
    overageBalance?: number
    tier?: string
    creditsTotal?: number
    creditsUsed?: number
    plan?: string
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    bots?: BotUncheckedCreateNestedManyWithoutUserInput
    leads?: LeadUncheckedCreateNestedManyWithoutUserInput
    subscriptions?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    videoJobs?: VideoJobUncheckedCreateNestedManyWithoutUserInput
    executionRecords?: ExecutionRecordUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEmailLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEmailLogsInput, UserUncheckedCreateWithoutEmailLogsInput>
  }

  export type UserUpsertWithoutEmailLogsInput = {
    update: XOR<UserUpdateWithoutEmailLogsInput, UserUncheckedUpdateWithoutEmailLogsInput>
    create: XOR<UserCreateWithoutEmailLogsInput, UserUncheckedCreateWithoutEmailLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEmailLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEmailLogsInput, UserUncheckedUpdateWithoutEmailLogsInput>
  }

  export type UserUpdateWithoutEmailLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeTaskCount?: IntFieldUpdateOperationsInput | number
    dailyUsageCount?: IntFieldUpdateOperationsInput | number
    lastUsageReset?: DateTimeFieldUpdateOperationsInput | Date | string
    overageBalance?: IntFieldUpdateOperationsInput | number
    tier?: StringFieldUpdateOperationsInput | string
    creditsTotal?: IntFieldUpdateOperationsInput | number
    creditsUsed?: IntFieldUpdateOperationsInput | number
    plan?: StringFieldUpdateOperationsInput | string
    activities?: ActivityUpdateManyWithoutUserNestedInput
    bots?: BotUpdateManyWithoutUserNestedInput
    leads?: LeadUpdateManyWithoutUserNestedInput
    subscriptions?: SubscriptionUpdateOneWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    videoJobs?: VideoJobUpdateManyWithoutUserNestedInput
    executionRecords?: ExecutionRecordUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEmailLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeTaskCount?: IntFieldUpdateOperationsInput | number
    dailyUsageCount?: IntFieldUpdateOperationsInput | number
    lastUsageReset?: DateTimeFieldUpdateOperationsInput | Date | string
    overageBalance?: IntFieldUpdateOperationsInput | number
    tier?: StringFieldUpdateOperationsInput | string
    creditsTotal?: IntFieldUpdateOperationsInput | number
    creditsUsed?: IntFieldUpdateOperationsInput | number
    plan?: StringFieldUpdateOperationsInput | string
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    bots?: BotUncheckedUpdateManyWithoutUserNestedInput
    leads?: LeadUncheckedUpdateManyWithoutUserNestedInput
    subscriptions?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    videoJobs?: VideoJobUncheckedUpdateManyWithoutUserNestedInput
    executionRecords?: ExecutionRecordUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutVideoJobsInput = {
    id?: string
    email: string
    clerkId: string
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activeTaskCount?: number
    dailyUsageCount?: number
    lastUsageReset?: Date | string
    overageBalance?: number
    tier?: string
    creditsTotal?: number
    creditsUsed?: number
    plan?: string
    activities?: ActivityCreateNestedManyWithoutUserInput
    bots?: BotCreateNestedManyWithoutUserInput
    emailLogs?: EmailLogCreateNestedManyWithoutUserInput
    leads?: LeadCreateNestedManyWithoutUserInput
    subscriptions?: SubscriptionCreateNestedOneWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    executionRecords?: ExecutionRecordCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutVideoJobsInput = {
    id?: string
    email: string
    clerkId: string
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activeTaskCount?: number
    dailyUsageCount?: number
    lastUsageReset?: Date | string
    overageBalance?: number
    tier?: string
    creditsTotal?: number
    creditsUsed?: number
    plan?: string
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    bots?: BotUncheckedCreateNestedManyWithoutUserInput
    emailLogs?: EmailLogUncheckedCreateNestedManyWithoutUserInput
    leads?: LeadUncheckedCreateNestedManyWithoutUserInput
    subscriptions?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    executionRecords?: ExecutionRecordUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutVideoJobsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVideoJobsInput, UserUncheckedCreateWithoutVideoJobsInput>
  }

  export type UserUpsertWithoutVideoJobsInput = {
    update: XOR<UserUpdateWithoutVideoJobsInput, UserUncheckedUpdateWithoutVideoJobsInput>
    create: XOR<UserCreateWithoutVideoJobsInput, UserUncheckedCreateWithoutVideoJobsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVideoJobsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVideoJobsInput, UserUncheckedUpdateWithoutVideoJobsInput>
  }

  export type UserUpdateWithoutVideoJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeTaskCount?: IntFieldUpdateOperationsInput | number
    dailyUsageCount?: IntFieldUpdateOperationsInput | number
    lastUsageReset?: DateTimeFieldUpdateOperationsInput | Date | string
    overageBalance?: IntFieldUpdateOperationsInput | number
    tier?: StringFieldUpdateOperationsInput | string
    creditsTotal?: IntFieldUpdateOperationsInput | number
    creditsUsed?: IntFieldUpdateOperationsInput | number
    plan?: StringFieldUpdateOperationsInput | string
    activities?: ActivityUpdateManyWithoutUserNestedInput
    bots?: BotUpdateManyWithoutUserNestedInput
    emailLogs?: EmailLogUpdateManyWithoutUserNestedInput
    leads?: LeadUpdateManyWithoutUserNestedInput
    subscriptions?: SubscriptionUpdateOneWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    executionRecords?: ExecutionRecordUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutVideoJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeTaskCount?: IntFieldUpdateOperationsInput | number
    dailyUsageCount?: IntFieldUpdateOperationsInput | number
    lastUsageReset?: DateTimeFieldUpdateOperationsInput | Date | string
    overageBalance?: IntFieldUpdateOperationsInput | number
    tier?: StringFieldUpdateOperationsInput | string
    creditsTotal?: IntFieldUpdateOperationsInput | number
    creditsUsed?: IntFieldUpdateOperationsInput | number
    plan?: StringFieldUpdateOperationsInput | string
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    bots?: BotUncheckedUpdateManyWithoutUserNestedInput
    emailLogs?: EmailLogUncheckedUpdateManyWithoutUserNestedInput
    leads?: LeadUncheckedUpdateManyWithoutUserNestedInput
    subscriptions?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    executionRecords?: ExecutionRecordUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutTasksInput = {
    id?: string
    email: string
    clerkId: string
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activeTaskCount?: number
    dailyUsageCount?: number
    lastUsageReset?: Date | string
    overageBalance?: number
    tier?: string
    creditsTotal?: number
    creditsUsed?: number
    plan?: string
    activities?: ActivityCreateNestedManyWithoutUserInput
    bots?: BotCreateNestedManyWithoutUserInput
    emailLogs?: EmailLogCreateNestedManyWithoutUserInput
    leads?: LeadCreateNestedManyWithoutUserInput
    subscriptions?: SubscriptionCreateNestedOneWithoutUserInput
    videoJobs?: VideoJobCreateNestedManyWithoutUserInput
    executionRecords?: ExecutionRecordCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTasksInput = {
    id?: string
    email: string
    clerkId: string
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activeTaskCount?: number
    dailyUsageCount?: number
    lastUsageReset?: Date | string
    overageBalance?: number
    tier?: string
    creditsTotal?: number
    creditsUsed?: number
    plan?: string
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    bots?: BotUncheckedCreateNestedManyWithoutUserInput
    emailLogs?: EmailLogUncheckedCreateNestedManyWithoutUserInput
    leads?: LeadUncheckedCreateNestedManyWithoutUserInput
    subscriptions?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
    videoJobs?: VideoJobUncheckedCreateNestedManyWithoutUserInput
    executionRecords?: ExecutionRecordUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
  }

  export type UserUpsertWithoutTasksInput = {
    update: XOR<UserUpdateWithoutTasksInput, UserUncheckedUpdateWithoutTasksInput>
    create: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTasksInput, UserUncheckedUpdateWithoutTasksInput>
  }

  export type UserUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeTaskCount?: IntFieldUpdateOperationsInput | number
    dailyUsageCount?: IntFieldUpdateOperationsInput | number
    lastUsageReset?: DateTimeFieldUpdateOperationsInput | Date | string
    overageBalance?: IntFieldUpdateOperationsInput | number
    tier?: StringFieldUpdateOperationsInput | string
    creditsTotal?: IntFieldUpdateOperationsInput | number
    creditsUsed?: IntFieldUpdateOperationsInput | number
    plan?: StringFieldUpdateOperationsInput | string
    activities?: ActivityUpdateManyWithoutUserNestedInput
    bots?: BotUpdateManyWithoutUserNestedInput
    emailLogs?: EmailLogUpdateManyWithoutUserNestedInput
    leads?: LeadUpdateManyWithoutUserNestedInput
    subscriptions?: SubscriptionUpdateOneWithoutUserNestedInput
    videoJobs?: VideoJobUpdateManyWithoutUserNestedInput
    executionRecords?: ExecutionRecordUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeTaskCount?: IntFieldUpdateOperationsInput | number
    dailyUsageCount?: IntFieldUpdateOperationsInput | number
    lastUsageReset?: DateTimeFieldUpdateOperationsInput | Date | string
    overageBalance?: IntFieldUpdateOperationsInput | number
    tier?: StringFieldUpdateOperationsInput | string
    creditsTotal?: IntFieldUpdateOperationsInput | number
    creditsUsed?: IntFieldUpdateOperationsInput | number
    plan?: StringFieldUpdateOperationsInput | string
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    bots?: BotUncheckedUpdateManyWithoutUserNestedInput
    emailLogs?: EmailLogUncheckedUpdateManyWithoutUserNestedInput
    leads?: LeadUncheckedUpdateManyWithoutUserNestedInput
    subscriptions?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
    videoJobs?: VideoJobUncheckedUpdateManyWithoutUserNestedInput
    executionRecords?: ExecutionRecordUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutExecutionRecordsInput = {
    id?: string
    email: string
    clerkId: string
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activeTaskCount?: number
    dailyUsageCount?: number
    lastUsageReset?: Date | string
    overageBalance?: number
    tier?: string
    creditsTotal?: number
    creditsUsed?: number
    plan?: string
    activities?: ActivityCreateNestedManyWithoutUserInput
    bots?: BotCreateNestedManyWithoutUserInput
    emailLogs?: EmailLogCreateNestedManyWithoutUserInput
    leads?: LeadCreateNestedManyWithoutUserInput
    subscriptions?: SubscriptionCreateNestedOneWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    videoJobs?: VideoJobCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutExecutionRecordsInput = {
    id?: string
    email: string
    clerkId: string
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activeTaskCount?: number
    dailyUsageCount?: number
    lastUsageReset?: Date | string
    overageBalance?: number
    tier?: string
    creditsTotal?: number
    creditsUsed?: number
    plan?: string
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    bots?: BotUncheckedCreateNestedManyWithoutUserInput
    emailLogs?: EmailLogUncheckedCreateNestedManyWithoutUserInput
    leads?: LeadUncheckedCreateNestedManyWithoutUserInput
    subscriptions?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    videoJobs?: VideoJobUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutExecutionRecordsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutExecutionRecordsInput, UserUncheckedCreateWithoutExecutionRecordsInput>
  }

  export type UserUpsertWithoutExecutionRecordsInput = {
    update: XOR<UserUpdateWithoutExecutionRecordsInput, UserUncheckedUpdateWithoutExecutionRecordsInput>
    create: XOR<UserCreateWithoutExecutionRecordsInput, UserUncheckedCreateWithoutExecutionRecordsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutExecutionRecordsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutExecutionRecordsInput, UserUncheckedUpdateWithoutExecutionRecordsInput>
  }

  export type UserUpdateWithoutExecutionRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeTaskCount?: IntFieldUpdateOperationsInput | number
    dailyUsageCount?: IntFieldUpdateOperationsInput | number
    lastUsageReset?: DateTimeFieldUpdateOperationsInput | Date | string
    overageBalance?: IntFieldUpdateOperationsInput | number
    tier?: StringFieldUpdateOperationsInput | string
    creditsTotal?: IntFieldUpdateOperationsInput | number
    creditsUsed?: IntFieldUpdateOperationsInput | number
    plan?: StringFieldUpdateOperationsInput | string
    activities?: ActivityUpdateManyWithoutUserNestedInput
    bots?: BotUpdateManyWithoutUserNestedInput
    emailLogs?: EmailLogUpdateManyWithoutUserNestedInput
    leads?: LeadUpdateManyWithoutUserNestedInput
    subscriptions?: SubscriptionUpdateOneWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    videoJobs?: VideoJobUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutExecutionRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeTaskCount?: IntFieldUpdateOperationsInput | number
    dailyUsageCount?: IntFieldUpdateOperationsInput | number
    lastUsageReset?: DateTimeFieldUpdateOperationsInput | Date | string
    overageBalance?: IntFieldUpdateOperationsInput | number
    tier?: StringFieldUpdateOperationsInput | string
    creditsTotal?: IntFieldUpdateOperationsInput | number
    creditsUsed?: IntFieldUpdateOperationsInput | number
    plan?: StringFieldUpdateOperationsInput | string
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    bots?: BotUncheckedUpdateManyWithoutUserNestedInput
    emailLogs?: EmailLogUncheckedUpdateManyWithoutUserNestedInput
    leads?: LeadUncheckedUpdateManyWithoutUserNestedInput
    subscriptions?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    videoJobs?: VideoJobUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ActivityCreateManyUserInput = {
    id?: string
    botId?: string | null
    action: string
    type?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type BotCreateManyUserInput = {
    id?: string
    name: string
    type: string
    status?: string
    isRunning?: boolean
    desc: string
    lastRun?: Date | string
    createdAt?: Date | string
  }

  export type EmailLogCreateManyUserInput = {
    id?: string
    text: string
    createdAt?: Date | string
  }

  export type LeadCreateManyUserInput = {
    id?: string
    businessName: string
    website?: string | null
    email?: string | null
    phone?: string | null
    industry?: string | null
    location?: string | null
    source?: string
    createdAt?: Date | string
  }

  export type TaskCreateManyUserInput = {
    id?: string
    type: string
    status?: string
    createdAt?: Date | string
  }

  export type VideoJobCreateManyUserInput = {
    id?: string
    status?: string
    videoUrl?: string | null
    prompt?: string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ExecutionRecordCreateManyUserInput = {
    id?: string
    status?: string
    timestamp?: Date | string
    isAutonomous?: boolean
  }

  export type ActivityUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bot?: BotUpdateOneWithoutActivitiesNestedInput
  }

  export type ActivityUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    botId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    botId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BotUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    isRunning?: BoolFieldUpdateOperationsInput | boolean
    desc?: StringFieldUpdateOperationsInput | string
    lastRun?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUpdateManyWithoutBotNestedInput
    persona?: AgentPersonaUpdateOneWithoutBotNestedInput
  }

  export type BotUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    isRunning?: BoolFieldUpdateOperationsInput | boolean
    desc?: StringFieldUpdateOperationsInput | string
    lastRun?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUncheckedUpdateManyWithoutBotNestedInput
    persona?: AgentPersonaUncheckedUpdateOneWithoutBotNestedInput
  }

  export type BotUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    isRunning?: BoolFieldUpdateOperationsInput | boolean
    desc?: StringFieldUpdateOperationsInput | string
    lastRun?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoJobUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    prompt?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoJobUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    prompt?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoJobUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    prompt?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExecutionRecordUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    isAutonomous?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ExecutionRecordUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    isAutonomous?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ExecutionRecordUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    isAutonomous?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivityCreateManyBotInput = {
    id?: string
    userId: string
    action: string
    type?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ActivityUpdateWithoutBotInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutActivitiesNestedInput
  }

  export type ActivityUncheckedUpdateWithoutBotInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateManyWithoutBotInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}