// jp-money-data パッケージのエントリ。
// 生成物（generated/）は data/*.json から scripts/build-package.mjs が作る（要 `npm run generate`）。

export * from './core/types'
export * from './core/resolve'

// 全データセットの const と datasetsMeta 一覧
export * from './generated'

// 各データセットの値型（consumer が Dataset<T> の T を参照できるように再エクスポート）
export type * from './datasets/jidosha-zei-shubetsuwari'
export type * from './datasets/kei-jidosha-zei'
export type * from './datasets/jidosha-juryo-zei'
export type * from './datasets/kosei-nenkin'
export type * from './datasets/koyo-hoken-kihon-teate'
export type * from './datasets/shotei-kyufu-nissu'
export type * from './datasets/taishoku-shotoku-zei'
export type * from './datasets/shaken-tesuryo'
export type * from './datasets/shobyo-teate-params'
export type * from './datasets/ikuji-kyugyo-kyufu'
export type * from './datasets/kyuto-shoene-hojokin'
export type * from './datasets/hyojun-hoshu-getsugaku'
export type * from './datasets/kyokai-kenpo-ryoritsu'
