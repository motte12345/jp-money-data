// このファイルは scripts/build-package.mjs が data/*.json から自動生成します。手で編集しないこと。
// 生成物は .gitignore せずコミットする（差分レビュー可能にするため。設計書§11）。
import type { DatasetMeta } from '../core/types'
import { hyojunHoshuGetsugaku } from './hyojun-hoshu-getsugaku'
import { ikujiKyugyoKyufu } from './ikuji-kyugyo-kyufu'
import { jidoshaJuryoZei } from './jidosha-juryo-zei'
import { jidoshaZeiShubetsuwari } from './jidosha-zei-shubetsuwari'
import { keiJidoshaZei } from './kei-jidosha-zei'
import { koseiNenkin } from './kosei-nenkin'
import { koyoHokenKihonTeate } from './koyo-hoken-kihon-teate'
import { kyokaiKenpoRyoritsu } from './kyokai-kenpo-ryoritsu'
import { kyutoShoeneHojokin } from './kyuto-shoene-hojokin'
import { shakenTesuryo } from './shaken-tesuryo'
import { shobyoTeateParams } from './shobyo-teate-params'
import { shoteiKyufuNissu } from './shotei-kyufu-nissu'
import { taishokuShotokuZei } from './taishoku-shotoku-zei'

export { hyojunHoshuGetsugaku } from './hyojun-hoshu-getsugaku'
export { ikujiKyugyoKyufu } from './ikuji-kyugyo-kyufu'
export { jidoshaJuryoZei } from './jidosha-juryo-zei'
export { jidoshaZeiShubetsuwari } from './jidosha-zei-shubetsuwari'
export { keiJidoshaZei } from './kei-jidosha-zei'
export { koseiNenkin } from './kosei-nenkin'
export { koyoHokenKihonTeate } from './koyo-hoken-kihon-teate'
export { kyokaiKenpoRyoritsu } from './kyokai-kenpo-ryoritsu'
export { kyutoShoeneHojokin } from './kyuto-shoene-hojokin'
export { shakenTesuryo } from './shaken-tesuryo'
export { shobyoTeateParams } from './shobyo-teate-params'
export { shoteiKyufuNissu } from './shotei-kyufu-nissu'
export { taishokuShotokuZei } from './taishoku-shotoku-zei'

/** 全データセットのメタ一覧（軽量。docs の一覧生成・discovery 用） */
export const datasetsMeta: readonly DatasetMeta[] = [
  hyojunHoshuGetsugaku.meta,
  ikujiKyugyoKyufu.meta,
  jidoshaJuryoZei.meta,
  jidoshaZeiShubetsuwari.meta,
  keiJidoshaZei.meta,
  koseiNenkin.meta,
  koyoHokenKihonTeate.meta,
  kyokaiKenpoRyoritsu.meta,
  kyutoShoeneHojokin.meta,
  shakenTesuryo.meta,
  shobyoTeateParams.meta,
  shoteiKyufuNissu.meta,
  taishokuShotokuZei.meta,
]
